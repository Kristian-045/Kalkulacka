// Special characters sorted by PEMDAS weight
const regexOpWeighted = ["!", "^", "√", "%", "*", "/", "+", "-"];
const math = require("./math");

let errBool, errMsg;
let negFlagR = false,
	negFlagL = false;
// Works on PEMDAS basis
// Returns the result of the problem
function parse(probString) {
	let direction = 1,
		rightIndex,
		leftIndex,
		subStringReplaced,
		subStringCalculated;
	errBool = 0;
	//get rid of all parentheses
	for (let i = 0; i < probString.length; i += direction) {
		if (probString[i] === ")" && direction === 1) {
			rightIndex = i;
			direction = -1;
		} else if (probString[i] === "(" && direction === -1) {
			leftIndex = i;
			if (probString[i - 1] === "-") {
				//checks if the values in () should be inverted
				negFlagR = true;
				negFlagL = true;
				subStringReplaced = probString.substring(
					leftIndex - 1,
					rightIndex + 1,
				);
			} else {
				subStringReplaced = probString.substring(
					leftIndex,
					rightIndex + 1,
				);
			}
			subStringCalculated = probString.substring(
				leftIndex + 1,
				rightIndex,
			);
			// replace the expresssion in () with the result and change dir back to 1
			probString = probString.replace(
				subStringReplaced,
				findSpecialChar(subStringCalculated),
			);
			negFlagR = false;
			negFlagL = false;
			if (errBool === 1) {
				return errMsg;
			}
			direction = 1;
		}
	}
	// calculate the rest of the problem without the parentheses
	return findSpecialChar(probString);
}
function findSpecialChar(stringToCalc) {
	let result = stringToCalc,
		leftSide,
		rightSide,
		RIndex,
		LIndex;
	for (let i = 0; i < regexOpWeighted.length; i++) {
		// goes through the special characters that represent mathematical operations
		for (let j = 0; j < result.length; j++) {
			// goes through the string
			if (result[j] === regexOpWeighted[i]) {
				if (result[0] == "-" && j == 0) {
					continue;
				}
				//find leftsideIndex and create leftSide substring
				for (let k = j - 1; k >= 0; k--) {
					if ((isNaN(result[k]) && result[k] != ".") || k == 0) {
						if (k != 0) {
							k++;
						}
						if (result[k - 1] == "-" && isNaN(result[k - 2])) {
							k--;
						}
						LIndex = k;
						leftSide = result.substring(k, j);
						if (negFlagL == true) {
							leftSide = -leftSide;
						}
						break;
					}
				}
				//find rightsideIndex and creare rightSide substring
				for (let k = j + 1; k < result.length; k++) {
					rightSide = "";
					if (
						(isNaN(result[k]) && result[k] != ".") ||
						k + 1 == result.length
					) {
						if (result[k] == "-" && isNaN(result[k - 1])) {
							rightSide += "-";
							continue;
						}
						if (k + 1 == result.length) {
							k++;
						}
						RIndex = k;
						rightSide += result.substring(j + 1, k);
						if (negFlagR == true) {
							rightSide = -rightSide;
						}
						break;
					}
				}
				// create substring that is to be replaced by the result
				let replacethis = result.substring(LIndex, RIndex);
				// replace the substring in result by number calculated from calc
				result = result.replace(
					replacethis,
					calc(leftSide, rightSide, regexOpWeighted[i]),
				);
				j = 0;
				if (errBool === 1) {
					return errMsg;
				}
			}
		}
	}
	return "" + Number(result);
}
// returns the result of expression
function calc(leftSide, rightSide, specialChar) {
	if (specialChar == "^") {
		return math.exponential(leftSide, rightSide);
	} else if (specialChar == "√") {
		if (leftSide == " " || leftSide == undefined || leftSide == "") {
			leftSide = 2;
		}
		if (isNaN(math.rooting(rightSide, leftSide))) {
			errBool = 1;
			errMsg = math.rooting(rightSide, leftSide);
			return "";
		} else {
			return math.rooting(rightSide, leftSide);
		}
	} else if (specialChar == "!") {
		if (isNaN(math.factorial(leftSide))) {
			errBool = 1;
			errMsg = math.factorial(leftSide);
			return "";
		} else {
			return math.factorial(leftSide);
		}
	} else if (specialChar == "%") {
		if (isNaN(math.modulo(leftSide, rightSide))) {
			errBool = 1;
			errMsg = math.modulo(leftSide, rightSide);
			return "";
		} else {
			return math.modulo(leftSide, rightSide);
		}
	} else if (specialChar == "*") {
		return math.multiplication(leftSide, rightSide);
	} else if (specialChar == "/") {
		if (isNaN(math.division(leftSide, rightSide))) {
			errBool = 1;
			errMsg = math.division(leftSide, rightSide);
			return "";
		} else {
			return math.division(leftSide, rightSide);
		}
	} else if (specialChar == "+") {
		return math.addition(leftSide * 1, rightSide * 1);
	} else if (specialChar == "-") {
		return math.subtraction(leftSide, rightSide);
	}
}

module.exports = {
	parse,
	findSpecialChar,
	calc,
};
