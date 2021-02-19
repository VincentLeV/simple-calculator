const inputDisplay = document.querySelector(".input");
const secondDisplay = document.querySelector(".second-display");
const numBtn = document.querySelectorAll(".numbers button");
const operatorBtn = document.querySelectorAll(".operators button");
const equalBtn = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const backBtn = document.getElementById("backspace");
let deviceWidth = window.screen.width;

let secondNumDisplay = "";
let inputNumDisplay = "";
let result = null;
let lastOperation = "";
let haveDot = false;


numBtn.forEach( btn => {
    btn.addEventListener("click", e => {
        if (e.target.innerText === "." && !haveDot) { haveDot = true; } // Prevent display from showing the dot twice
        else if (e.target.innerText === "." && haveDot) { return; }

        inputNumDisplay += e.target.innerText;
        inputDisplay.innerText = inputNumDisplay;
    })
});

operatorBtn.forEach( operator => {
    operator.addEventListener("click", e => {
        if (!inputNumDisplay) result; // Check if there's any input number to go along with operator, if not then just show result
        haveDot = false; // Allow to add new dot to new number
        const operators = e.target.innerText;

        if (secondNumDisplay && inputNumDisplay && lastOperation) { // If num1, num2 and lastOperation are available, start calculation
            calculation();
        } else { // Otherwise, return the string as number
            result = parseFloat(inputNumDisplay);
        }

        lastOperation = operators; // Update the lastOperation with the operators var
        clearInput(operators); // Moving numbers from input display to output display
    })
});

function clearInput(op = "") {
    secondNumDisplay += `${inputNumDisplay} ${op} `; // secondDisplay and inputDisplay have the same numbers and secondDisplay has also operator
    secondDisplay.innerText = secondNumDisplay; // Update the secondDisplay
    inputDisplay.innerText = "";
    inputNumDisplay = "";
};

function calculation() {
    let total = Math.floor(result * 100) / 100;
    let num = parseFloat(inputNumDisplay);
    if (lastOperation === "+") {
        result = total + num;
    } else if (lastOperation === "-") {
        result = total - num;
    } else if (lastOperation === "*") {
        result = total * num;
    } else if (lastOperation === "/") {
        result = total / num;
    }

};

equalBtn.addEventListener("click", () => {
    if (!secondNumDisplay || !inputNumDisplay) return;
    haveDot = false;
    calculation();
    clearInput();
    inputDisplay.innerText = result;
    inputNumDisplay = result;
    secondNumDisplay = "";

    // Prevent overflow
    if (Number.isInteger(result) === false && inputDisplay.innerText.length >= 10) {
        inputDisplay.innerText = result.toFixed(11);
        if (deviceWidth > 500) {
            inputDisplay.style.cssText = "font-size: 32px";
            inputDisplay.innerText += "...";
        } else if (deviceWidth < 500) {
            secondDisplay.style.cssText = "font-size: 16px";
            inputDisplay.style.cssText = "font-size: 22px";
            inputDisplay.innerText += "...";
        }
    } 

    // If user divided by 0
    if (result == "Infinity") {
        inputDisplay.innerText = "ERROR"
    }
});

clearBtn.addEventListener("click", ()=> {
    secondNumDisplay = "";
    inputNumDisplay = "";
    inputDisplay.innerText = 0;
    secondDisplay.innerText = "";
    result = "";
    inputDisplay.style.cssText = "font-size: 40px;"
});

backBtn.addEventListener("click", () => {
    inputDisplay.innerText = "";
    inputNumDisplay = "";
});

window.addEventListener("keydown", (e) => {
    if (e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." 
    ) {
        numBtn.forEach ( button => {
            if (button.innerText === e.key) {
                button.click();
            }
        })
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/" 
    ) {
        operatorBtn.forEach ( button => {
            if (button.innerText === e.key) {
                button.click();
            }
        })
    } else if (e.key == "Enter" || e.keyCode === "13") {
        equalBtn.click();
    } else if (e.keyCode === 8) {
        backBtn.click();
    } else if (e.keyCode === 67) {
        clearBtn.click();
    }
});

