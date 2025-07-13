
const gridSize = 25;
let mines = new Set();
let clickHistory = new Set();
let wins = 0;
let losses = 0;
let streak = 0;

function setupGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.onclick = () => markCell(i);
    grid.appendChild(cell);
  }
}

function markCell(index) {
  const cell = document.querySelectorAll(".cell")[index];
  if (cell.classList.contains("safe")) return;
  cell.classList.add("safe");
  clickHistory.add(index);
  streak++;
  wins++;
  updateStats();
}

function recordClick() {
  const manual = prompt("Enter tile index (0-24) you clicked in 1Win:");
  const index = parseInt(manual);
  if (isNaN(index) || index < 0 || index >= gridSize) {
    alert("Invalid tile number.");
    return;
  }
  markCell(index);
}

function suggestMove() {
  let best;
  for (let i = 0; i < gridSize; i++) {
    if (!clickHistory.has(i)) {
      best = i;
      break;
    }
  }
  if (best !== undefined) {
    const cell = document.querySelectorAll(".cell")[best];
    cell.classList.add("suggest");
  }
}

function simulateCashout() {
  alert("💰 Your estimated cashout would be: $" + (streak * 2.0).toFixed(2));
}

function resetGame() {
  mines.clear();
  clickHistory.clear();
  streak = 0;
  setupGrid();
  updateStats();
}

function updateStats() {
  document.getElementById("stats").innerText = `✅ Wins: ${wins} | 💣 Losses: ${losses} | 🔄 Streak: ${streak}`;
}

window.onload = () => {
  setupGrid();
  updateStats();
};
