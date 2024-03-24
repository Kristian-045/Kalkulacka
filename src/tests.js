const assert = require('assert');
const math = require('./math');

describe('Testing adding numbers function', function (){
    it('should add number right',function(){
        assert.equal(math.addition(1,2),3);
        assert.equal(math.addition(-2,2),0);
        assert.equal(math.addition(-5,-4),-9);
        assert.equal(math.addition(0,0),0);
        assert.equal(math.addition(0.5656,2.26496),2.83056);
    })
});

describe('Testing subtracting numbers function', function (){
    it('should subtract number right',function(){
        assert.equal(math.subtraction(1,2),-1);
        assert.equal(math.subtraction(-2,2),-4);
        assert.equal(math.subtraction(-5,-4),-1);
        assert.equal(math.subtraction(0,0),0);
        assert.equal(math.subtraction(0.5656,2.26496),-1.69936);
    })
});

describe('Testing subtracting numbers function', function (){
    it('should multiply number right',function(){
        assert.equal(math.multiplication(1,2),2);
        assert.equal(math.multiplication(-2,2),-4);
        assert.equal(math.multiplication(-5,-4),20);
        assert.equal(math.multiplication(0,0),0);
        assert.equal(math.multiplication(0.5656,2.26496),1.281061376);
    })
});

describe('Testing subtracting numbers function', function (){
    it('should divide number right',function(){
        assert.equal(math.division(1,2),0.5);
        assert.equal(math.division(-2,2),-1);
        assert.equal(math.division(-20,-4),5);
        assert.equal(math.division(0.5656,2.26496),0.2497174343034756);
        assert.equal(math.division(1,3),0.3333333333333333);
    })
    it('should not divide number right',function(){
        assert.equal(math.division(10,0),Error);
    })
});

describe('Testing factorial of numbers function', function (){
    it('should do factorial right',function(){
        assert.equal(math.factorial(1),1);
        assert.equal(math.factorial(5),120);
        assert.equal(math.factorial(15),1307674368000);
        assert.equal(math.factorial(0),1);
    })
    it('should not do factorial right',function(){
        assert.throws(math.factorial(-2));
        assert.throws(math.factorial(0.5656));
    })
});

describe('Testing exponential numbers function', function (){
    it('should return the right number',function(){
        assert.equal(math.exponential(1,5),1);
        assert.equal(math.exponential(-2,2),4);
        assert.equal(math.exponential(-5,-4),-0.0016);
        assert.equal(math.exponential(25,0.5),5);
        assert.equal(math.exponential(0.5,3),0.125);
        assert.equal(math.exponential(7,1),7);
        assert.equal(math.exponential(42,0),1);
    })
});

describe('Testing rooting of numbers function', function (){
    it('should root number right',function(){
        assert.equal(math.rooting(1,2),1);
        assert.equal(math.rooting(1,3),1);
        assert.equal(math.rooting(0.5656,4),0.8672161363);
    })
    it('should not root number right',function(){
        assert.equal(math.rooting(-125,2),Error);
        assert.equal(math.rooting(8,2.26496),Error);
        assert.equal(math.rooting(8,0),Error);
        assert.equal(math.rooting(-125,3),-5);
    })
});

describe('Testing modulo of numbers function', function (){
    it('should return modulo right',function(){
        assert.equal(math.modulo(1,2),1);
        assert.equal(math.modulo(-2,2),0);
        assert.equal(math.modulo(-20,-4),0);
        assert.equal(math.modulo(0.5656,2.26496),0.5656);
        assert.equal(math.modulo(77,3),2);
    })
    it('should not return modulo right',function(){
        assert.equal(math.modulo(10,0),Error);
    })
});


