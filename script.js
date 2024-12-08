let display = document.getElementById("display");
let lastInputWasOperator = false;
let resultDisplayed = false;

function clearDisplay() {
    display.textContent = "0";
    lastInputWasOperator = false;
    resultDisplayed = false;
}

function appendToDisplay(value) {
    if (resultDisplayed) {
        display.textContent = value === "." ? "0." : value;
        resultDisplayed = false;
    } else if (display.textContent === "0" && value !== ".") {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
    lastInputWasOperator = false;
}

function appendOperator(operator) {
    if (resultDisplayed) {
        resultDisplayed = false;
    }
    if (lastInputWasOperator) {
        display.textContent = display.textContent.slice(0, -1) + operator;
    } else {
        display.textContent += operator;
        lastInputWasOperator = true;
    }
}

function calculate() {
    try {
        display.textContent = eval(display.textContent.replace("×", "*").replace("÷", "/"));
        lastInputWasOperator = false;
        resultDisplayed = true;
    } catch (error) {
        display.textContent = "Error";
    }
}

function calculatePercentage() {
    display.textContent = (parseFloat(display.textContent) / 100).toString();
    lastInputWasOperator = false;
    resultDisplayed = true;
}

function deleteLast() {
    display.textContent = display.textContent.slice(0, -1) || "0";
    lastInputWasOperator = false;
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendToDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        appendOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "%") {
        calculatePercentage();
    } else if (key === ".") {
        appendToDisplay(".");
    }
});
