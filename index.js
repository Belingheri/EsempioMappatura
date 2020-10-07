function creaRettangolo(x, y, width, height, isSelected = false) {
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
function creaMuletto(x, y, isMy = false) {
  const muletto = document.createElement("img");
  muletto.setAttribute("src", `./img/fork${isMy ? "-selected" : ""}.png`);
  muletto.style.width = "100%";
  const div = document.createElement("div");
  if (isMy) div.setAttribute("id", "muletto");
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
function depositaCerchio(x, y, width, isSelected = false) {
  const bil = document.createElement("img");
  bil.setAttribute("src", `./img/circle${isSelected ? "-selected" : ""}.png`);
  bil.style.width = `100%`;
  const div = document.createElement("div");
  div.style.top = `${y}%`;

  div.style.left = `${((x + 10) / 100) * 90}%`;
  div.style.width = `${width}%`;
  div.classList.add("billetta");
  div.appendChild(bil);
  return div;
}
function goNext(data, index) {
  $("#muletto").animate(
    {
      opacity: 0.5,
      top: `${data[index].y}%`,
      left: `${data[index].x}%`,
    },
    data[index].milliSec,
    () => {
      if (data.length == index + 1) {
        arrivatoADest();
        return;
      }
      goNext(data, index + 1);
    }
  );
}
function arrivatoADest() {
  const button = document.createElement("button");
  button.setAttribute("id", "vedi-dett");
  button.setAttribute("button", "button");
  button.classList.add("btn");
  button.classList.add("btn-success");
  button.innerHTML = "Vedi prelievo";
  button.onclick = () => {
    vediDett();
  };
  document.getElementById("info").appendChild(button);
}
function rigaSelezionata() {
  const sel = document.getElementById("inputGroupSelect04");
  document.getElementById("ordine").innerHTML = document.getElementById(
    "inOrdine"
  ).value;
  document.getElementById("articolo").innerHTML =
    sel.options[sel.selectedIndex].text;
  lanciaProgetto(`./data/${sel.value}.json`);
}
function lanciaProgetto(path) {
  document.getElementById("iniziale").classList.add("hidden");
  document.getElementById("divmappa").classList.remove("hidden");
  $.getJSON(path, (data) => {
    data.magazzino.forEach((element) => {
      const el = depositaBilletta(
        element.x,
        element.y,
        element.dimX,
        element.dimY,
        element.isSelected
      );
      document.getElementById("mappatura").appendChild(el);
    });
    goNext(data.strada, 0);
  });
  const muletto = creaMuletto(0, 65, true);
  document.getElementById("mappatura").appendChild(muletto);
  document.getElementById("mappatura").appendChild(creaMuletto(17, 45));
  document.getElementById("mappatura").appendChild(creaMuletto(50, 13));
}
function vediDett() {
  const sel = document.getElementById("inputGroupSelect04");
  const path = `./data/${sel.value}.json`;
  const button = document.getElementById("vedi-dett");
  button.innerHTML = "Confema presa";
  button.onclick = () => {
    location.reload();
  };
  document.getElementById("vero-magaz").classList.add("hidden");
  document.getElementById("vedi-dett").classList.remove("hidden");
  $.getJSON(path, (data) => {
    data.davanti.forEach((el) => {
      const newEl = depositaCerchio(el.x, el.y, el.width, el.isSelected);
      document.getElementById("vedi-dett").appendChild(newEl);
    });
  });
}
