let angleMode = "DEG";

function appendValue(value) {
  const display = document.getElementById("display");
  display.value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function clearEntry() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function toggleSign() {
  const display = document.getElementById("display");
  if (display.value.startsWith("-")) {
    display.value = display.value.slice(1);
  } else {
    display.value = "-" + display.value;
  }
}

function insertConstant(name) {
  const display = document.getElementById("display");
  if (name === "pi") display.value += Math.PI.toFixed(8);
  if (name === "e") display.value += Math.E.toFixed(8);
}

function square() {
  const display = document.getElementById("display");
  display.value += "**2";
}

function cube() {
  const display = document.getElementById("display");
  display.value += "**3";
}

function sqrt() {
  const display = document.getElementById("display");
  display.value += "**0.5";
}

function applyFunc(func) {
  const display = document.getElementById("display");
  let value = parseFloat(display.value);
  if (angleMode === "DEG" && (func === "sin" || func === "cos" || func === "tan")) {
    value = value * Math.PI / 180;
  }

  switch (func) {
    case "sin": display.value = Math.sin(value); break;
    case "cos": display.value = Math.cos(value); break;
    case "tan": display.value = Math.tan(value); break;
    case "log": display.value = Math.log10(value); break;
    case "ln": display.value = Math.log(value); break;
  }

  saveToHistory(`${func}(${value}) = ${display.value}`);
}

function calculate() {
  const display = document.getElementById("display");
  try {
    const result = eval(display.value);
    saveToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
    showToast("Calculation error");
  }
}

function copyToClipboard() {
  const display = document.getElementById("display");
  if (display.value) {
    navigator.clipboard.writeText(display.value)
      .then(() => showToast("Copied to clipboard!"))
      .catch(() => showToast("Copy failed."));
  } else {
    showToast("Nothing to copy!");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function toggleAngle() {
  angleMode = angleMode === "DEG" ? "RAD" : "DEG";
  document.getElementById("angle-toggle").textContent = `📐 Mode: ${angleMode === "DEG" ? "Degrees" : "Radians"}`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}

function saveToHistory(entry) {
  const list = document.getElementById("history-list");
  const li = document.createElement("li");
  li.textContent = entry;
  list.prepend(li);
}

function clearHistory() {
  document.getElementById("history-list").innerHTML = "";
}