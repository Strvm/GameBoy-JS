/*
    Check if user does the Konami Code.
*/

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let check = 0;

document.body.addEventListener('keydown', function (event) {
    if (konamiCode[check] !== event.key){
        check = 0;
        return;
    }
    if (check + 1 === konamiCode.length) {
        typeWriter('.clues .sudoBros', false, 50);
        document.body.style.backgroundImage = `url("./images/mariobg.gif")`;
        check = 0;
        return;
    }
    check++;
})