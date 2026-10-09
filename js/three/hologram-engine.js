/**
 * HOLOBIO 3D - Three.js Holographic Engine
 * Manages lighting, materials, multi-theme presets, layer toggles,
 * kinematic animations, raycast selection, and camera controls.
 */

class HoloEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentTheme = "cyber";
    this.isAutoRotating = true;
    this.explodeFactor = 0;
    this.hoveredPart = null;
    this.selectedPart = null;
    this.callbacks = {
      onSelect: null,
      onHover: null
    };

    this.layerVisibility = {
      skeletal: true,
      muscular: true,
      organs: true,
      nervous: true,
      shell: true
    };

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene & Depth Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x051424, 0.022);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    this.camera.position.set(0, 1.5, 23);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.maxDistance = 45;
      this.controls.minDistance = 4;
      this.controls.target.set(0, 0, 0);
    }

    // 5. Build Material Library
    this.initMaterials();

    // 6. Lighting Setup
    this.initLights();

    // 7. Hologram Projection Pedestal & Environment
    this.initPedestal();

    // 8. Build 3D Anatomical Geometry
    this.builder = new AnatomicalModelBuilder(this.materials);
    this.bodyRoot = new THREE.Group();
    this.bodyRoot.name = "bodyRoot";
    this.scene.add(this.bodyRoot);

    this.systemGroups = {
      skeletal: this.builder.buildSkeletalSystem(),
      muscular: this.builder.buildMuscularSystem(),
      organs: this.builder.buildOrganSystem(),
      nervous: this.builder.buildNervousSystem(),
      shell: this.builder.buildHologramShell()
    };

    Object.values(this.systemGroups).forEach(grp => this.bodyRoot.add(grp));

    // 9. Floating 3D Reticle Leader Indicator
    this.initReticle();

    // 10. Raycaster & Events
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.initEvents();

    // 11. Start Render Loop
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  // ==========================================
  // MATERIALS & THEMES
  // ==========================================
  initMaterials() {
    this.materials = {
      bone: new THREE.MeshPhongMaterial({
        color: 0xdbfcff,
        emissive: 0x052a3b,
        specular: 0x00f0ff,
        shininess: 60,
        transparent: true,
        opacity: 0.92,
        wireframe: false
      }),
      boneCavity: new THREE.MeshBasicMaterial({ color: 0x020b14 }),
      disc: new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        transparent: true,
        opacity: 0.82,
        shininess: 80
      }),
      muscle: new THREE.MeshPhongMaterial({
        color: 0x0ea5e9,
        emissive: 0x082f49,
        specular: 0x38bdf8,
        shininess: 50,
        transparent: true,
        opacity: 0.78
      }),
      tendon: new THREE.MeshPhongMaterial({
        color: 0xbae6fd,
        emissive: 0x0c4a6e,
        transparent: true,
        opacity: 0.88
      }),
      heart: new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        emissive: 0x0369a1,
        specular: 0x38bdf8,
        shininess: 90,
        transparent: true,
        opacity: 0.9
      }),
      lungs: new THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        emissive: 0x075985,
        transparent: true,
        opacity: 0.65
      }),
      brain: new THREE.MeshPhongMaterial({
        color: 0x7dd3fc,
        emissive: 0x0369a1,
        specular: 0x00f0ff,
        shininess: 70,
        transparent: true,
        opacity: 0.88
      }),
      liver: new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        emissive: 0x083344,
        transparent: true,
        opacity: 0.75
      }),
      kidney: new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        emissive: 0x075985,
        transparent: true,
        opacity: 0.8
      }),
      cartilage: new THREE.MeshPhongMaterial({
        color: 0xa5f3fc,
        emissive: 0x164e63,
        transparent: true,
        opacity: 0.7
      }),
      vessel: new THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        shininess: 90
      }),
      vein: new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1
      }),
      nerve: new THREE.MeshPhongMaterial({
        color: 0x7df4ff,
        emissive: 0x00f0ff,
        specular: 0xffffff,
        shininess: 100
      }),
      hologramShell: new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.09
      })
    };
  }

  setTheme(themeKey) {
    this.currentTheme = themeKey;
    const body = document.body;

    if (themeKey === "cyber") {
      // Stitch Cyan / Medical Blue
      this.scene.fog.color.setHex(0x051424);
      this.ambientLight.color.setHex(0x0c4a6e);
      this.keyLight.color.setHex(0x00f0ff);
      this.rimLight.color.setHex(0x38bdf8);
      
      this.materials.bone.color.setHex(0xdbfcff);
      this.materials.bone.emissive.setHex(0x052a3b);
      this.materials.muscle.color.setHex(0x0ea5e9);
      this.materials.muscle.emissive.setHex(0x082f49);
      this.materials.heart.color.setHex(0x00f0ff);
      this.materials.nerve.color.setHex(0x7df4ff);
      this.materials.hologramShell.color.setHex(0x00f0ff);
      this.pedestalMat.color.setHex(0x00f0ff);
    } else if (themeKey === "spectral") {
      // Gothic Soul / Nether Violet (from three.js_2!)
      this.scene.fog.color.setHex(0x130a1e);
      this.ambientLight.color.setHex(0x2e1065);
      this.keyLight.color.setHex(0xa855f7);
      this.rimLight.color.setHex(0xec4899);

      this.materials.bone.color.setHex(0xded1c1);
      this.materials.bone.emissive.setHex(0x2e1065);
      this.materials.muscle.color.setHex(0x9333ea);
      this.materials.muscle.emissive.setHex(0x4c1d95);
      this.materials.heart.color.setHex(0xf43f5e);
      this.materials.nerve.color.setHex(0x22d3ee);
      this.materials.hologramShell.color.setHex(0xc084fc);
      this.pedestalMat.color.setHex(0xa855f7);
    } else if (themeKey === "photoreal") {
      // True Anatomic Ivory Bone, Crimson Muscle, Organic Viscera
      this.scene.fog.color.setHex(0x0b1120);
      this.ambientLight.color.setHex(0x334155);
      this.keyLight.color.setHex(0xffffff);
      this.rimLight.color.setHex(0x94a3b8);

      this.materials.bone.color.setHex(0xf1f5f9);
      this.materials.bone.emissive.setHex(0x1e293b);
      this.materials.muscle.color.setHex(0xbe123c);
      this.materials.muscle.emissive.setHex(0x4c0519);
      this.materials.heart.color.setHex(0x9f1239);
      this.materials.nerve.color.setHex(0xfacc15);
      this.materials.hologramShell.color.setHex(0x64748b);
      this.pedestalMat.color.setHex(0x38bdf8);
    } else if (themeKey === "xray") {
      // High-Contrast Fluoroscopy / Radiography
      this.scene.fog.color.setHex(0x020617);
      this.ambientLight.color.setHex(0x1e293b);
      this.keyLight.color.setHex(0xffffff);
      this.rimLight.color.setHex(0x64748b);

      this.materials.bone.color.setHex(0xffffff);
      this.materials.bone.emissive.setHex(0x334155);
      this.materials.muscle.color.setHex(0x475569);
      this.materials.muscle.emissive.setHex(0x0f172a);
      this.materials.heart.color.setHex(0x94a3b8);
      this.materials.nerve.color.setHex(0xffffff);
      this.materials.hologramShell.color.setHex(0x94a3b8);
      this.pedestalMat.color.setHex(0xffffff);
    } else if (themeKey === "matrix") {
      // Cybernetic Bio-Emerald
      this.scene.fog.color.setHex(0x021a10);
      this.ambientLight.color.setHex(0x064e3b);
      this.keyLight.color.setHex(0x10b981);
      this.rimLight.color.setHex(0x34d399);

      this.materials.bone.color.setHex(0xa7f3d0);
      this.materials.bone.emissive.setHex(0x064e3b);
      this.materials.muscle.color.setHex(0x059669);
      this.materials.muscle.emissive.setHex(0x022c22);
      this.materials.heart.color.setHex(0x34d399);
      this.materials.nerve.color.setHex(0x6ee7b7);
      this.materials.hologramShell.color.setHex(0x10b981);
      this.pedestalMat.color.setHex(0x10b981);
    } else if (themeKey === "thermal") {
      // Biomechanical Kinetic Strain Heatmap
      this.scene.fog.color.setHex(0x0d1117);
      this.ambientLight.color.setHex(0x1e1e24);
      this.keyLight.color.setHex(0xf59e0b);
      this.rimLight.color.setHex(0xef4444);

      this.materials.bone.color.setHex(0x3b82f6);
      this.materials.bone.emissive.setHex(0x1d4ed8);
      this.materials.muscle.color.setHex(0xf97316);
      this.materials.muscle.emissive.setHex(0x9a3412);
      this.materials.heart.color.setHex(0xef4444);
      this.materials.nerve.color.setHex(0xfacc15);
      this.materials.hologramShell.color.setHex(0xf59e0b);
      this.pedestalMat.color.setHex(0xf59e0b);
    }
  }

  // ==========================================
  // LIGHTING & ENVIRONMENT
  // ==========================================
  initLights() {
    this.ambientLight = new THREE.AmbientLight(0x0c4a6e, 1.2);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
    this.keyLight.position.set(6, 12, 10);
    this.scene.add(this.keyLight);

    this.rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    this.rimLight.position.set(-8, -6, -8);
    this.scene.add(this.rimLight);

    this.corePoint = new THREE.PointLight(0x00f0ff, 2.0, 30);
    this.corePoint.position.set(0, 2, 6);
    this.scene.add(this.corePoint);
  }

  initPedestal() {
    // Holographic radar floor disc
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -9.5, 0);

    this.pedestalMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    // Outer radar ring
    const ringGeo = new THREE.RingGeometry(2.5, 7.5, 48, 6);
    const ringMesh = new THREE.Mesh(ringGeo, this.pedestalMat);
    ringMesh.rotation.x = -Math.PI / 2;
    pedestalGroup.add(ringMesh);

    // Glowing coordinate tick crosshairs
    const gridHelper = new THREE.GridHelper(16, 24, 0x00f0ff, 0x0c4a6e);
    gridHelper.position.y = -0.05;
    pedestalGroup.add(gridHelper);

    this.pedestalGroup = pedestalGroup;
    this.scene.add(pedestalGroup);

    // Upward floating bio-particle cloud
    const partCount = 120;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount; i++) {
      partPos[i * 3] = (Math.random() - 0.5) * 12;
      partPos[i * 3 + 1] = -9.0 + Math.random() * 18;
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    this.particles = new THREE.Points(partGeo, new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.14,
      transparent: true,
      opacity: 0.65
    }));
    this.scene.add(this.particles);
  }

  initReticle() {
    // Holographic 3D selection focus box
    const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const edges = new THREE.EdgesGeometry(boxGeo);
    this.reticle = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 2,
      transparent: true,
      opacity: 0
    }));
    this.scene.add(this.reticle);
  }

  // ==========================================
  // INTERACTION & EVENTS
  // ==========================================
  initEvents() {
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    const dom = this.renderer.domElement;

    dom.addEventListener('pointermove', (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    dom.addEventListener('click', () => {
      if (this.hoveredPart) {
        this.selectPart(this.hoveredPart.userData.itemId);
      }
    });

    // Dragging disables auto-rotate
    if (this.controls) {
      this.controls.addEventListener('start', () => {
        this.isUserInteracting = true;
      });
      this.controls.addEventListener('end', () => {
        this.isUserInteracting = false;
      });
    }
  }

  // ==========================================
  // LAYER & EXPLODED CONTROLS
  // ==========================================
  setLayerVisibility(system, isVisible) {
    this.layerVisibility[system] = isVisible;
    if (this.systemGroups[system]) {
      this.systemGroups[system].visible = isVisible;
    }
  }

  setExplode(factor) {
    this.explodeFactor = Math.max(0, Math.min(1, factor));
    // Displace muscles forward/backward, organs outward, and skeleton along axis
    const mult = this.explodeFactor * 2.8;

    if (this.systemGroups.muscular) {
      this.systemGroups.muscular.position.z = mult * 1.2;
    }
    if (this.systemGroups.organs) {
      this.systemGroups.organs.position.x = -mult * 1.4;
    }
    if (this.systemGroups.nervous) {
      this.systemGroups.nervous.position.z = -mult * 0.9;
    }
    if (this.systemGroups.skeletal) {
      this.systemGroups.skeletal.position.z = -mult * 0.4;
    }
    if (this.systemGroups.shell) {
      this.systemGroups.shell.scale.setScalar(1.0 + mult * 0.15);
    }
  }

  setWireframe(isWire) {
    Object.values(this.materials).forEach(m => {
      if (m && m.wireframe !== undefined && m !== this.materials.hologramShell) {
        m.wireframe = isWire;
      }
    });
  }

  // ==========================================
  // CAMERA PRESETS
  // ==========================================
  setCameraView(viewName) {
    if (!this.controls) return;
    const targetY = 0;
    
    if (viewName === "front") {
      this.flyCamera(new THREE.Vector3(0, 1.5, 23), new THREE.Vector3(0, targetY, 0));
    } else if (viewName === "sagittal" || viewName === "side") {
      this.flyCamera(new THREE.Vector3(23, 1.5, 0), new THREE.Vector3(0, targetY, 0));
    } else if (viewName === "top") {
      this.flyCamera(new THREE.Vector3(0, 24, 0.1), new THREE.Vector3(0, targetY, 0));
    } else if (viewName === "spine") {
      this.flyCamera(new THREE.Vector3(0, 2.5, -16), new THREE.Vector3(0, 2.5, 0));
    } else if (viewName === "reset") {
      this.flyCamera(new THREE.Vector3(0, 1.5, 23), new THREE.Vector3(0, 0, 0));
    }
  }

  flyCamera(targetPos, targetLookAt) {
    const startPos = this.camera.position.clone();
    const startLook = this.controls.target.clone();
    let progress = 0;

    const animFly = () => {
      progress += 0.05;
      this.camera.position.lerpVectors(startPos, targetPos, progress);
      this.controls.target.lerpVectors(startLook, targetLookAt, progress);
      this.controls.update();
      if (progress < 1) {
        requestAnimationFrame(animFly);
      }
    };
    animFly();
  }

  // ==========================================
  // ANATOMICAL PART SELECTION
  // ==========================================
  selectPart(itemId) {
    // Find target mesh in the scene
    let targetMesh = null;
    this.bodyRoot.traverse((child) => {
      if (child.userData && child.userData.itemId === itemId) {
        targetMesh = child;
      }
    });

    if (!targetMesh) return;

    this.selectedPart = targetMesh;

    // Position 3D holographic focus reticle around part
    const worldPos = new THREE.Vector3();
    targetMesh.getWorldPosition(worldPos);
    this.reticle.position.copy(worldPos);
    this.reticle.material.opacity = 0.9;
    this.reticle.scale.setScalar(1.6);

    // Audio SFX trigger
    if (window.HoloAudio) {
      window.HoloAudio.playLaserLock();
    }

    // Camera gently tracks closer
    const camOffset = new THREE.Vector3(worldPos.x, worldPos.y + 0.5, worldPos.z + 9.5);
    this.flyCamera(camOffset, worldPos);

    // Callback to HUD
    if (this.callbacks.onSelect) {
      this.callbacks.onSelect(itemId, targetMesh.userData);
    }
  }

  // ==========================================
  // ANIMATION LOOP
  // ==========================================
  animate() {
    requestAnimationFrame(this.animate);
    const time = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();

    // 1. Auto-rotation turntable
    if (this.isAutoRotating && !this.isUserInteracting) {
      this.bodyRoot.rotation.y += 0.005;
      if (this.pedestalGroup) {
        this.pedestalGroup.rotation.y -= 0.003;
      }
    }

    // 2. Heart Systolic/Diastolic Pulsation
    const heart = this.scene.getObjectByName("animated_heart");
    if (heart) {
      const beat = 1.0 + Math.pow(Math.sin(time * 5.0), 10) * 0.18;
      heart.scale.set(beat, beat, beat);
    }

    // 3. Lungs Respiratory Expansion
    const lungs = this.scene.getObjectByName("animated_lungs");
    if (lungs) {
      const breath = 1.0 + Math.sin(time * 1.8) * 0.08;
      lungs.scale.set(breath, breath, breath);
    }

    // 4. Floating particles drift
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.02;
        if (positions[i] > 10) positions[i] = -9.0;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // 5. Reticle gentle pulse
    if (this.reticle && this.reticle.material.opacity > 0) {
      const pulse = 1.4 + Math.sin(time * 6.0) * 0.15;
      this.reticle.scale.set(pulse, pulse, pulse);
    }

    // 6. Raycast Hover Check
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.bodyRoot.children, true);
    
    let foundPart = null;
    for (let i = 0; i < intersects.length; i++) {
      let obj = intersects[i].object;
      while (obj && obj !== this.bodyRoot) {
        if (obj.userData && obj.userData.isAnatomicalPart) {
          foundPart = obj;
          break;
        }
        obj = obj.parent;
      }
      if (foundPart) break;
    }

    if (foundPart !== this.hoveredPart) {
      this.hoveredPart = foundPart;
      this.container.style.cursor = foundPart ? "pointer" : "default";
      if (foundPart && window.HoloAudio) {
        window.HoloAudio.playScanBlip();
      }
      if (this.callbacks.onHover) {
        this.callbacks.onHover(foundPart ? foundPart.userData : null);
      }
    }

    if (this.controls) {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

if (typeof window !== 'undefined') {
  window.HoloEngine = HoloEngine;
}
