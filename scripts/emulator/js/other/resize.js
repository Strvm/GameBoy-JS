const canvas = x2;

function bindResize() {
  const gameRatio = 128 / 128;

  function onResize() {
    const windowRatio = window.innerWidth / window.innerHeight;
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
