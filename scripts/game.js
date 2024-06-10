const horses = [
  "Secretariat",
  "Eclipse",
  "West Australian",
  "Flying Fox",
  "Seabiscuit",
];

let raceCounter = 0;

const refs = {
  startBtn: document.querySelector(".js-start-race"),
  winnerField: document.querySelector(".js-winner"),
  progressField: document.querySelector(".js-progress"),
  tableBody: document.querySelector(".js-results-table > tbody"),
};

refs.startBtn.addEventListener("click", onStart);

function onStart() {
  raceCounter += 1;
  disableStartBtn();
  const promises = horses.map(run);

  updateWinnerField("");
  updateProgressField("🤖 Заїзд розпочався, ставки не приймаються!");
  determineWinner(promises);
  waitForAll(promises);
}

function disableStartBtn(value = true) {
  refs.startBtn.disabled = value;
}

function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(`🎉 Переможець ${horse}, финишував за ${time}
    часу`);
    updateResultsTable({ horse, time, raceCounter });
  });
}

function waitForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressField("📝 Заїзд закінчено, принимаются ставки.");
    disableStartBtn(false);
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgressField(message) {
  refs.progressField.textContent = message;
}

function updateResultsTable({ horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML("beforeend", tr);
}

function run(horse) {
  return new Promise((resolve) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
