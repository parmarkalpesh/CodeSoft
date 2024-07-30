document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let currentInput = '';
  let previousInput = '';
  let operator = null;

  const updateDisplay = () => {
    if (operator) {
      display.textContent = `${previousInput} ${operator} ${currentInput}`;
    } else {
      display.textContent = currentInput || previousInput || '0';
    }
  };

  const clearDisplay = () => {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
  };

  const handleNumber = (value) => {
    if (currentInput === '0' && value === '0') return;
    if (currentInput === '' && value === '.') currentInput = '0';
    if (currentInput.includes('.') && value === '.') return;
    currentInput += value;
    updateDisplay();
  };

  const handleOperator = (op) => {
    if (currentInput === '' && op !== '-') return;
    if (previousInput && currentInput && operator) {
      calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
  };

  const calculate = () => {
    if (!previousInput || !currentInput || !operator) return;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operator) {
      case '+':
        currentInput = (prev + curr).toString();
        break;
      case '-':
        currentInput = (prev - curr).toString();
        break;
      case '*':
        currentInput = (prev * curr).toString();
        break;
      case '/':
        if (curr === 0) {
          alert('Cannot divide by zero');
          clearDisplay();
          return;
        }
        currentInput = (prev / curr).toString();
        break;
    }
    operator = null;
    previousInput = '';
    updateDisplay();
  };

  const handleBackspace = () => {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    }
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    if (!isNaN(key) || key === '.') {
      handleNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      handleOperator(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Escape') {
      clearDisplay();
    } else if (key === 'Backspace') {
      handleBackspace();
    }
  };

  document.querySelector('.calculator-buttons').addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;

    const value = target.dataset.value;
    const type = target.dataset.type;

    switch (type) {
      case 'number':
        handleNumber(value);
        break;
      case 'operator':
        handleOperator(value);
        break;
      case 'decimal':
        handleNumber(value);
        break;
      case 'clear':
        clearDisplay();
        break;
      case 'equal':
        calculate();
        break;
    }
  });

  document.addEventListener('keydown', handleKeyPress);

  clearDisplay();
});
