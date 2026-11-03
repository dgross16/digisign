// Make the DIV element draggable:
dragElement(document.getElementById("test"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Open the color picker when the square is clicked or dropped
const square = document.getElementById("test");
const colorPicker = document.getElementById("colorPicker");

square.addEventListener("click", () => {
  // move the hidden picker to the square so the popup opens next to it
  colorPicker.style.top = square.offsetTop + "px";
  colorPicker.style.left = square.offsetLeft + "px";
  if (colorPicker.showPicker) {
    colorPicker.showPicker();
  } else {
    colorPicker.click();
  }
});

// Restore saved color on load
const savedColor = localStorage.getItem("squareColor");
if (savedColor) {
  square.style.backgroundColor = savedColor;
  colorPicker.value = savedColor;
}

// Update the square's color as you pick, and save it
colorPicker.addEventListener("input", (e) => {
  square.style.backgroundColor = e.target.value;
  localStorage.setItem("squareColor", e.target.value);
});
// resize square feature with arrows
const MIN_SIZE = 20;
const HANDLE_DIRS = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
 
makeResizable(document.getElementById("test"));
 
function makeResizable(el) {
  // Show handles when the square is clicked, hide when clicking elsewhere
  el.addEventListener("mousedown", () => el.classList.add("selected"));
  document.addEventListener("mousedown", (e) => {
    if (!el.contains(e.target)) el.classList.remove("selected");
  });
 
  HANDLE_DIRS.forEach((dir) => {
    const h = document.createElement("div");
    h.className = "resize-handle " + dir;
    h.dataset.dir = dir;
    h.addEventListener("mousedown", startResize);
    el.appendChild(h);
  });
 
  function startResize(e) {
    e.preventDefault();
    e.stopPropagation();
    el.classList.add("selected");
 
    const dir = e.target.dataset.dir;
    const sx = e.clientX, sy = e.clientY;
    const s = { left: el.offsetLeft, top: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
 
    function onMove(e) {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      let { left, top, w, h } = s;
 
      if (dir.includes("e")) w = Math.max(MIN_SIZE, s.w + dx);
      if (dir.includes("s")) h = Math.max(MIN_SIZE, s.h + dy);
      if (dir.includes("w")) {
        w = Math.max(MIN_SIZE, s.w - dx);
        left = s.left + s.w - w; 
      }
      if (dir.includes("n")) {
        h = Math.max(MIN_SIZE, s.h - dy);
        top = s.top + s.h - h; 
      }
 
      el.style.width = w + "px";
      el.style.height = h + "px";
      el.style.left = left + "px";
      el.style.top = top + "px";
    }
 
    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
 
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }
}
