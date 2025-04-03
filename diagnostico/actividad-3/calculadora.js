const display = document.getElementById("display");

const btn0 = document.getElementById("btn-0");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");

const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const btnMultiply = document.getElementById("btn-multiply");
const btnDivide = document.getElementById("btn-divide");
const btnDot = document.getElementById("btn-dot");

const btnEqual = document.getElementById("btn-equal");
const btnClear = document.getElementById("btn-clear");

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

// Asignación de eventos
btn0.onclick = () => appendToDisplay("0");
btn1.onclick = () => appendToDisplay("1");
btn2.onclick = () => appendToDisplay("2");
btn3.onclick = () => appendToDisplay("3");
btn4.onclick = () => appendToDisplay("4");
btn5.onclick = () => appendToDisplay("5");
btn6.onclick = () => appendToDisplay("6");
btn7.onclick = () => appendToDisplay("7");
btn8.onclick = () => appendToDisplay("8");
btn9.onclick = () => appendToDisplay("9");

btnPlus.onclick = () => appendToDisplay("+");
btnMinus.onclick = () => appendToDisplay("-");
btnMultiply.onclick = () => appendToDisplay("*");
btnDivide.onclick = () => appendToDisplay("/");
btnDot.onclick = () => appendToDisplay(".");

btnClear.onclick = clearDisplay;
btnEqual.onclick = calculateResult;