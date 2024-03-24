module.exports = {
    addition: function(x, y) {
        return x + y;
    },
    subtraction: function(x, y) {
        return x - y;
    },
    multiplication: function (x, y) {
        return x * y;
    },
    division: function (x, y) {
        return x / y;
    },
    factorial: function (x) {
        let sum = 0;
        for (let i = x; i > 0; i--) {
            sum += x * sum;
        }
        return sum;
    },
    exponential: function (x, y) {
        return x ** y;
    },
    rooting: function (x, y) {
        return x ** (1/y);
    },
    modulo: function (x, y) {
        return x % y;
    }
}
