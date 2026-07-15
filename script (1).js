let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    display.value = expression;
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression === '' && op !== '.') {
        return;
    }

    // Handle decimal point
    if (op === '.') {
        // Check if decimal already exists in current number
        let lastOperatorIndex = Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/')
        );
        
        let currentNumber = expression.substring(lastOperatorIndex + 1);
        
        if (currentNumber.includes('.')) {
            return;
        }
        
        if (currentNumber === '') {
            expression += '0.';
        } else {
            expression += '.';
        }
    } else {
        // Prevent operator at the start (except for negative numbers)
        if (expression === '' && op !== '-') {
            return;
        }

        // Prevent multiple operators in a row
        let lastChar = expression[expression.length - 1];
        if (['+', '-', '*', '/'].includes(lastChar)) {
            expression = expression.slice(0, -1) + op;
        } else {
            expression += op;
        }
    }

    display.value = expression;
}

function calculate() {
    try {
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle floating point precision
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

function clearDisplay() {
    expression = '';
    display.value = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    } else if (e.key === '.') {
        e.preventDefault();
        appendOperator('.');
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});