/**
 * @file Mathematical library providing basic arithmetic operations and more.
 * @module math.js
 * @author Matej Vlček
 * @author Roman Andraščik
 */

/**
 * Adds two numbers.
 * @param {number} x - The first number to be added.
 * @param {number} y - The second number to be added.
 * @returns {number} The sum of x and y.
 */
function addition(x, y) {
	let res = x + y;
	return res.toFixed(6);
}

/**
 * Subtracts two numbers.
 * @param {number} x - The number to be subtracted from.
 * @param {number} y - The number to subtract.
 * @returns {number} The difference of x minus y.
 */
function subtraction(x, y) {
	let res = x - y;
	return res.toFixed(6);
}

/**
 * Multiplies two numbers.
 * @param {number} x - The first number to be multiplied.
 * @param {number} y - The second number to be multiplied.
 * @returns {number} The product of x and y.
 */
function multiplication(x, y) {
	let res = x * y;
	return res.toFixed(6);
}

/**
 * Divides two numbers.
 * @param {number} x - The dividend.
 * @param {number} y - The divisor.
 * @returns {number|string} The quotient of x divided by y, or an error message if division by zero.
 */
function division(x, y) {
	if (y == 0) {
		return "Division by zero!";
	}
	let res = x / y;
	return res.toFixed(6);
}

/**
 * Calculates the factorial of a number.
 * @param {number} x - The number to calculate the factorial of.
 * @returns {number|string} The factorial of x, or an error message if x is negative or a floating point number.
 */
function factorial(x) {
	if (x == 0 || x == 1) {
		return 1;
	}
	if (x < 0) {
		return "Factorial of negative number!";
	}
	if (x % 1 != 0) {
		return "Factorial of floating number!";
	}
	let sum = 1;
	for (let i = x; i > 0; i--) {
		sum = i * sum;
	}
	return sum;
}

/**
 * Calculates the result of raising a base to a power.
 * @param {number} x - The base.
 * @param {number} y - The exponent.
 * @returns {number} The result of x raised to the power of y.
 */
function exponential(x, y) {
	let res = x ** y;
	return res.toFixed(6);
}

/**
 * Calculates the nth root of a number.
 * @param {number} x - The degree of the root.
 * @param {number} y - The radicand.
 * @returns {number|string} The nth root of y, or an error message if x or y is invalid.
 */
function rooting(x, y) {
	if (y == 0) {
		return "Cannot compute 0th root!";
	}
	if (x < 0) {
		return "Cannot compute negative number";
	}
	if (y % 2 == 0 && x < 0) {
		return "Even root of negative number";
	}
	if (y % 1 != 0) {
		return "Degree is floating number!";
	}
	let res = x ** (1 / y);
	return res.toFixed(6);
}
/**
 * Calculates the remainder of a division operation.
 * @param {number} x - The dividend.
 * @param {number} y - The divisor.
 * @returns {number|string} The remainder of x divided by y, or an error message if division by zero.
 */
function modulo(x, y) {
	if (y == 0) {
		return "Division by zero!";
	}
	return x % y;
}

module.exports = {
	addition,
	subtraction,
	multiplication,
	division,
	factorial,
	exponential,
	rooting,
	modulo,
};
