const {
	addition,
	subtraction,
	multiplication,
	division,
	factorial,
	exponential,
	rooting,
	modulo,
} = require("./math");

var input = [];

process.stdin.on("data", (data) => {
	// Process the data as needed
	input.push(stringArrayToIntArray(data.toString().split(" ")));
});

function stringArrayToIntArray(array) {
	let out = [];
	for (let i = 0; i < array.length; i++) {
		out[i] = parseInt(array[i]);
	}

	return out;
}

function addArrayWithExponent(myArray, exponent = 1) {
	var arrayTotal = myArray.length;
	var totalSum = 0;

	for (var x = 0; x < arrayTotal; x++) {
		totalSum = addition(exponential(myArray[x], exponent), totalSum);
	}
	return totalSum;
}

// Handle end of input stream
process.stdin.on("end", () => {
	input = input[0];
	let N = input.length;
	let x = multiplication(division(1, N), addArrayWithExponent(input));
	let s = rooting(
		multiplication(
			division(1, subtraction(N, 1)),
			subtraction(
				addArrayWithExponent(input, 2),
				multiplication(N, exponential(x, 2)),
			),
		),
		2,
	);

	console.log(s);
});
