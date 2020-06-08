const controlers = document.querySelectorAll('.menuInput');
const menu = document.querySelector('.settings');
let statsVisible = true
let movingBackground = true;
let backgroundObjects = true;


/*
    onMenuChange function. Mainly used to check when a checkbox is checked inside the settings menu.
*/
const onMenuChange = (event) => {
    const id = event.target.className;
    switch (id) {
        case 'FPS':
            if (statsVisible)
                document.body.removeChild(stats.domElement);
            else
                document.body.appendChild(stats.domElement);
            statsVisible = !statsVisible;
            break;
        case 'movingBg':
                movingBackground = !movingBackground;
            break;
        case 'bgObjects':
            backgroundObjects = !backgroundObjects;
            break;
    }

}


/*
    Sets the current controls in the settings.
*/


const menuSetup = () => {
    for (let child of controlers) {
        child.value = eval(child.name);
    }
}


/*
    Controls editor; Edits controls to the ones you want. Might want to change eval in the future to avoid any
    future security reasons (even though its only taking keyCodes) and to make it "faster".
*/

for (let controler of controlers) {
    controler.addEventListener('keydown', function(event){
        let newKey = event.key;
        if (newKey.length === 1)newKey = newKey.toUpperCase();
        controler.value = newKey;
        eval(`${controler.name} = '${newKey.toLowerCase()}'`);
    })
}




/*
    Background Changer
 */
const file = document.querySelector('.backgroundChanger');
const reader = new FileReader();
reader.addEventListener("load", function () {
    document.body.style.backgroundImage = `url(${reader.result})`;
}, false);

file.addEventListener('change',function() {
    const image = this.files[0];
    if(image)reader.readAsDataURL(image);
}, false)




/*
    Open and Close menu.
*/
document.querySelector('.settingsButton').addEventListener('click', function () {
    if (window.getComputedStyle(menu,null).getPropertyValue("display") === 'none')
        menu.style.display = 'block';
    else
        menu.style.display = 'none';
})
menu.querySelector('.closeMenu').addEventListener('mousedown', function () {
    menu.style.display = 'none';
})

/*
    Event and Function callers.
*/
document.querySelector('.settings').addEventListener('input', onMenuChange);
menuSetup();