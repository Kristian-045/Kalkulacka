const calculatorDisplay = document.getElementById("calculatorDisplay");
const calculatorHistory = document.getElementById("calculatorHistory");
const calculatorButtons = document.querySelectorAll(".calculator-button");
const clearDisplay = document.getElementById("clearDisplay");

clearDisplay.style.opacity = "0";

const Parser = require("./parser");

// Regex for only characters we support
const regexAll = /^[0-9+\/*!-^%.√]+$/;
const operations = /^(?![0-9])[+\/*!-^%√]+$/;
var translations = {
	minus: "-",
	plus: "+",
	multiply: "*",
	divide: "/",
	factorial: "!",
	root: "√",
	modulo: "%",
	power: "^",
};

// button click support
for (let i = 0; i < calculatorButtons.length; i++) {
	let button = calculatorButtons[i];

	button.addEventListener("click", (event) => {
		let buttonId = button.id;
		takeAction(buttonId);
	});
}

clearDisplay.addEventListener("click", (event) => {
	calculatorDisplay.value = "";
	clearDisplay.style.opacity = "0";
});

// keyboard support without being focused on display
document.addEventListener("keydown", (event) => {
	if (calculatorDisplay.id === document.activeElement.id) {
		return;
	}
	checkInputAndTakeAction(event);
});

calculatorDisplay.addEventListener("keypress", (event) => {
	checkInputAndTakeAction(event);
});

function checkInputAndTakeAction(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		calculate("");
		return;
	}
	if (event.keyCode === 8) {
		backspace();
		return;
	}
	console.log(event.key);
	if (regexAll.test(event.key)) {
		event.preventDefault();
		takeAction(event.key.toLowerCase().trim());
		return;
	}

	event.preventDefault();
}

function takeAction(key) {
	key = translate(key);
	let calcVal = calculatorDisplay.value.trim();

	switch (key.trim().toLowerCase()) {
		case "equals":
			calculate(key);
			break;
		case "backspace":
			backspace();
			break;
		default:
			console.log(key);
			let prevChar = calcVal.charAt(calcVal.length - 1);
			if (isAnOperation(prevChar) && isAnOperation(key)) {
				if (prevChar === key) return;
				if (prevChar !== "!" && key !== "√") return;
			}
			if (prevChar === "." && key === ".") return;

			calculatorDisplay.value = calculatorDisplay.value + key;
			break;
	}

	if (calculatorDisplay.value.length > 0) {
		clearDisplay.style.opacity = "1";
	} else {
		clearDisplay.style.opacity = "0";
	}
}

function isAnOperation(key) {
	return operations.test(key);
}

function calculate(key = "") {
	let calcVal = calculatorDisplay.value.trim();
	let historyVal = calculatorHistory.innerText.trim();
	let lastChar = calcVal.charAt(calcVal.length - 1);

	if (calcVal.length === 0) {
		return;
	}

	if (operations.test(lastChar) && lastChar !== "!") {
		alert("You forgot to enter last number");
		return;
	}

	let historyResult = Parser.parse(historyVal);
	let result = Parser.parse(calcVal);

	if (historyResult === result) {
		return;
	}

	if (isNumber(result)) {
		calculatorHistory.innerText = calcVal;
		calculatorDisplay.value = result;
		return;
	}
	alert(result);
}

function isNumber(str) {
	// Regular expression to match a number (integer or decimal)
	const numberRegex = /^-?\d*\.?\d+$/;
	return numberRegex.test(str);
}

function translate(key) {
	var translation = "";

	translation = translations[key];
	return translation === undefined ? key : translation;
}

function backspace() {
	if (calculatorDisplay.value.length === 0) {
		return;
	}
	if (
		calculatorDisplay.value === "NaN" ||
		calculatorDisplay.value === "Error"
	) {
		calculatorDisplay.value = "";
		return;
	}
	calculatorDisplay.value = calculatorDisplay.value.substring(
		0,
		calculatorDisplay.value.length - 1,
	);
}
