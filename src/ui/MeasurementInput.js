export class MeasurementInput {
    constructor(container, onChange) {
        this.element = document.createElement('div');
        this.element.className = 'control measurement-input';
        
        this.input = document.createElement('input');
        this.input.type = 'number';
        this.input.min = '0';
        this.input.placeholder = 'Enter measurement';
        this.input.oninput = () => onChange(parseFloat(this.input.value) || 0);

        this.element.appendChild(this.input);
        container.appendChild(this.element);
    }
} 