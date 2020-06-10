let i = 0; //Our counter for the loop.
let text; //Store the element.
let prevText; //Store the element.
let textChars; //Stores the characters before they get removed.
let timeOut; //Stores the setTimeOut so we can cancel it when we want.
let timeOut2;
let lastText = '' //Stores the last element printed.
let savedText = ''; //Stores the last text contents printed.
function typeWriter(textid, wipe, speed) {
    textid = textid.split('text')[0] //Format the ID of the element we want to print.

    text = document.querySelector(textid);
    if (text == null) {
        console.log('Given paragraph ID is null.');
        return;
    }
    if (!wipe) { //This condition is only ran the first time you execute the function.
        i = 0;
        clearTimeout(timeOut2)
        if (prevText !== undefined)prevText.classList.add('hidden');
        prevText = text;
        savedText = text.textContent;
        lastText = textid;
        textChars = text.textContent;
        text.textContent = "";
        text.style.display = 'block' //Display the text container we want to print.
        wipe = true;
    }
    text.classList.remove('hidden'); //Make the text visible
    if (i < textChars.length) {
        text.textContent += textChars.charAt(i); //Adding new character to the content of the span
        i++;
        timeOut2 = setTimeout(function() {
            typeWriter('.clues .' + text.className, wipe, speed);
        }, speed);
    } else {
        timeOut = setTimeout(function() {
            if (!text.className.includes('hidden')) text.classList.add('hidden');
        }, 4000); //Disappear after 4s
        i = 0;
    }
}

