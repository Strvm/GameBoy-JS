let JS_KEY_UP = 'ArrowUp';
let JS_KEY_LEFT = 'ArrowLeft';
let JS_KEY_RIGHT = 'ArrowRight';
let JS_KEY_DOWN = 'ArrowDown';
let JS_KEY_ENTER = 'Enter';
let JS_KEY_SHIFT = 'Shift';

let JS_KEY_A = 'a';
let JS_KEY_B = 'b';

const DEADZONE = 0.1;

let isTouchEnabled = "ontouchstart" in document.documentElement;
isTouchEnabled = true;



function bindButton(el, code) {
  el.addEventListener("touchstart", function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.className = e.currentTarget.className + " btnPressed";
    GameBoyKeyDown(code);
  });

  el.addEventListener("touchend", function(e) {
    e.preventDefault();
    e.stopPropagation();
    initSound();
    e.currentTarget.className = e.currentTarget.className.replace(
      / btnPressed/,
      ""
    );
    GameBoyKeyUp(code);
  });
}

function bindDpad(el) {
  el.addEventListener("touchstart", function(e) {
    e.preventDefault();
    e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (2 * (e.targetTouches[0].clientX - rect.left)) / rect.width - 1;
      const y = (2 * (e.targetTouches[0].clientY - rect.top)) / rect.height - 1;
      move(x, y);
  });

  el.addEventListener("touchmove", function(e) {
    e.preventDefault();
    e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (2 * (e.targetTouches[0].clientX - rect.left)) / rect.width - 1;
      const y = (2 * (e.targetTouches[0].clientY - rect.top)) / rect.height - 1;
      move(x, y);
  });

  function move(x, y) {
    if (x < -DEADZONE || x > DEADZONE) {
      if (y > x && y < -x) {
        GameBoyKeyUp("right");
        GameBoyKeyDown("left");
      } else if (y > -x && y < x) {
        GameBoyKeyUp("left");
        GameBoyKeyDown("right");
      }

      if (y > -DEADZONE && y < DEADZONE) {
        GameBoyKeyUp("up");
        GameBoyKeyUp("down");
      }
    }

    if (y < -DEADZONE || y > DEADZONE) {
      if (x > y && x < -y) {
        GameBoyKeyUp("down");
        GameBoyKeyDown("up");
      } else if (x > -y && x < y) {
        GameBoyKeyUp("up");
        GameBoyKeyDown("down");
      }

      if (x > -DEADZONE && x < DEADZONE) {
        GameBoyKeyUp("left");
        GameBoyKeyUp("right");
      }
    }
  }

  el.addEventListener("touchend", function(e) {
    e.preventDefault();
    e.stopPropagation();
    initSound();
    GameBoyKeyUp("left");
    GameBoyKeyUp("right");
    GameBoyKeyUp("up");
    GameBoyKeyUp("down");
  });
}

function bindKeyboard() {
  window.onkeydown = function(e) {
    initSound();
    if (isTouchEnabled) {
    //  controller.style.display = "none";
      isTouchEnabled = false;
    }
    if (
      (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
    ) {
      return;
    }
    if (e.key === JS_KEY_LEFT || e.key === JS_KEY_A) {
      GameBoyKeyDown("left");
    } else if (e.key === JS_KEY_RIGHT) {
      GameBoyKeyDown("right");
    } else if (e.key === JS_KEY_DOWN) {
      GameBoyKeyDown("down");
    } else if (e.key === JS_KEY_ENTER) {
      GameBoyKeyDown("start");
    } else if (
      e.key === JS_KEY_A ||
      e.key === JS_KEY_UP
    ) {
      GameBoyKeyDown("a");
    } else if (
      e.key === JS_KEY_B
    ) {
      GameBoyKeyDown("b");
    } else if (e.key === JS_KEY_SHIFT) {
      GameBoyKeyDown("select");
    }
    e.preventDefault();
  };

  window.onkeyup = function(e) {
    if (e.key === "Dead") {
      // Ipad keyboard fix :-/
      // Doesn't register which key was released, so release all of them
      ["right", "left", "up", "down", "a", "b", "select", "start"].forEach(
        key => {
          GameBoyKeyUp(key);
        }
      );
    }
    if (e.key === JS_KEY_LEFT || e.key === JS_KEY_A) {
      GameBoyKeyUp("left");
    } else if (e.key === JS_KEY_RIGHT) {
      GameBoyKeyUp("right");
    } else if (e.key === JS_KEY_DOWN) {
      GameBoyKeyUp("down");
    } else if (e.key === JS_KEY_ENTER) {
      GameBoyKeyUp("start");
    } else if (
      e.key === JS_KEY_A ||
      e.key === JS_KEY_UP
    ) {
      GameBoyKeyUp("a");
    } else if (
      e.key === JS_KEY_A
    ) {
      GameBoyKeyUp("b");
    } else if (e.key === JS_KEY_SHIFT) {
      GameBoyKeyUp("select");
    }
    e.preventDefault();
  };
}

if (isTouchEnabled) {

} else {
  //controller.style.display = "none";
}
bindKeyboard();
