function creaRettangolo(x, y, width, height, isSelected = false) {
  /*
     <svg width="100%" height="100%">
        <rect
          x="342"
          y="0"
          width="150"
          height="150"
          class="rectange rectange-selected"
        />
      </svg>
    */
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "svg-container");
  // create the svg element
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // set width and height
  svg1.setAttribute("width", "100%");
  svg1.setAttribute("height", "100%");

  // create a circle
  const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect1.setAttribute("x", x + "%");
  rect1.setAttribute("y", y + "%");
  rect1.setAttribute("width", width + "%");
  rect1.setAttribute("height", height + "%");
  rect1.setAttribute("class", "rectange");
  if (isSelected) rect1.classList.add("rectange-selected");

  // attach it to the container
  svg1.appendChild(rect1);
  divEl.appendChild(svg1);

  // attach container to document
  return divEl;
}
function creaMuletto(x, y) {
  const muletto = document.createElement("img");
  muletto.setAttribute("src", "./img/fork.png");
  muletto.style.width = "100%";
  const div = document.createElement("div");
  div.setAttribute("id", "muletto");
  div.style.top = `${y}%`;
  div.style.left = `${x + 10}%`;
  div.classList.add("muletto");
  div.appendChild(muletto);
  return div;
}
function depositaBilletta(x, y, width, height, isSelected = false) {
  const bil = document.createElement("img");
  if (!isSelected) bil.setAttribute("src", "./img/line.png");
  else bil.setAttribute("src", "./img/line_selected.png");
  bil.style.width = `100%`;
  const div = document.createElement("div");
  div.style.top = `${y}%`;

  div.style.left = `${((x + 10) / 100) * 90}%`;
  div.style.width = `${width}%`;
  div.classList.add("billetta");
  div.appendChild(bil);
  return div;
}
