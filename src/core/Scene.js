import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { COLORS } from '../config/colors';

export class Scene {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(COLORS.background);
        this.axesHelper = null;
        this.keyStates = {};  // Track pressed keys
        this.moveSpeed = 0.1; // Camera movement speed

        this.setupCamera();
        this.setupRenderer(container);
        this.setupControls();
        this.setupLights();
        this.setupAxes();
        this.loadHumanModel();
        this.setupKeyControls();

        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.0001,
            1000
        );
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer(container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(directionalLight);
    }

    setupAxes() {
        this.axesHelper = new THREE.AxesHelper(10);
        this.scene.add(this.axesHelper);
    }

    setupKeyControls() {
        // Track key states
        window.addEventListener('keydown', (event) => {
            this.keyStates[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keyStates[event.code] = false;
        });
    }

    updateCameraPosition() {
        // Get the camera's forward direction
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0; // Lock movement to horizontal plane
        forward.normalize();
        
        // Calculate the right vector
        const right = new THREE.Vector3();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

        // Move forward/backward
        if (this.keyStates['KeyW']) {
            this.camera.position.addScaledVector(forward, this.moveSpeed);
        }
        if (this.keyStates['KeyS']) {
            this.camera.position.addScaledVector(forward, -this.moveSpeed);
        }

        // Move left/right
        if (this.keyStates['KeyA']) {
            this.camera.position.addScaledVector(right, -this.moveSpeed);
        }
        if (this.keyStates['KeyD']) {
            this.camera.position.addScaledVector(right, this.moveSpeed);
        }

        // Update the orbit controls
        this.controls.update();
    }

    loadHumanModel() {
        const loader = new GLTFLoader();
        
        loader.load(
            '/models/simple_male_humanoid_body_-_by_ezren.glb',
            (gltf) => {
                try {
                    // Scale down the model
                    gltf.scene.scale.set(0.01, 0.01, 0.01);
                    
                    // Get the bounding box
                    const box = new THREE.Box3().setFromObject(gltf.scene);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    
                    // Position model so feet are at origin
                    gltf.scene.position.x = -center.x;
                    gltf.scene.position.y = -center.y + size.y/2;
                    gltf.scene.position.z = -center.z;
                    
                    // Rotate 45 degrees counterclockwise around Y axis
                    gltf.scene.rotation.y = Math.PI / 4;  // 45 degrees in radians
                    
                    // Move model forward along rotated vector
                    const moveDistance = size.y / 2;  // Half the height of the model
                    gltf.scene.position.x += moveDistance * Math.cos(Math.PI / 4);  // Changed minus to plus
                    gltf.scene.position.z += moveDistance * Math.sin(Math.PI / 4);  // Changed minus to plus
                    
                    this.humanModel = gltf.scene;
                    this.scene.add(this.humanModel);
                    
                    console.log('Model loaded successfully');
                    console.log('Model info:', {
                        geometries: gltf.scene.children.length,
                        position: gltf.scene.position,
                        rotation: gltf.scene.rotation,
                        scale: gltf.scene.scale,
                        size: size
                    });
                } catch (error) {
                    console.error('Error processing model:', error);
                }
            },
            (progress) => {
                console.log('Loading model...', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
                // Try to load a simple cube as fallback
                const geometry = new THREE.BoxGeometry(1, 2, 1);
                const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
                this.humanModel = new THREE.Mesh(geometry, material);
                this.scene.add(this.humanModel);
            }
        );
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    clearMeasurements() {
        // Modified to preserve the human model, lights, and axes
        this.scene.children = this.scene.children.filter(child => 
            child.isLight || 
            child === this.axesHelper ||  // Compare with our specific axesHelper instance
            child === this.humanModel
        );
    }

    render() {
        if (this.renderer && this.scene && this.camera) {
            this.updateCameraPosition();  // Update camera position based on keys
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        }
    }
} 