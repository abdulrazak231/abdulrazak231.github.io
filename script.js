
const gridSize = 25;
let clickHistory = new Set();
let mineMode = false;
let wins = parseInt(localStorage.getItem('wins')) || 0;
let losses = parseInt(localStorage.getItem('losses')) || 0;
let streak = 0;
let mineMap = JSON.parse(localStorage.getItem('heatmap') || '[]');

function setupGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;

    if (mineMap.includes(i)) cell.classList.add("heatmap");

    cell.onclick = () => handleClick(i, cell);
    grid.appendChild(cell);
  }
}

function handleClick(index, cell) {
  if (clickHistory.has(index)) return;

  if (mineMode) {
    cell.classList.toggle("mine");
    updateHeatmap(index);
    return;
  }

  clickHistory.add(index);
  cell.classList.add("safe");
  streak++;
  wins++;
  saveStats();
  updateStats();
}

function suggestMove() {
  for (let i = 0; i < gridSize; i++) {
    if (!clickHistory.has(i) && !document.querySelectorAll(".cell")[i].classList.contains("mine")) {
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

function toggleMineMode() {
  mineMode = !mineMode;
  alert(mineMode ? "🚩 Manual Mine Mode ON" : "🚩 Manual Mine Mode OFF");
}

function updateHeatmap(index) {
  if (!mineMap.includes(index)) {
    mineMap.push(index);
    localStorage.setItem("heatmap", JSON.stringify(mineMap));
  }
}

function saveStats() {
  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);
}

window.onload = () => {
  setupGrid();
  updateStats();
};
