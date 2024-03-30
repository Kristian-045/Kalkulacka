
const calculatorDisplay = document.getElementById('calculatorDisplay');
const calculatorButtons = document.querySelectorAll('.calculator-button');

// Regex for only characters we support
const regexAll = /^[0-9+\/*s!-]+$/;
// Regex for operators
const regexOperators = /^[+\/*s!-]+$/;


// button click support
for (let i = 0; i < calculatorButtons.length; i++){
    let button = calculatorButtons[i];

    button.addEventListener('click',(event) =>{
        let buttonId = button.id;
        takeAction(buttonId);
    })
}

// keyboard support without being focused on display
document.addEventListener('keypress',(event) =>{
    let calcValue = calculatorDisplay.value;
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