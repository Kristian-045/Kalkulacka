
const calculatorDisplay = document.getElementById('calculatorDisplay');
const calculatorButtons = document.querySelectorAll('.calculator-button');

// Importing math module 
const math = require('./math');

// Regex for only characters we support
const regexAll = /^[0-9+\/*s!-]+$/;
// Regex for operators
const regexOperators = /^[+\/*s!-]+$/;
// Special characters sorted by PEMDAS weight
const regexOpWeighted = ["^", "√","!","%","*","/","+","-"]; 


// button click support
for (let i = 0; i < calculatorButtons.length; i++){
    let button = calculatorButtons[i];

    button.addEventListener('click',(event) =>{
        let buttonId = button.id;
        takeAction(buttonId);
    })
}

// keyboard support without being focused on display
document.addEventListener('keydown',(event) =>{
    let calcValue = calculatorDisplay.value;

    if (event.key.toLowerCase().trim() === 'backspace'){
        event.preventDefault();
        backspace()
        return;
    }
    if (calculatorDisplay.id === document.activeElement.id) {
        return;
    }
    if (!regexAll.test(event.key)) {
        event.preventDefault();
        return;
    }
    if (!regexOperators.test(event.key)) {
        event.preventDefault();
        calculatorDisplay.value = calculatorDisplay.value + event.key;
        return;
    }

    if (!shouldInputSymbol(calcValue,event)){
        event.preventDefault();
        return;
    }

    // When We input operators do something

})

calculatorDisplay.addEventListener('keypress', (event) =>{
    let calcValue = calculatorDisplay.value;

    if (!regexAll.test(event.key)) {
        event.preventDefault();
        return;
    }
    if (!shouldInputSymbol(calcValue,event)){
        event.preventDefault();
        return;
    }

    if (!regexOperators.test(event.key)) {
        event.preventDefault();
        calculatorDisplay.value = calculatorDisplay.value + event.key;
        return;
    }


    // When We input operators do something
})

function shouldInputSymbol(calcValue,event){
    if (event.key === 's' && calcValue[calcValue.length - 1] === 's') {
        event.preventDefault();
        return false;
    }
    if (event.key === '!' && calcValue[calcValue.length - 1] === '!') {
        event.preventDefault();
        return false;
    }

    return true;
}

function takeAction(buttonName){
    let number = parseInt(buttonName);
    if (!isNaN(number)) {
        inputNumber(number)
        return;
    }

    switch (buttonName.trim()){
        // TODO: add other operations
        case 'backspace':
            backspace()
            break;
    }
}

function inputNumber(number){
    calculatorDisplay.value = calculatorDisplay.value + number;
}

function backspace(){
    calculatorDisplay.value = calculatorDisplay.value.substring(0,calculatorDisplay.value.length - 1)
}
 let errBool, errMsg;  
// Works on PEMDAS basis
// Returns the result of the problem
function parse(probString){
    let direction=1,rightIndex,leftIndex,subStringReplaced,subStringCalculated;
    errBool=0;
    //get rid of all parenthesis
    for(let i = 0; i < probString.length; i+=direction){
        if(probString[i] === ")" && direction === 1){
            rightIndex = i;
            direction = -1;
        }else if(probString[i] === "(" && direction === -1){
            leftIndex = i;
            subStringReplaced = probString.substring(leftIndex,rightIndex);
            subStringCalculated = probString.substring(leftIndex+1,rightIndex-1);
            // replace the expresssion in () with the result and change dir back to 1
            probString.replace(subStringReplaced,findSpecialChar(subStringCalculated));
            if(errBool===1){
                return errMsg;
            }
            direction = 1;
        }
    }
    // calculate the rest of the problem without the parenthesis
    return findSpecialChar(probString);
}
function findSpecialChar(stringToCalc){
    let result=stringToCalc,leftSide,rightSide,RIndex,LIndex;
    for(let i = 0; i < regexOpWeighted.length; i++){ // goes through the special characters that represent mathematical operations
        for(let j = 0; j < stringToCalc.length; j++){ // goes through the string
            if(stringToCalc[j]===regexOpWeighted[i]){
                //find leftsideIndex and create leftSide substring
                for(let k=j-1; k > 0;k--){
                    if(isNaN(stringToCalc[k]) && stringToCalc[k] !== "." && stringToCalc[k] !== " "){
                        LIndex = k;
                        leftSide = stringToCalc.subString(k,j-1);
                        break;
                    }
                }
                //find rightsideIndex and creare rightSide substring
                for(let k=j+1; k < stringToCalc.length ; k++){
                    if(isNaN(stringToCalc[k]) && stringToCalc[k] !== "." && stringToCalc[k] !== " "){
                        RIndex = k;
                        rightSide = stringToCalc.subString(k,j+1);
                        break;
                    }
                }
                // create substring that is to be replaced by the result
                let replacethis = stringToCalc.subString(LIndex,RIndex);
                // replace the substring in result by number calculated from calc
                result.replace(replacethis,calc(leftSide,rightSide,regexOpWeighted[i]))
                if(errBool===1){
                    return errMsg;
                }
            }
        }
    }
    return result;
}
// returns the result of expression
function calc(leftSide,rightSide,specialChar){
    if(specialChar == '^'){
        return math.exponential(leftSide,rightSide);
    }else if(specialChar == '√'){
        if(isNaN(math.rooting(rightSide,leftSide))){
            errBool = 1;
            errMsg = math.rooting(rightSide,leftSide);
            return "";
        }else{
            return math.rooting(rightSide,leftSide);
        }
    }else if(specialChar == '!'){
        if(isNaN(math.factorial(leftSide))){
            errBool = 1;
            errMsg = math.factorial(leftSide);
            return "";
        }else{
            return math.factorial(leftSide);
        }
    }else if(specialChar == '%'){
        if(isNaN(math.modulo(leftSide,rightSide))){
            errBool = 1;
            errMsg = math.modulo(leftSide,rightSide);
            return "";
        }else{
            return math.modulo(leftSide,rightSide);
        }
    }else if(specialChar == '*'){
        return math.multiplication(leftSide,rightSide);
    }else if(specialChar == '/'){
        if(isNaN( math.division(leftSide,rightSide))){
            errBool = 1;
            errMsg = math.division(leftSide,rightSide);
            return "";
        }else{
            return math.division(leftSide,rightSide);
        }
    }else if(specialChar == '+'){
        return math.addition(leftSide,rightSide);
    }else if(specialChar == '-'){
        return math.subtraction(leftSide,rightSide);
    }
}