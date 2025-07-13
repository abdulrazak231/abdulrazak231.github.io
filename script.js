
const gridSize = 25;
let mines = new Set();

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.onclick = () => revealCell(cell);
    grid.appendChild(cell);
  }
}

function placeMines() {
  mines.clear();
  while (mines.size < 5) {
    mines.add(Math.floor(Math.random() * gridSize));
  }
  highlightHeatmap();
}

function revealCell(cell) {
  const index = parseInt(cell.dataset.index);
  if (mines.has(index)) {
    cell.className = "cell risk";
    alert("💥 Boom! You hit a mine.");
  } else {
    cell.className = "cell safe";
  }
}

function highlightHeatmap() {
  document.querySelectorAll(".cell").forEach((cell, i) => {
    if (!mines.has(i)) {
      cell.classList.add("safe");
    } else {
      cell.classList.add("risk");
    }
  });
}

function simulateCashout() {
  let safeCount = 0;
  for (let i = 0; i < gridSize; i++) {
    if (!mines.has(i)) safeCount++;
  }
  alert("Estimated payout: $" + (safeCount * 2).toFixed(2));
}

window.onload = () => {
  createGrid();
};
