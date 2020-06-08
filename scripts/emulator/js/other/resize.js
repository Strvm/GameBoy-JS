var canvas = screenCanvas;
function bindResize() {
  var gameRatio = 128 / 128;

  function onResize() {
    var windowRatio = window.innerWidth / window.innerHeight;
    if (windowRatio < gameRatio) {
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = "auto";
    } else {
      canvas.style.height = window.innerHeight + "px";
      canvas.style.width = "auto";
    }
  }

  window.addEventListener("resize", onResize);
  onResize();
}

bindResize();
