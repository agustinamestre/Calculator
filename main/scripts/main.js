const result = document.getElementById("calculator-output");
const clearAll = document.getElementById("allClear");
const equal = document.getElementById("equal");
const clearLastValue = document.getElementById("clear");

const numbers = [];
const operations = ["div", "mult", "sub", "plus"];

const state = {
  leftOperand: 0,
  rightOperand: 0,
  operator: null
};

for (let i = 0; i <= 9; i++) {
  numbers.push(i);
}

const allowMoreOperations = () => !(document.getElementById("calculator-output").innerHTML === "Error")

const isOperatorPressed = () => state.operator

const trackNumberPressed = (operatorKeyName, pressedNumber) => {
  if (state[operatorKeyName] === 0) {
    state[operatorKeyName] = pressedNumber;
  } else {
    state[operatorKeyName] += pressedNumber;
  }
}

numbers.forEach(n => {
  document.getElementById(n).addEventListener("click", (ev) => {
    if (allowMoreOperations()) {
      const operandKeyName = isOperatorPressed() ? 'rightOperand' : 'leftOperand';
      trackNumberPressed(operandKeyName, ev.target.innerHTML);
      result.innerHTML = result.innerHTML + (ev.target.innerHTML);
    }
  })
})

operations.forEach(o => {
  document.getElementById(o).addEventListener("click", (ev) => {
    if (allowMoreOperations()) {
      result.innerHTML = result.innerHTML + ev.target.innerHTML;

      state.operator = ev.target.innerHTML;

      if (isOperatorPressed() !== null) {
        result.innerHTML = state.leftOperand + ev.target.innerHTML;
      } else {
        result.innerHTML = state.rightOperand + ev.target.innerHTML;
      }
    }
  });
});

document.getElementById("dot").addEventListener("click", dot => {
  if (allowMoreOperations()) {
    if (!isOperatorPressed() && !state.leftOperand.toString().includes(".")) {
      state.leftOperand += ".";
    } else if (isOperatorPressed() && !state.rightOperand.toString().includes(".")) {
      state.rightOperand += ".";
    }
    result.innerHTML = result.innerHTML + dot.target.innerHTML;
  }
})

equal.addEventListener("click", e => {
  if (allowMoreOperations()) {
    calc();
  }
})

clearLastValue.addEventListener("click", e => {
  if (allowMoreOperations()) {
    result.innerHTML = result.innerHTML.substring(0, result.innerHTML.length - 1);
  }
})

clearAll.addEventListener("click", e => {
  state.leftOperand = 0;
  state.rightOperand = 0;
  state.operator = null;
  result.innerHTML = " ";
})

function calc() {
  var res = 0;
  switch (state.operator) {
    case "+":
      res = +state.leftOperand + +state.rightOperand;
      break;
    case "-":
      res = +state.leftOperand - +state.rightOperand;
      break;
    case "x":
      res = +state.leftOperand * +state.rightOperand;
      break;
    case "÷":
      if (state.rightOperand == 0) {
        res = "Error";
      } else {
        res = +state.leftOperand / +state.rightOperand;
      }
      break;
  }
  result.innerHTML = res;
}