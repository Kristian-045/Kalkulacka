const calculatorDisplay = document.getElementById("calculatorDisplay");
const calculatorHistory = document.getElementById("calculatorHistory");
const calculatorButtons = document.querySelectorAll(".calculator-button");

const Parser = require("./parser");

// Regex for only characters we support
const regexAll = /^[0-9+\/*s!-]+$/;

// button click support
for (let i = 0; i < calculatorButtons.length; i++) {
	let button = calculatorButtons[i];

	button.addEventListener("click", (event) => {
		let buttonId = button.id;
		takeAction(buttonId);
	});
}

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
	if (regexAll.test(event.key)) {
		event.preventDefault();
		takeAction(event.key.toLowerCase().trim());
	}
}

function takeAction(key) {
	key = translate(key);
	console.log(key);
	switch (key.trim().toLowerCase()) {
		case "backspace":
			backspace();
			break;
		case "enter":
			calculate();
			break;
		case "equals":
			calculate();
			break;
		default:
			calculatorDisplay.value = calculatorDisplay.value + key;
			break;
	}
}

function calculate() {
	let result = Parser.parse(calculatorDisplay.value);
	if (isNumber(result)) {
		calculatorHistory.innerText = calculatorDisplay.value;
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
