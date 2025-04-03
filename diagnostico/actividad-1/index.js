(() => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let previousValue = null;

    const updateDisplay = (value) => {
        display.value = value;
    };

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                currentInput += value;
                updateDisplay(currentInput);
            } else if (button.classList.contains('operation')) {
                if (currentInput) {
                    previousValue = parseFloat(currentInput);
                    currentInput = '';
                }
                operator = value;
            } else if (button.classList.contains('equals')) {
                if (previousValue !== null && currentInput && operator) {
                    const currentValue = parseFloat(currentInput);
                    let result;
                    switch (operator) {
                        case '+': result = previousValue + currentValue; break;
                        case '-': result = previousValue - currentValue; break;
                        case '*': result = previousValue * currentValue; break;
                        case '/': result = previousValue / currentValue; break;
                    }
                    updateDisplay(result);
                    currentInput = '';
                    previousValue = null;
                    operator = null;
                }
            } else if (button.classList.contains('clear')) {
                currentInput = '';
                previousValue = null;
                operator = null;
                updateDisplay('');
            }
        });
    });
})();
