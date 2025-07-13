
const gridSize = 25;
let mines = new Set();
let gameOver = false;
let winCount = 0;
let loseCount = 0;

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
  gameOver = false;
  document.querySelectorAll(".cell").forEach(c => c.className = "cell");
  while (mines.size < 5) {
    mines.add(Math.floor(Math.random() * gridSize));
  }
  highlightHeatmap();
}

function revealCell(cell) {
  if (gameOver) return;
  const index = parseInt(cell.dataset.index);
  if (mines.has(index)) {
    cell.className = "cell risk";
    alert("💥 Boom! You hit a mine.");
    loseCount++;
    updateStats();
    gameOver = true;
  } else {
    cell.className = "cell safe";
    winCount++;
    updateStats();
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

function resetGame() {
  gameOver = false;
  mines.clear();
  createGrid();
}

function updateStats() {
  document.getElementById("stats").textContent = `✅ Wins: ${winCount} | 💣 Losses: ${loseCount}`;
}

function suggestBestTile() {
  for (let i = 0; i < gridSize; i++) {
    if (!mines.has(i)) {
      const cell = document.querySelectorAll(".cell")[i];
      cell.style.outline = "2px solid yellow";
      break;
    }
  }
}

window.onload = () => {
  createGrid();
  updateStats();
};
