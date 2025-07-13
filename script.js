
const gridSize = 25;
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
    cell.onclick = () => handleClick(i);
    grid.appendChild(cell);
  }
}

function handleClick(index) {
  const cell = document.querySelectorAll(".cell")[index];
  if (clickHistory.has(index)) return;

  clickHistory.add(index);
  cell.classList.add("safe");
  streak++;
  wins++;
  updateStats();
}

function suggestMove() {
  for (let i = 0; i < gridSize; i++) {
    if (!clickHistory.has(i)) {
      document.querySelectorAll(".cell")[i].classList.add("suggest");
      break;
    }
  }
}

function simulateCashout() {
  alert("💰 Estimated cashout: $" + (streak * 2.0).toFixed(2));
}

function resetGame() {
  clickHistory.clear();
  streak = 0;
  setupGrid();
  updateStats();
}

function updateStats() {
  document.getElementById("stats").innerText =
    `✅ Wins: ${wins} | 💣 Losses: ${losses} | 🔄 Streak: ${streak}`;
}

window.onload = () => {
  setupGrid();
  updateStats();
};
