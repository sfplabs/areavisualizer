export class ModeToggle {
    constructor(container, onChange) {
        this.element = document.createElement('div');
        this.element.className = 'control mode-toggle';
        
        this.button = document.createElement('button');
        this.button.textContent = 'Area';
        this.button.onclick = () => {
            const newMode = this.button.textContent.toLowerCase() === 'area' ? 'volume' : 'area';
            this.button.textContent = newMode.charAt(0).toUpperCase() + newMode.slice(1);
            onChange(newMode);
        };

        this.element.appendChild(this.button);
        container.appendChild(this.element);
    }
} 