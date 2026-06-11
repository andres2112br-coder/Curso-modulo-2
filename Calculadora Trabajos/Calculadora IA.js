const display = document.getElementById('display');
const equation = document.getElementById('equation');
const buttons = document.querySelectorAll('.btn');

let currentExpression = '';
let currentEquation = '';

const updateDisplay = () => {
  display.value = currentExpression || '0';
  equation.textContent = currentEquation || '0';
};

const addCharacter = (value) => {
  if (currentExpression === '0' && value !== '.') {
    currentExpression = value;
  } else {
    currentExpression += value;
  }
  currentEquation = currentExpression;
  updateDisplay();
};

const calculate = () => {
  try {
    const normalized = currentExpression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E);

    const result = Function(`"use strict"; return (${normalized})`)();
    currentExpression = String(result);
    currentEquation = `${normalized} =`;
    updateDisplay();
  } catch (error) {
    currentExpression = '';
    currentEquation = 'Error';
    updateDisplay();
  }
};

const applyFunction = (action) => {
  const value = parseFloat(currentExpression);

  const setResult = (newValue) => {
    if (Number.isFinite(newValue)) {
      currentExpression = String(newValue);
      currentEquation = `${action}(${value || currentExpression})`;
    } else {
      currentExpression = '';
      currentEquation = 'Error';
    }
    updateDisplay();
  };

  if (action === 'clear') {
    currentExpression = '';
    currentEquation = '';
    updateDisplay();
  } else if (action === 'delete') {
    currentExpression = currentExpression.slice(0, -1);
    currentEquation = currentExpression;
    updateDisplay();
  } else if (action === 'toggle-sign') {
    if (currentExpression.startsWith('-')) {
      currentExpression = currentExpression.slice(1);
    } else {
      currentExpression = currentExpression ? `-${currentExpression}` : currentExpression;
    }
    currentEquation = currentExpression;
    updateDisplay();
  } else if (action === 'sqrt') {
    setResult(Math.sqrt(value));
  } else if (action === 'square') {
    setResult(value ** 2);
  } else if (action === 'power') {
    currentExpression += '**';
    currentEquation = currentExpression;
    updateDisplay();
  } else if (action === 'percent') {
    setResult(value / 100);
  } else if (action === 'pi') {
    currentExpression = String(Math.PI);
    currentEquation = 'π';
    updateDisplay();
  } else if (action === 'e') {
    currentExpression = String(Math.E);
    currentEquation = 'e';
    updateDisplay();
  } else if (action === 'ln') {
    setResult(Math.log(value));
  } else if (action === 'log10') {
    setResult(Math.log10(value));
  } else if (action === 'exp') {
    setResult(Math.exp(value));
  } else if (action === 'factorial') {
    const factorial = (n) => {
      if (n < 0 || !Number.isInteger(n)) return NaN;
      return n <= 1 ? 1 : n * factorial(n - 1);
    };
    setResult(factorial(value));
  } else if (action === 'sin') {
    setResult(Math.sin(value));
  } else if (action === 'cos') {
    setResult(Math.cos(value));
  } else if (action === 'tan') {
    setResult(Math.tan(value));
  } else if (action === 'asin') {
    setResult(Math.asin(value));
  } else if (action === 'acos') {
    setResult(Math.acos(value));
  } else if (action === 'atan') {
    setResult(Math.atan(value));
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action) {
      if (action === 'calculate') {
        calculate();
      } else {
        applyFunction(action);
      }
    } else if (value) {
      addCharacter(value);
    }
  });
});

updateDisplay();
