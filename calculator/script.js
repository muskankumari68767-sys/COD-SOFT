const display = document.getElementById("display");
const historyPreview = document.getElementById("historyPreview");
const historyList = document.getElementById("historyList");
let memory = 0;

/* 🔊 Sound Setup */
let soundEnabled = true;
const clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4387");
clickSound.volume = 0.25;

function playSound() {
    if (soundEnabled) clickSound.play();
}

/* Insert Numbers */
function insert(value) {
    playSound();
    display.value += value;
}

function clearAll() {
    playSound();
    display.value = "";
    historyPreview.innerText = "";
}

function deleteLast() {
    playSound();
    display.value = display.value.slice(0, -1);
}

function squareRoot() {
    playSound();
    if (display.value !== "") {
        display.value = Math.sqrt(display.value);
    }
}

function square() {
    playSound();
    if (display.value !== "") {
        display.value = Math.pow(display.value, 2);
    }
}

/* Memory Functions */
function memoryAdd() { playSound(); memory += Number(display.value || 0); }
function memorySubtract() { playSound(); memory -= Number(display.value || 0); }
function memoryRecall() { playSound(); display.value = memory; }
function memoryClear() { playSound(); memory = 0; }

/* Calculate */
function calculate() {
    playSound();
    try {
        let result = eval(display.value);
        historyPreview.innerText = `${display.value} = ${result}`;
        saveHistory(`${display.value} = ${result}`);
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

/* Save History */
function saveHistory(entry) {
    const li = document.createElement("li");
    li.innerText = entry;
    historyList.prepend(li);
}

/* Scientific Mode */
function openScientific() {
    playSound();
    document.getElementById("scientificPanel").style.display = "grid";
}

function scientific(type) {
    playSound();
    if (display.value === "") return;

    let val = parseFloat(display.value);
    let res;

    if (type === "sin") res = Math.sin(val);
    if (type === "cos") res = Math.cos(val);
    if (type === "tan") res = Math.tan(val);
    if (type === "log") res = Math.log10(val);

    display.value = res;
    saveHistory(`${type}(${val}) = ${res}`);
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    const keys = "0123456789+-*/.%";
    if (keys.includes(e.key)) insert(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearAll();
});

/* History Panel Toggle */
document.getElementById("openHistory").onclick = () =>
    document.getElementById("historyPanel").classList.toggle("open");

document.getElementById("clearHistory").onclick = () =>
    historyList.innerHTML = "";

/* Theme Toggle */
document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("light");

/* Sound Toggle */
document.getElementById("soundToggle").onclick = () => {
    soundEnabled = !soundEnabled;
    document.getElementById("soundToggle").innerText = soundEnabled ? "🔊" : "🔈";
};
