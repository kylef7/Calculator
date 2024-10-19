let firstNumber = null;
let operator = null;
let secondNumber = null;
let resultDisplay = true;
let operatorPressed = false;
let equalsPressed = false;
let dotPressed = false;

const displayText = document.querySelector("#displayText");
const numbers = document.querySelectorAll('button.number');
const operators = document.querySelectorAll('button.operator');
const equals = document.querySelector('.equalsButton');
const clear = document.querySelector('.clearButton');

displayText.textContent = "0";

newArr = ['+', '-', '*', '/'];

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      button.blur(); 
    });
  });

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        equals.click();
    }

    for (let i = 0; i <= 9; i++) {
        if (event.key === i.toString()) {
            numbers.forEach((button) => {
                if (button.textContent === i.toString()) {
                    button.click();
                }
            })
        } 
    }

    for (let i = 0; i < newArr.length; i++) {
        if (event.key === newArr[i]) {
            operators.forEach(button => {
                if (button.textContent === newArr[i]) {
                    button.click();
                }
            })
        }
    }

    if (event.key === '.') {
        numbers.forEach((button) => {
            if (button.textContent === '.') {
                button.click();
            }
        })
    }

   
});
    

numbers.forEach(button => {
    button.addEventListener('click', function (event) {

        if (event.target.textContent === "." && dotPressed === true) {
            return;
        }

        if (event.target.textContent === ".") {
            dotPressed = true;
        }

        if (resultDisplay === true) {
            displayText.textContent = '';
            resultDisplay = false;
            dotPressed = false;
        }

        displayText.textContent += event.target.textContent;
        operatorPressed = false;
        equalsPressed = false;
    });
})

operators.forEach(button => {
    button.addEventListener('click', function (event) {
        if (operatorPressed === true) {
            return;
        }

        operatorPressed = true;



        if (firstNumber === null) {
            firstNumber = displayText.textContent;
            operator = event.target.textContent;
            resultDisplay = true;
        } else {
            secondNumber = displayText.textContent;
            operate();

            firstNumber = displayText.textContent;
            operator = event.target.textContent;
            secondNumber = null;
        }

    })
});

equals.addEventListener('click', function () {
    if (equalsPressed === true) {
        displayText.textContent = "";
        return;
    }

    if (firstNumber === null) {
        return;
    }

    equalsPressed = true;

    secondNumber = displayText.textContent;
    operate();

    firstNumber = null;
    secondNumber = null;
    dotPressed = false;
});

clear.addEventListener('click', function () {
    displayText.textContent = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    dotPressed = false;
})

function operate() {
    let result;

    if (operator === "+") {
        result = add(parseFloat(firstNumber), parseFloat(secondNumber));
    }

    if (operator === "-") {
        result = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
    }

    if (operator === "*") {
        result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
    }

    if (operator === "/") {
        if (secondNumber === "0") {
            result = "bad!";
        } else {

            result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
        }
    }

    if (result.toString().length > 7) {
        result = Math.floor(result * 10000) / 10000;
    }

    displayText.textContent = result;
    resultDisplay = true;
}


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}