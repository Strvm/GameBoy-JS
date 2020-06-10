//ThreeJS variables.
let camera, scene, renderer, stats,
    geometry, material, mesh, controls,
    screenTexture, screenGeometry,
    GameBoyMesh;
let light = new THREE.PointLight(0xffffff, 1.1, 500, 1);
//Game graphics
let screen = [];
let x2; //Screen Canvas
let xc2; //Screen Canvas Context

//3D Models global and specific arrays
let models = [];
let plants = [];
let goombat = [];
let questionBox = [];
let brick = [];
let objectSpeed = 8;


// Instantiating GLTF load and Draco loader.
const loader = new THREE.GLTFLoader();
loader.setDRACOLoader(new THREE.DRACOLoader());
renderer = new THREE.WebGLRenderer({
    alpha: true
});
camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);



//Initialize GameBoy and background
function init() {
    //Camera position
    camera.position.z = 1;
    camera.position.z = -camera.position.z;
    camera.rotation.x = -camera.rotation.x;
    scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    stats = createStats();
    document.body.appendChild(stats.domElement);
    screenGeometry = new THREE.PlaneGeometry(0.38, 0.38, 0.1);
    for (let index = 0; index < 6; index++) {
        if (index === 0) {
            x2 = document.createElement("canvas");
            xc2 = x2.getContext("2d");
            screenTexture = new THREE.CanvasTexture(x2);
            screenTexture.minFilter = THREE.LinearFilter;
            screen.push(new THREE.MeshBasicMaterial({
                map: screenTexture,
                transparent: true,
                opacity: 0
            }))

        }
    }
    mesh = new THREE.Mesh(screenGeometry, screen);
    mesh.position.y = 0.22;
    mesh.position.z = 0.19;
    scene.add(mesh);
    mesh = new THREE.Mesh(geometry, material);

    // Load a glTF gameboy
    loader.load(
        // resource URL
        './images/GameBoy.glb',
        // called when the resource is loaded
        function(gltf) {
            gltf.scene.scale.x = gltf.scene.scale.x * 8;
            gltf.scene.scale.y = gltf.scene.scale.y * 8;
            gltf.scene.scale.z = gltf.scene.scale.z * 8;
            GameBoyMesh = gltf.scene;
            GameBoyMesh.width = mesh.width * 12;
            GameBoyMesh.height = mesh.height * 12;
            GameBoyMesh.position.y = -0.65;
            GameBoyMesh.position.z = 0.06;
            scene.add(GameBoyMesh);


            //Turning camera around GameBoy on first load.
            windowingInitialize(); //Starting Game.
            let fullTurn = false;
            const intervalGameboy = setInterval(function() {
                //Rotation effect
                controls.autoRotateSpeed = 12;
                controls.autoRotate = true;
                if (!fullTurn && camera.rotation.y > 0.3) fullTurn = true;
                if (camera.rotation.y >= 0.01 && camera.rotation.y <= 0.03 && fullTurn) {
                    const audio = new Audio('./sounds/gameboy_bootup.mp3');
                    audio.volume = 0.1;
                    audio.play();
                    controls.autoRotate = false;
                    clearInterval(intervalGameboy);
                }
            }, 8);
            //Loading Cartridge Mario Land model.
            loader.load(
                './images/CartridgeMario.glb',
                function(gltf) {
                    gltf.scene.scale.x = gltf.scene.scale.x * 8.25;
                    gltf.scene.scale.y = gltf.scene.scale.y * 8.25;
                    gltf.scene.scale.z = gltf.scene.scale.z * 9;
                    const cartridge = gltf.scene;
                    cartridge.width = mesh.width * 12;
                    cartridge.height = mesh.height * 12;
                    cartridge.position = GameBoyMesh.position;
                    cartridge.rotation.y = Math.PI;
                    cartridge.position.y = 0.7;
                    cartridge.position.x = GameBoyMesh.position.x + 0.075;
                    cartridge.position.z = GameBoyMesh.position.z - 0.105;
                    scene.add(cartridge);
                    const intervalCartridge = setInterval(function() {
                        if (cartridge.position.y > 0.29) {
                            cartridge.position.y -= 0.0015;
                        } else {
                            screen[0].opacity += 0.01;
                            if (screen[0].opacity >= 1) {
                                clearInterval(intervalCartridge);
                                spawnPoly('question', 20, 2000, questionBox, scene)
                                spawnPoly('goombat', 20, 5, goombat, scene)
                                spawnPoly('plant', 20, 30, plants, scene)
                                spawnPoly('brick', 20, 5, brick, scene)
                                typeWriter('.clues .start', false, 50);
                            }
                        }

                    }, 8);
                }
            );
        }
    );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    document.body.appendChild(renderer.domElement);
}


//Setup FPS Stats
function createStats() {
    let stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = stats.domElement.style.top = '0';
    return stats;
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    light.position.copy(camera.position);
    scene.add(light);
    renderer.render(scene, camera);
    stats.update();
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


//Make background models move.
function update() {
    setTimeout(function() {
        if (movingBackground) {
            for (const modelArray of models) {
                for (const model of modelArray) {
                    if (model.position.y < -12)
                        if (backgroundObjects) model.position.y = 12;
                    if (model.position.y) {
                        model.position.y -= 0.02;
                        model.rotation.y -= 0.02;
                    }
                }
            }
            update();
        }
    }, objectSpeed);

}


//Spawn 3D models in.
const spawnPoly = (type, amount, scale, array, scene) => {
    for (let i = 0; i < amount; i++) {
        // Load a glTF resource
        loader.load(
            // resource URL
            `./images/${type}.glb`,
            // called when the resource is loaded
            function(gltf) {
                gltf.scene.scale.x = gltf.scene.scale.x / scale;
                gltf.scene.scale.y = gltf.scene.scale.y / scale;
                gltf.scene.scale.z = gltf.scene.scale.z / scale;
                mesh = gltf.scene;

                mesh.position.y = (Math.random() + 1.4 * (Math.random() + 1.4)) * 8;
                mesh.position.x = (Math.random() - 0.5) * 15;
                mesh.position.z = ((Math.random() - 0.5) * 25);
                if (mesh.position.z > -1 && mesh.position.z < 1) {
                    mesh.position.z = mesh.position.z * 8;
                }
                array.push(mesh);
                scene.add(mesh);
            }
        );
    }
    models.push(array);
}


update();
init();
animate();