import * as THREE from 'three';
import { COLORS, OPACITY } from '../config/colors';

export class VisualizationManager {
    constructor(scene) {
        this.scene = scene;
        this.currentMode = 'area';
        this.currentShape = 'cube';
    }

    updateVisualization(measurement, units) {
        this.scene.clearMeasurements();

        if (this.currentMode === 'area') {
            this.visualizeArea(measurement);
        } else {
            this.visualizeVolume(measurement);
        }
    }

    visualizeArea(measurement) {
        const size = Math.sqrt(measurement);
        const geometry = new THREE.PlaneGeometry(size, size);
        
        // Move the geometry so its corner is at the origin
        geometry.translate(size/2, -size/2, 0);
        
        const material = new THREE.MeshStandardMaterial({
            color: COLORS.shape,
            transparent: true,
            opacity: OPACITY.shape,
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;

        // Add wireframe
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: COLORS.shapeOutline })
        );
        line.rotation.x = -Math.PI / 2;

        this.scene.scene.add(plane);
        this.scene.scene.add(line);
    }

    visualizeVolume(measurement) {
        const size = Math.cbrt(measurement);
        let geometry;
        
        if (this.currentShape === 'cube') {
            geometry = new THREE.BoxGeometry(size, size, size);
            // Move the geometry so its corner is at the origin
            geometry.translate(size/2, size/2, size/2);
        } else {
            geometry = new THREE.SphereGeometry(size/2, 32, 32);
            // Move the sphere so it sits on the origin
            geometry.translate(size/2, size/2, size/2);
        }

        const material = new THREE.MeshStandardMaterial({
            color: COLORS.shape,
            transparent: true,
            opacity: OPACITY.shape
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // Add wireframe
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: COLORS.shapeOutline })
        );

        this.scene.scene.add(mesh);
        this.scene.scene.add(line);
    }

    setMode(mode) {
        this.currentMode = mode;
    }

    setShape(shape) {
        this.currentShape = shape;
    }
} 