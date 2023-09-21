let firstValue = '';
let secondValue = '';
let screenResetToggle = false;
let currentOperator = null;

const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const offButton = document.querySelector('.off');
const onButton = document.querySelector('.on');
const equalsButton = document.querySelector('.equals');

const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');

const numbersButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

deleteButton.addEventListener('click', deleteCharacter);
clearButton.addEventListener('click', clear);
offButton.addEventListener('click', clear);
onButton.addEventListener('click', on);
equalsButton.addEventListener('click', evaluate);

numbersButtons.forEach((button) => button.addEventListener('click', (e) =>
    additionalNumber(e.target.textContent)));

operatorButtons.forEach((operator) => operator.addEventListener('click', (e) =>
    setOperation(e.target.textContent)));



function additionalNumber(num) {
    if (displayBottom.textContent === '0' || screenResetToggle){
        resetScreen();
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
    displayBottom.textContent = '';
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
function on() {
    displayBottom.textContent = '0';
    displayTop.textContent = '';
    firstValue = '';
    secondValue = '';
    currentOperator = null;
    screenResetToggle = false;
}
function evaluate() {
    secondValue = displayBottom.textContent;
    displayBottom.textContent = roundNumber(operate(currentOperator, firstValue, secondValue));

}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    if (operator === "+"){
       return add(a, b);
    }
    
}
function roundNumber(num){
    return Math.round((num * 1000) / 1000);
}

function add(a, b){
    return a + b;
}