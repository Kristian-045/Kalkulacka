module.exports = {

    addition: function(x, y) {
        return (x + y);
    },
    subtraction: function(x, y) {
        return (x - y);
    },
    multiplication: function (x, y) {
        return (x * y);
    },
    division: function (x, y) {
        if (y === 0) {
            return 'Division by zero!';
        }
        return (x / y);
    },
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
    exponential: function (x, y) {
        return (x ** y);
    },
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
            return 'Rooting with floating number!';
        }
        return (x ** (1/y));
    },
    modulo: function (x, y) {
        if (y === 0) {
            return 'Division by zero!';
        }
        return (x % y);
    },
}
