class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
        this.previousOperandEl = previousOperandEl;
        this.currentOperandEl  = currentOperandEl;
        this.reset();
    }


    reset() {
        this.current     = '0';
        this.previous    = null;
        this.operation   = null;
        this.freshResult = false;
        this.updateDisplay();
    }



    deleteLast() {
        if (this.freshResult) { this.reset(); return; }
        if (this.current === 'Error' || this.current.length === 1) {
            this.current = '0';
        } else {
            this.current = this.current.slice(0, -1);
        }
        this.updateDisplay();
    }


    appendNumber(num) {
        if (this.freshResult) {
            this.current     = '';
            this.freshResult = false;
        }
        if (num === '.' && this.current.includes('.')) return;
        if (this.current === '0' && num !== '.') {
            this.current = num;
        } else {
            this.current += num;
        }
        this.updateDisplay();
    }



    chooseOperation(op) {
        if (this.current === 'Error') return;

        if (this.operation !== null && !this.freshResult) {
            this._compute();
        }

        this.operation   = op;
        this.previous    = parseFloat(this.current);
        this.freshResult = false;
        this.current     = '0';
        this.updateDisplay();
    }

    applyFunction(fn) {
        const val = parseFloat(this.current);
        if (isNaN(val)) return;

        let result;
        const DEG = Math.PI / 180;
        switch (fn) {
            case 'sin': result = Math.sin(val * DEG); break;
            case 'cos': result = Math.cos(val * DEG); break;
            case 'tan': result = Math.tan(val * DEG); break;
            case '√':   result = val < 0 ? NaN : Math.sqrt(val); break;
            default:    return;
        }

        this.previousOperandEl.textContent = `${val} ${fn} =`;
        this.current   = isNaN(result) || !isFinite(result) ? 'Error' : this._fmt(result);
        this.previous  = null;
        this.operation = null;
        this.freshResult = true;
        this.currentOperandEl.textContent = this.current;
    }

    evaluate() {
        if (this.operation === null || this.previous === null) return;
        if (this.current === 'Error') return;

        const label = `${this.previous} ${this.operation} ${this.current} =`;
        this._compute();
        this.previousOperandEl.textContent = label;
        this.currentOperandEl.textContent = this.current;
    }

    _compute() {
        const a = this.previous;
        const b = parseFloat(this.current);
        if (a === null || isNaN(a) || isNaN(b)) return;

        let result;
        switch (this.operation) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case 'x': result = a * b; break;
            case '÷': result = b === 0 ? Infinity : a / b; break;
            case '^': result = Math.pow(a, b); break;
            default:  return;
        }

        this.current     = !isFinite(result) ? 'Error' : this._fmt(result);
        this.previous    = null;
        this.operation   = null;
        this.freshResult = true;
    }

    _fmt(n) {
        if (Math.abs(n) < 1e15 && Math.abs(n) > 1e-7 || n === 0) {
            const s = parseFloat(n.toPrecision(10)).toString();
            return s;
        }
        return n.toExponential(4);
    }

    updateDisplay() {
        if (this.currentOperandEl) {
            this.currentOperandEl.textContent = this.current;
        }
        if (this.previousOperandEl) {
            if (this.operation !== null && this.previous !== null) {
                this.previousOperandEl.textContent = `${this.previous} ${this.operation}`;
            } else {
                this.previousOperandEl.textContent = '';
            }
        }
    }
}

const previousOperandEl = document.querySelector('[data-previous-operand]');
const currentOperandEl  = document.querySelector('[data-current-operand]');
const calc = new Calculator(previousOperandEl, currentOperandEl);

document.querySelectorAll('[data-number]').forEach(btn =>
    btn.addEventListener('click', () => calc.appendNumber(btn.dataset.number))
);

document.querySelectorAll('[data-operation]').forEach(btn =>
    btn.addEventListener('click', () => calc.chooseOperation(btn.dataset.operation))
);

document.querySelectorAll('[data-function]').forEach(btn =>
    btn.addEventListener('click', () => calc.applyFunction(btn.dataset.function))
);

document.querySelector('[data-equal]').addEventListener('click',  () => calc.evaluate());
document.querySelector('[data-clear]').addEventListener('click',  () => calc.reset());
document.querySelector('[data-delete]').addEventListener('click', () => calc.deleteLast());

document.addEventListener('keydown', e => {
    if      (e.key >= '0' && e.key <= '9') calc.appendNumber(e.key);
    else if (e.key === '.')                 calc.appendNumber('.');
    else if (e.key === '+')                 calc.chooseOperation('+');
    else if (e.key === '-')                 calc.chooseOperation('-');
    else if (e.key === '*')                 calc.chooseOperation('x');
    else if (e.key === '/') { e.preventDefault(); calc.chooseOperation('÷'); }
    else if (e.key === '^')                 calc.chooseOperation('^');
    else if (e.key === 'Enter' || e.key === '=') calc.evaluate();
    else if (e.key === 'Backspace')         calc.deleteLast();
    else if (e.key === 'Escape')            calc.reset();
});