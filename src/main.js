import { Scene } from './core/Scene';
import { VisualizationManager } from './services/VisualizationManager';
import { ModeToggle } from './ui/ModeToggle';
import { MeasurementInput } from './ui/MeasurementInput';

class App {
    constructor() {
        this.setupUI();
        this.scene = new Scene(document.body);
        this.visualizationManager = new VisualizationManager(this.scene);
        
        this.animate();
    }

    setupUI() {
        const controls = document.createElement('div');
        controls.className = 'controls';
        document.body.appendChild(controls);

        new ModeToggle(controls, (mode) => {
            this.visualizationManager.setMode(mode);
            this.updateVisualization();
        });

        new MeasurementInput(controls, (value) => {
            this.currentMeasurement = value;
            this.updateVisualization();
        });
    }

    updateVisualization() {
        if (this.currentMeasurement !== undefined) {
            this.visualizationManager.updateVisualization(this.currentMeasurement);
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.scene.render();
    }
}

// Start the application
new App();
