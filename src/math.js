module.exports = {

    addition: function(x, y) {
        return ( x + y);
    },
    subtraction: function(x, y) {
        return ( x - y);
    },
    multiplication: function (x, y) {
        return (x * y);
    },
    division: function (x, y) {
        if (y === 0) {
            throw new Error('Division by zero!');
        }
        return (x / y);
    },
    factorial: function (x) {
        if (x === 0 || x === 1) {
            return 1;
        }
        if (x < 0) {
            throw new Error('Factorial of negative number!');
        }
        if ((x % 1) !== 0) {
            throw new Error('Factorial of floating number!');
        }
        let sum = 1;
        for (let i = x; i > 0; i--) {
            sum = i * sum;
        }
        return (sum);
    },
    exponential: function (x, y) {
        return (x ** y);
    },
    rooting: function (x, y) {
        if (y === 0) {
            throw new Error('Cannot compute 0th root!');
        }
        if (x < 0) {
            throw new Error('Cannot compute negative number')
        }
        if (y % 2 === 0) {
            throw new Error('Factorial of floating number!');
        }
        return (x ** (1/y));
    },
    modulo: function (x, y) {
        if (y === 0) {
            throw new Error('Division by zero!');
        }
        return (x % y);
    },
}
