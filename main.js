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
