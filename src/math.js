/**
 * @file Mathematical library
 * @author Matej Vlček
 * @author Roman Andraščik
 */

module.exports = {
    /**
     * Function doing addition of two numbers
     * @param x augent
     * @param y addend
     * @returns {number} sum
     */
    addition: function(x, y) {
        return (x + y);
    },

    /**
     * Function doing subtraction of two number
     * @param x minuend
     * @param y subtrahend
     * @returns {number} difference
     */
    subtraction: function(x, y) {
        return (x - y);
    },

    /**
     * Function doing multiplication of two numbers
     * @param x multiplier
     * @param y multiplicand
     * @returns {number} product
     */
    multiplication: function (x, y) {
        return (x * y);
    },

    /**
     * Function doing division of two numbers
     * @param x dividend
     * @param y divisor
     * @returns {number|string} fraction | error message
     */
    division: function (x, y) {
        if (y === 0) {
            return 'Division by zero!';
        }
        return (x / y);
    },

    /**
     * Function doing factorial
     * @param x base
     * @returns {number|string} factorial | error message
     */
    factorial: function (x) {
        if (x === 0 || x === 1) {
            return 1;
        }
        if (x < 0) {
            return 'Factorial of negative number!';
        }
        if ((x % 1) !== 0) {
            return 'Factorial of floating number!';
        }
        let sum = 1;
        for (let i = x; i > 0; i--) {
            sum = i * sum;
        }
        return (sum);
    },

    /**
     * Function doing exponential
     * @param x base
     * @param y exponent
     * @returns {number} power
     */
    exponential: function (x, y) {
        return (x ** y);
    },

    /**
     * Function doing nth root
     * @param x degree
     * @param y radicand
     * @returns {number|string} root
     */
    rooting: function (x, y) {
        if (y === 0) {
            return 'Cannot compute 0th root!';
        }
        if (x < 0) {
            return 'Cannot compute negative number';
        }
        if (y % 2 === 0 && x < 0) {
            return 'Even root of negative number';
        }
        if (y % 1 !== 0) {
            return 'Degree is floating number!';
        }
        return (x ** (1/y));
    },

    /**
     * Function doing nth modulo
     * @param x dividend
     * @param y divisor
     * @returns {number|string} modulo | error message
     */
    modulo: function (x, y) {
        if (y === 0) {
            return 'Division by zero!';
        }
        return (x % y);
    },
}
