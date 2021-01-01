const result = document.getElementById("calculator-output");
const clearAll = document.getElementById("allClear");
const equal = document.getElementById("equal");
const clearLastValue = document.getElementById("clear");

const numbers = [];
const operations = ["div", "mult", "sub", "plus"];

let leftOperand = 0;
let rightOperand = 0;
let operator = null;

for (let i = 0; i <= 9; i++) {
  numbers.push(i);
}

const allowMoreOperations = () => !(document.getElementById("calculator-output").innerHTML === "Error")

document.getElementById("dot").addEventListener("click", dot => {
  if (allowMoreOperations()) {
    result.innerHTML = result.innerHTML + dot.target.innerHTML;
  }
})

numbers.forEach(n => {
  document.getElementById(n).addEventListener("click", (ev) => {
    if (allowMoreOperations()) {
      result.innerHTML = result.innerHTML + (ev.target.innerHTML);
      if (!operator) {
        if (leftOperand === 0) {
          leftOperand = ev.target.innerHTML;
        } else {
          leftOperand += ev.target.innerHTML;
        }
      } else {
        rightOperand += ev.target.innerHTML;
      }
    }
  });
})

operations.forEach(o => {
  document.getElementById(o).addEventListener("click", (ev) => {
    if (allowMoreOperations()) {
      result.innerHTML = result.innerHTML + ev.target.innerHTML;

      operator = ev.target.innerHTML;

      if (operator !== null) {
        result.innerHTML = leftOperand + ev.target.innerHTML;
      } else {
        result.innerHTML = result.innerHTML + operator;
      }
    }
  });
})

equal.addEventListener("click", e => {
  if (allowMoreOperations()) {
    calc(+leftOperand, operator, +rightOperand);
  }
})

clearLastValue.addEventListener("click", e => {
  if (allowMoreOperations()) {
    result.innerHTML = result.innerHTML.substring(0, result.innerHTML.length - 1);
  }
})

clearAll.addEventListener("click", e => {
  leftOperand = 0;
  rightOperand = 0;
  operator = null;
  result.innerHTML = " ";
})

function calc(leftOperand, operator, rightOperand) {
  var res = 0;
  switch (operator) {
    case "+":
      res = leftOperand + rightOperand;
      break;
    case "-":
      res = leftOperand - rightOperand;
      break;
    case "x":
      res = leftOperand * rightOperand;
      break;
    case "÷":
      if (rightOperand == 0) {
        res = "Error";
      } else {
        res = leftOperand / rightOperand;
      }
      break;
  }

  result.innerHTML = res;
}
