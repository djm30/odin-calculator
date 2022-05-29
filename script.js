const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");

const input = document.querySelector(".input");
const result = document.querySelector(".result");

let firstNum = "";
let secondNum = "";
let operatorInput = "";
let isDecimal = false;
let firstInputDone = false;
let equalsPressed = false;
let prevResult = "";

const showInput = () => {
    console.clear();
    console.log(`${firstNum} ${operatorInput} ${secondNum}`);
    result.innerText = firstNum;
    if (operatorInput) {
        input.innerText = `${firstNum} ${operatorInput}`;
        result.innerText = secondNum;
    }
};

const reset = () => {
    firstNum = "";
    secondNum = "";
    operatorInput = "";
    isDecimal = false;
    firstInputDone = false;
};

const resetDisplay = () => {
    result.innerText = "";
    input.innerText = "";
    equalsPressed = false;
};

const calculate = () => {
    // CONVERT TO FLOAT
    let x = parseFloat(firstNum);
    let y = parseFloat(secondNum);
    // VERIFY BOTH NUMBERS
    if (!(x && y)) return;

    let result = 0;
    switch (operatorInput) {
        case "+":
            result = x + y;
            break;
        case "-":
            result = x - y;
            break;
        case "x":
            result = x * y;
            break;
        case "/":
            if (y === 0) break;
            result = x / y;
            break;
    }
    return result;
};

const numberInput = (num, input) => {
    if (!num && input == 0) return num;
    if (isDecimal && input == ".") return num;
    if (equalsPressed) resetDisplay();
    return (num += input);
};

const handleInput = (input) => {
    if (!firstInputDone) firstNum = numberInput(firstNum, input);
    else secondNum = numberInput(secondNum, input);
    showInput();
};

const handleOperatorInput = (input) => {
    if (!operatorInput && parseFloat(firstNum)) {
        firstInputDone = true;
        isDecimal = false;
        operatorInput = input;
    }
    if (equalsPressed) {
        firstNum = prevResult;
        firstInputDone = true;
        equalsPressed = false;
        operatorInput = input;
    } else {
        if (parseFloat(secondNum)) {
            firstNum = calculate();
            secondNum = "";
            isDecimal = false;
            operatorInput = input;
        }
    }
    showInput();
};

const handleDecimal = () => {
    handleInput(".");
    isDecimal = true;
    showInput();
};

const handleEquals = () => {
    if (parseFloat(secondNum)) {
        let calculationResult = Math.round(calculate() * 1000) / 1000;
        console.log(calculationResult);
        input.innerText = `${firstNum} ${operatorInput} ${secondNum}`;
        result.innerText = calculationResult;
        prevResult = calculationResult;
        equalsPressed = true;
        reset();
    }
};

// KEYBOARD INPUT
document.addEventListener("keypress", (e) => {
    console.log(e.key);
    if (parseFloat(e.key) || e.key === "0") handleInput(e.key);
    if (e.key === "=" || e.key === "Enter") handleEquals();
    if (e.key === ".") handleDecimal();
    if (e.key === "x" || e.key === "/" || e.key === "+" || e.key === "-")
        handleOperatorInput(e.key);
});

// NUMBERS EVENT LISTENER
numbers.forEach((num) => {
    num.addEventListener("click", (e) => {
        handleInput(num.dataset.value);
    });
});

// OPERATORS EVENT LISTENER
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        handleOperatorInput(operator.dataset.value);
    });
});

// DECIMAL EVENT LISTENER
decimal.addEventListener("click", (e) => {
    handleDecimal();
});

// EQUALS EVENT LISTENER
equals.addEventListener("click", (e) => {
    handleEquals();
});
