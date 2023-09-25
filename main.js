let firstValue = '';
let secondValue = '';
let screenResetToggle = false;
let currentOperator = null;
let storedValue = '';
let memStored = ''; 
let accumulatedMemory = '';

const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const offButton = document.querySelector('.off');
const onButton = document.querySelector('.on');
const equalsButton = document.querySelector('.equals');
const percentageButton = document.querySelector('.percentage');
const negativeButton = document.querySelector('.negative');
const memPlusButton = document.querySelector(`.memory-plus`);
const memRecallButton = document.querySelector(`.memory-recall`);
const memClearButton = document.querySelector(`.memory-clear`);
const memSubtractButton = document.querySelector(`.memory-subtract`);

const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

deleteButton.addEventListener('click', deleteCharacter);
clearButton.addEventListener('click', clear);
offButton.addEventListener('click', off);
onButton.addEventListener('click', clear);
equalsButton.addEventListener('click', evaluate);
percentageButton.addEventListener('click', percentage);
negativeButton.addEventListener('click', negative);
memPlusButton.addEventListener('click', memPlus);
memClearButton.addEventListener('click', memClear);
memRecallButton.addEventListener('click', memRecall);
memSubtractButton.addEventListener('click', memSubtract);

numberButtons.forEach((button) => button.addEventListener('click', (e) =>
    additionalNumber(e.target.textContent)));

operatorButtons.forEach((operator) => operator.addEventListener('click', (e) =>
    setOperation(e.target.textContent)));


function additionalNumber(num) {
    if (displayBottom.textContent === '0' || screenResetToggle){
        resetScreen();
    }
    if (num === "."){
        if (displayBottom.textContent.indexOf(".") > -1){
        alert('only one decimal allowed');
        return
        }
    } 
    displayBottom.textContent += num;
}

function setOperation(operator) {
    if (currentOperator !== null) {
        evaluate();
    }
    firstValue = displayBottom.textContent;
    currentOperator = operator;
    displayTop.textContent = `${firstValue} ${currentOperator}`;
    screenResetToggle = true;
}

function clear(){
    displayBottom.textContent = '0';
    displayTop.textContent = '';
    firstValue = '';
    secondValue = '';
    currentOperator = null;
    screenResetToggle = false;
}

function deleteCharacter() {
    displayBottom.textContent = displayBottom.textContent.toString().slice(0, -1);
}

function resetScreen() {
    displayBottom.textContent = '';
    screenResetToggle = false;
}

function off() {
    displayBottom.textContent = '';
    displayTop.textContent = '';
    firstValue = '';
    secondValue = '';
    currentOperator = null;
    screenResetToggle = false;
}

function evaluate() {
    if (currentOperator === null){
        return
    }
    secondValue = displayBottom.textContent;
    displayBottom.textContent = roundNumber(operate(currentOperator, firstValue, secondValue));
    displayTop.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;
    currentOperator = null;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    if (operator === "+"){
       return add(a, b);
    }
    else if (operator === "-"){
        return subtract(a,b);
    }
    else if (operator === "x"){
        return multiply(a,b);
    }
    else if (operator === "÷"){
        if(b === 0){
            alert("Cannot divide by 0");
            return;
        }
        else {
        return divide(a,b);
        }
    }   
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function divide(a, b){
    return a / b;
}

function multiply(a, b){
    return a * b;
}

function percentage(operator){
    operator = currentOperator;
    secondValue = displayBottom.textContent;
    let storedValue = (firstValue * secondValue) / 100;
    if (operator === "+"){
        displayTop.textContent = `(${firstValue} * ${secondValue} / 100) + ${firstValue}`
        displayBottom.textContent = Number(storedValue) + Number(firstValue);
    } else if (operator === "-"){
        displayTop.textContent = `${firstValue} - (${firstValue} * ${secondValue} / 100)`
        displayBottom.textContent = firstValue - storedValue;
    }
}

function negative(){
    if (displayBottom.textContent === "0" || displayBottom.textContent === ""){
        resetScreen()
        displayBottom.textContent += "-";
    } else if (displayBottom.textContent[0] === "-"){
        displayBottom.textContent = displayBottom.textContent.slice(1, displayBottom.textContent.length);
    } else if (displayBottom.textContent !== ""){
        displayBottom.textContent = "-" + displayBottom.textContent;
    }
}

function memPlus(){
    if (currentOperator === null){
        return
    }
    secondValue = displayBottom.textContent;
    displayBottom.textContent = roundNumber(operate(currentOperator, firstValue, secondValue));
    displayTop.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;
    currentOperator = null;
    memStored = Number(displayBottom.textContent);
    screenResetToggle = true; 
    accumulatedMemory = Number(accumulatedMemory);
    accumulatedMemory += Number(memStored);
}

function memRecall(){
    displayBottom.textContent = accumulatedMemory;
}

function memClear(){
    memStored = '';
    accumulatedMemory = '';
    if (memStored === 0){
        resetScreen();
    }
}

function memSubtract(){
    if (currentOperator === null){
        return
    }
    secondValue = displayBottom.textContent;
    displayBottom.textContent = roundNumber(operate(currentOperator, firstValue, secondValue));
    displayTop.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;
    currentOperator = null;
    
    memStored = Number(displayBottom.textContent);
    
    console.log(memStored);
    console.log(typeof(memStored));
    screenResetToggle = true; 
    
    accumulatedMemory += (Number(memStored));
    accumulatedMemory = Number(accumulatedMemory* -1);
    console.log(accumulatedMemory)
    
    console.log(typeof(accumulatedMemory));
    
}
