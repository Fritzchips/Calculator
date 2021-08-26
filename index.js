const outPut = document.querySelector(".output");

let firstOperand = "";
let secondOperand = "";
let thirdOperand = "";
let operator = "";
let period = false;

document.querySelectorAll(".number").forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    const number = numberButton.textContent;

    if (outPut.textContent.length === 10) return;
    if (!operator) {
      firstOperand += number;
      outPut.textContent = firstOperand;
    } else {
      secondOperand += number;
      outPut.textContent = secondOperand;
    }
  });
});

document.querySelector(".period").addEventListener("click", () => {
  if (!period && outPut.textContent.length < 10) {
    if (!operator) {
      if (outPut.textContent.value === "0") {
        firstOperand = "0.";
        outPut.textContent = firstOperand;
      } else {
        firstOperand += ".";
        outPut.textContent = firstOperand;
      }
      return (period = true);
    }

    if (operator) {
      if (secondOperand === "") {
        secondOperand += "0.";
        outPut.textContent = secondOperand;
      } else {
        secondOperand += ".";
        outPut.textContent = secondOperand;
      }
      return (period = true);
    }
  }
});

document.querySelectorAll(".operator").forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    const selectedOperator = operatorButton.textContent;

    if (secondOperand) {
      const result = calculate();
      firstOperand = result;
      secondOperand = "";
      period = false;
      operator = selectedOperator;
      outPut.textContent = result;
    }
    if (firstOperand) {
      operator = selectedOperator;
      period = false;
      return;
    }
  });
});

document.querySelector(".equal").addEventListener("click", () => {
  if (secondOperand) {
    const result = calculate();
    firstOperand = result;
    secondOperand = "";
    period = false;
    operator = "";
    outPut.textContent = result;
  }
});

document.querySelector(".clear").addEventListener("click", () => {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  period = false;
  outPut.textContent = "0";
});

document.querySelectorAll(".memory").forEach((memoryButton) => {
  memoryButton.addEventListener("click", () => {
    const memoryOperator = memoryButton.textContent;
    memoryActivate(memoryOperator);
  });
});

const memoryActivate = (memoryOperator) => {
  switch (memoryOperator) {
    case "MR":
      if (thirdOperand) {
        if (!operator) {
          firstOperand = thirdOperand;
          return (outPut.textContent = firstOperand);
        } else {
          secondOperand = thirdOperand;
          return (outPut.textContent = secondOperand);
        }
      }

    case "M+":
      if (!operator) return (thirdOperand = firstOperand);
      if (operator) return (thirdOperand = secondOperand);

    case "M-":
      return (thirdOperand = "");
  }
};

const calculate = () => {
  switch (operator) {
    case "+":
      return add();
    case "x":
      return multiply();
    case "÷":
      return divide();
    case "-":
      return subtract();
  }
};

const add = () => `${Number(firstOperand) + Number(secondOperand)}`;
const multiply = () => `${Number(firstOperand) * Number(secondOperand)}`;
const divide = () => `${Number(firstOperand) / Number(secondOperand)}`;
const subtract = () => `${Number(firstOperand) - Number(secondOperand)}`;
