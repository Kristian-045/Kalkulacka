const assert = require('assert');
const math = require('./math');

describe('Testing adding numbers function', function (){
    it('should add number right',function(){
        assert.equal(math.add(1,2),3);
    })
});