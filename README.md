# HOLOBIO 3D - Biomechanical Human Anatomy Hologram Suite

> **Built upon the Google Stitch Biomechanical Spine Diagnostics design system**, expanded into a comprehensive 3D holographic medical suite covering the entire human body: skeletal system, muscular groups, vital visceral organs, and neural networks.

---

## ✨ Features & Architecture

### 1. 3D Holographic Rendering Engine (`Three.js`)
- **Realistic Anatomical Procedural Geometry**:
  - **Skeletal Hierarchy**: Cranium & facial skull, mandible with TMJ articulation, cervical column (C1-C7), thoracic cage (12 rib pairs + sternum), lumbar spine (L1-L5), pelvis with sacroiliac ring, upper limbs (clavicle, scapula, humerus, radius, ulna), and lower limbs (femur, patella, tibia, fibula, foot).
  - **Muscular System**: Craniofacial muscles, sternocleidomastoid, trapezius, deltoids, pectoralis major, biceps & triceps brachii, rectus abdominis ("6-pack"), external obliques, latissimus dorsi, gluteus maximus, quadriceps femoris, hamstrings, and gastrocnemius with Achilles tendon cords.
  - **Vital Visceral Organs**: 4-chambered heart with aorta/vena cava (with real-time systolic/diastolic pulsation), lungs with bronchial tree (with respiratory breathing expansion), brain with cerebral hemispheres and cerebellum, liver, and renal filtration units.
  - **Nervous System**: Central spinal cord with 20 branching bilateral spinal roots, brachial plexus, and sciatic nerve trunks.
  - **Outer Hologram Skin Shell**: Translucent cybernetic wireframe silhouette.

### 2. Multi-Theme Holographic Switcher
Matches the Google Stitch design specification plus custom visual presets:
1. **Cyber Hologram (Surgical Cyan)**: The default Stitch medical dark theme (`#051424` obsidian base, `#00F0FF` electric cyan lasers, cold cerulean rim).
2. **Spectral Occult (Gothic Soul Violet)**: The Stitch Dark Fantasy occult theme (`#12091f` void, `#a855f7` spectral purple, `#ec4899` soul crimson).
3. **Clinical Photoreal (Anatomical)**: True anatomical bone ivory, deep crimson muscle bellies, and organ tones.
4. **X-Ray Fluoroscopy (High-Contrast)**: Cold radiographic silver-white fluoroscopy look.
5. **Matrix Bio-Emerald (Cybernetic)**: Bio-cybernetic green holographic data stream.
6. **Biomechanical Strain (Heatmap)**: Kinetic strain gradient illustrating physical stress and torque distribution.

### 3. Detailed Clinical & Biomechanical Dataset
- Over 25 intricately documented anatomical entities with:
  - Anatomical & Latin nomenclature
  - Physiological function and structural composition
  - Muscle origins, insertions, and innervations
  - Osseous articulations and joint mechanics
  - Biomechanical telemetry (compressive/tensile tolerance in MPa, peak torque in Nm, ROM in degrees, intradiscal barometrics)
  - Common trauma, clinical conditions, and pathologies
  - Fascinating medical trivia for deep user engagement

### 4. Interactive HUD Cockpit
- **Layer Peel / Explode Slider**: Spreads body layers outward from the central axis for full internal inspection.
- **Perspective Camera Controls**: Instant Coronal (Front), Sagittal (Lateral), Axial (Top), Dorsal (Spine Focus), and Reset views.
- **3D Raycast Selection**: Click any bone, muscle, or organ in 3D space to lock target reticle and populate the diagnostic dossier.
- **Vertebral Column Scroller**: Directly inherited and enhanced from Stitch's C1–C7, T1–T12, L1–L5, and S1–Coccyx selector.
- **Web Audio Sound Synthesizer**: Zero-dependency procedural medical chimes, laser locks, scan blips, heartbeat acoustics, and layer whooshes.

### 5. AI Biomechanical Model Simulator
- Built-in simulation tool allowing users to test pre-trained scenarios:
  - *Heavy Barbell Squat (1,200 N Axial Compression)*
  - *L5-S1 Herniation & Sciatic Impingement*
  - *High-Intensity Sprint Cardiovascular Surge*
  - *Motor Vehicle Sudden Deceleration Whiplash (C1-C7)*
  - *Biceps Peak Hypertrophy Contraction (350 N)*
- Custom prompt input allowing users to simulate custom physical loads on target muscles and bones.

---

## 🚀 Running Locally

The local server is already running! You can open your browser at:
```
http://localhost:3000/
```

To run manually at any time:
```bash
npm run dev
# or
node server.js
```
