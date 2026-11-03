// Make the DIV element draggable:
dragElement(document.getElementById("test"));

function dragElement(elmnt) {
  var offsets;

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    offsets = elmnt.parentElement.getBoundingClientRect();
    console.log(offsets);
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
    console.log(`ClientX = ${e.clientX}`);
    console.log(`ClientY = ${e.clientY}`);
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
