/**
 * @file Testing of math.js
 * @module tests.js
 * @author Matej Vlček
 * @author Roman Andraščik
 */

// Importing assert module for assertions
const assert = require("assert");

// Importing math module for testing
const math = require("./math");

// Importing parser module for testing the parser
const parser = require("./parser");

// Testing the addition function
describe("Testing adding numbers function", function () {
	it("should add number right", function () {
		assert.equal(math.addition(1, 2), 3);
		assert.equal(math.addition(-2, 2), 0);
		assert.equal(math.addition(-5, -4), -9);
		assert.equal(math.addition(0, 0), 0);
		assert.equal(math.addition(0.5656, 2.26496), 2.83056);
	});
});

// Testing the subtraction function
describe("Testing subtracting numbers function", function () {
	it("should subtract number right", function () {
		assert.equal(math.subtraction(1, 2), -1);
		assert.equal(math.subtraction(-2, 2), -4);
		assert.equal(math.subtraction(-5, -4), -1);
		assert.equal(math.subtraction(0, 0), 0);
		assert.equal(math.subtraction(0.5656, 2.26496), -1.69936);
	});
});

// Testing the multiplication function
describe("Testing multiplication of numbers function", function () {
	it("should multiply number right", function () {
		assert.equal(math.multiplication(1, 2), 2);
		assert.equal(math.multiplication(-2, 2), -4);
		assert.equal(math.multiplication(-5, -4), 20);
		assert.equal(math.multiplication(0, 0), 0);
		assert.equal(math.multiplication(0.5656, 2.26496), 1.281061);
	});
});

// Testing the division function
describe("Testing dividion of numbers function", function () {
	it("should divide number right", function () {
		assert.equal(math.division(1, 2), 0.5);
		assert.equal(math.division(-2, 2), -1);
		assert.equal(math.division(-20, -4), 5);
		assert.equal(math.division(0.5656, 2.26496), 0.249717);
		assert.equal(math.division(1, 3), 0.333333);
	});
	it("should not divide number right", function () {
		// Testing division by zero
		assert.equal(math.division(10, 0), "Division by zero!");
	});
});

describe("Testing factorial of numbers function", function () {
	it("should do factorial right", function () {
		assert.equal(math.factorial(1), 1);
		assert.equal(math.factorial(5), 120);
		assert.equal(math.factorial(15), 1307674368000);
		assert.equal(math.factorial(0), 1);
	});
	it("should not do factorial right", function () {
		// Testing negative and floating-point numbers for factorial function
		assert.equal(math.factorial(-2), "Factorial of negative number!");
		assert.equal(math.factorial(0.5656), "Factorial of floating number!");
	});
});

// Testing the exponential function
describe("Testing exponential numbers function", function () {
	it("should return the right number", function () {
		assert.equal(math.exponential(1, 5), 1);
		assert.equal(math.exponential(-2, 2), 4);
		assert.equal(math.exponential(-5, -4), 0.001600);
		assert.equal(math.exponential(25, 0.5), 5);
		assert.equal(math.exponential(0.5, 3), 0.125);
		assert.equal(math.exponential(7, 1), 7);
		assert.equal(math.exponential(42, 0), 1);
	});
});

// Testing the rooting function
describe("Testing rooting of numbers function", function () {
	it("should root number right", function () {
		assert.equal(math.rooting(1, 2), 1);
		assert.equal(math.rooting(1, 3), 1);
		assert.equal(math.rooting(9, 2), 3);
		assert.equal(math.rooting(0.5656, 4), 0.867216);
	});
	it("should not root number right", function () {
		// Testing invalid scenarios for rooting function
		assert.equal(math.rooting(-125, 2), "Cannot compute negative number");
		assert.equal(math.rooting(8, 2.26496), "Degree is floating number!");
		assert.equal(math.rooting(8, 0), "Cannot compute 0th root!");
		assert.equal(math.rooting(-125, 3), "Cannot compute negative number");
	});
});

// Testing the modulo function
describe("Testing modulo of numbers function", function () {
	it("should return modulo right", function () {
		assert.equal(math.modulo(1, 2), 1);
		assert.equal(math.modulo(-2, 2), 0);
		assert.equal(math.modulo(-20, -4), 0);
		assert.equal(math.modulo(0.5656, 2.26496), 0.5656);
		assert.equal(math.modulo(77, 3), 2);
	});
	it("should not return modulo right", function () {
		// Testing division by zero scenario for modulo function
		assert.equal(math.modulo(10, 0), "Division by zero!");
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////           PARSER TESTS                  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Testing problems without parentheses
describe("Testing problems without parentheses", function () {
	it("should return the correct result", function () {
		assert.equal(parser.parse("25+6-7"), "24");
		assert.equal(parser.parse("25+6*7"), "67");
		assert.equal(parser.parse("25+6*7+2^2"), "71");
		assert.equal(parser.parse("25+6*7+2^2 - √4"), "69");
		assert.equal(parser.parse("25+6*7+2^2 - 2√16"), "67");
		assert.equal(parser.parse("2-2-2"), "-2");
		assert.equal(parser.parse("2--2--2"), "6");
		assert.equal(parser.parse("2-√4"), "0");
		assert.equal(parser.parse("2-5!"), "-118");
		assert.equal(parser.parse("5!^2"), "14400");
		assert.equal(parser.parse("5!-2"), "118");
	});
});
//Testing problems with parentheses
describe("Testing problems with parentheses", function () {
	it("should return the correct result", function () {
		assert.equal(parser.parse("(25+6)*7"), "217");
		assert.equal(parser.parse("25+((6*(7+2))^2)"), "2941");
		assert.equal(parser.parse("(25+6)*(7+2)"), "279");
		assert.equal(parser.parse("((25+6)*(7+2))"), "279");
	});
});
//Testing error messages
describe("Testing incorrect problems", function () {
	it("should return an error message", function () {
		assert.equal(parser.parse("0√312213"), "Cannot compute 0th root!");
		assert.equal(parser.parse("228922%0"), "Division by zero!");
		assert.equal(parser.parse("0.53!"), "Factorial of floating number!");
		assert.equal(parser.parse("240089%0"), "Division by zero!");
	});
});
