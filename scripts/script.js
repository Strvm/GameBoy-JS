


var camera, scene, renderer, stats;
var geometry, material, mesh, controls;
let screen = [];
let screenCanvas;
let screenTexture;
let number = 0;
let group;
let cartridge;
let x2;
let xc2;
let screenGeometry;
let GameBoyMesh;
let models = [];
let plants = [];
let goombat = [];
let questionBox = [];
let tube = [];
let brick = [];
let light = new THREE.PointLight(0xffffff, 1.1, 500, 1);
function init() {
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
    const originalPos = camera.position.clone;
    camera.position.z = -camera.position.z;
    camera.rotation.x = -camera.rotation.x;
    scene = new THREE.Scene();
    //const bg = new THREE.TextureLoader().load( "./images/mariobg.gif" );
    //bg.needsUpdate = true;
    //scene.background = bg;

    //scene.background = new THREE.Color( 0x687a8f );
     group = new THREE.Group();






    renderer = new THREE.WebGLRenderer( {alpha: true  } );
    renderer.setClearColor(0xffaa00, 1);
    stats = createStats();
    document.body.appendChild( stats.domElement );
    screenGeometry = new THREE.PlaneGeometry( 0.38, 0.38, 0.1 );
    for (let index = 0; index < 6; index++) {
        if(index === 0) {
            x2 = document.createElement("canvas");
            xc2 = x2.getContext("2d");
            screenCanvas = x2;
            screenTexture = new THREE.CanvasTexture(x2);
            screenTexture.minFilter = THREE.LinearFilter;
            screen.push(new THREE.MeshBasicMaterial({
                map: screenTexture,
                transparent: true,
                opacity: 0
            }))

        }
        number++;
    }



    mesh = new THREE.Mesh( screenGeometry, screen );
    mesh.position.y = 0.22;
    mesh.position.z = 0.19;
    scene.add(mesh);
    mesh = new THREE.Mesh( geometry, material );





    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0);




    // Instantiating GLTF load and Draco loader.
    var loader = new THREE.GLTFLoader();
    loader.setDRACOLoader( new THREE.DRACOLoader() );
    // Load a glTF resource
    loader.load(
        // resource URL
        './images/GameBoy.glb',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.x = gltf.scene.scale.x * 8;
            gltf.scene.scale.y = gltf.scene.scale.y * 8;
            gltf.scene.scale.z = gltf.scene.scale.z * 8;
            GameBoyMesh = gltf.scene;
            GameBoyMesh.width = mesh.width * 12;
            GameBoyMesh.height = mesh.height * 12;
            GameBoyMesh.position.y = -0.65;
            GameBoyMesh.position.z = 0.06;
            console.log('ADDED GAMEBOYYY');
            scene.add( GameBoyMesh );


            // const color = 0xe74c3c;
            // const intensity = 5;
            // const width = 4;
            // const height = 4;
            // const light = new THREE.RectAreaLight(color, intensity, width, height);
            //
            // light.position = GameBoyMesh.position;
            // light.position.z = light.position.z + 2;
            // GameBoyMesh.add( light );

            //Turning camera around GameBoy on first load.
            windowingInitialize(); //Starting Game.
            let fullTurn = false;
            const intervalGameboy = setInterval(function(){
                controls.autoRotateSpeed = 12;
                controls.autoRotate = true;

                if (!fullTurn && camera.rotation.y > 0.3)fullTurn = true;
                if (camera.rotation.y >= 0.01 && camera.rotation.y <= 0.03 && fullTurn ){
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
                function ( gltf) {
                    gltf.scene.scale.x = gltf.scene.scale.x * 8.25;
                    gltf.scene.scale.y = gltf.scene.scale.y * 8.25;
                    gltf.scene.scale.z = gltf.scene.scale.z * 9;
                    const cartridge = gltf.scene;
                    cartridge.width = mesh.width * 12;
                    cartridge.height = mesh.height * 12;
                    cartridge.position = GameBoyMesh.position;
                    cartridge.rotation.y = Math.PI;
                    cartridge.position.y =  0.7;
                    cartridge.position.x = GameBoyMesh.position.x + 0.075;
                    cartridge.position.z = GameBoyMesh.position.z - 0.105;
                    scene.add( cartridge );

                    const intervalCartridge = setInterval(function(){
                        if (cartridge.position.y > 0.29){
                            cartridge.position.y -= 0.0015;
                        }else {
                            screen[0].opacity += 0.01;
                            if (screen[0].opacity  >= 1){
                                clearInterval(intervalCartridge);
                                spawnPoly('question', 20, 2000, questionBox, scene)
                                // spawnPoly('goombat', 20, 5, goombat, scene)
                                // spawnPoly('plant', 20, 30, plants, scene)
                                // spawnPoly('brick', 20, 5, brick, scene)
                            }
                        }

                    }, 8);
                }
            );
        }
    );





    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    document.body.appendChild( renderer.domElement );
}

function createStats() {
    let stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
}



function animate() {
    requestAnimationFrame(animate);
    controls.update();
    light.position.copy( camera.position );
    scene.add( light );


    renderer.render(scene, camera);
    stats.update();
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


function update() {
   setInterval(function(){
       if (movingBackground) {
           for (const modelArray of models) {
               for (const model of modelArray) {
                   if (model.position.y < -12)
                       if (backgroundObjects)model.position.y = 12;
                   if (model.position.y){
                       model.position.y -= 0.02;
                       model.rotation.y -= 0.02;
                   }
                   (scene.position.y);
               }
           }
       }
        }, 8);

}


const spawnPoly = (type, amount, scale, array, scene) => {
    var loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(new THREE.DRACOLoader());
    for (let i = 0; i < amount; i++) {
        // Load a glTF resource
        loader.load(
            // resource URL
            `./images/${type}.glb`,
            // called when the resource is loaded
            function (gltf) {
                gltf.scene.scale.x = gltf.scene.scale.x / scale;
                gltf.scene.scale.y = gltf.scene.scale.y / scale;
                gltf.scene.scale.z = gltf.scene.scale.z / scale;
                mesh = gltf.scene;

                mesh.position.y = (Math.random() + 1 * (Math.random() + 1.2)) * 8;
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

