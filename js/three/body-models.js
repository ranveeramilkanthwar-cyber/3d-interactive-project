/**
 * HOLOBIO 3D - Anatomical 3D Mesh Generator
 * Procedurally constructs high-fidelity 3D geometry for bones, muscles, organs, and nerves.
 */

class AnatomicalModelBuilder {
  constructor(materials) {
    this.mats = materials;
  }

  // Helper to tag meshes for raycasting and inspection
  tagMesh(mesh, itemId, partName, systemType) {
    mesh.userData = {
      itemId: itemId,
      partName: partName,
      system: systemType,
      isAnatomicalPart: true,
      originalScale: mesh.scale.clone(),
      originalPosition: mesh.position.clone()
    };
    return mesh;
  }

  // ==========================================
  // SKELETAL SYSTEM GENERATION
  // ==========================================
  buildSkeletalSystem() {
    const group = new THREE.Group();
    group.name = "system_skeletal";

    // 1. Cranium (Neurocranium & Facial Bones)
    const craniumGroup = new THREE.Group();
    // Vault
    const calvariaGeo = new THREE.SphereGeometry(0.88, 24, 20);
    calvariaGeo.scale(1.0, 1.25, 1.15);
    const calvariaMesh = new THREE.Mesh(calvariaGeo, this.mats.bone);
    craniumGroup.add(calvariaMesh);

    // Facial skeleton & zygomatic arches
    const faceGeo = new THREE.BoxGeometry(0.95, 0.75, 0.65);
    const faceMesh = new THREE.Mesh(faceGeo, this.mats.bone);
    faceMesh.position.set(0, -0.45, 0.45);
    craniumGroup.add(faceMesh);

    // Eye orbits (recessed dark openings)
    [-0.32, 0.32].forEach(x => {
      const orbitGeo = new THREE.CylinderGeometry(0.2, 0.16, 0.3, 16);
      const orbitMesh = new THREE.Mesh(orbitGeo, this.mats.boneCavity);
      orbitMesh.rotation.x = Math.PI / 2;
      orbitMesh.position.set(x, -0.32, 0.72);
      craniumGroup.add(orbitMesh);
    });

    // Nasal bridge
    const nasalGeo = new THREE.ConeGeometry(0.12, 0.35, 4);
    const nasalMesh = new THREE.Mesh(nasalGeo, this.mats.bone);
    nasalMesh.rotation.x = 0.3;
    nasalMesh.position.set(0, -0.4, 0.8);
    craniumGroup.add(nasalMesh);

    craniumGroup.position.set(0, 7.8, 0);
    this.tagMesh(craniumGroup, "cranium", "Cranium & Facial Skeleton", "skeletal");
    group.add(craniumGroup);

    // 2. Mandible (Lower Jaw)
    const mandibleGroup = new THREE.Group();
    const jawCurve = new THREE.TorusGeometry(0.55, 0.12, 8, 16, Math.PI);
    const jawMesh = new THREE.Mesh(jawCurve, this.mats.bone);
    jawMesh.rotation.x = Math.PI / 2;
    jawMesh.rotation.z = Math.PI;
    mandibleGroup.add(jawMesh);

    // Bilateral rami
    [-0.52, 0.52].forEach(x => {
      const ramusGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.5, 10);
      const ramusMesh = new THREE.Mesh(ramusGeo, this.mats.bone);
      ramusMesh.position.set(x, 0.25, -0.2);
      mandibleGroup.add(ramusMesh);
    });
    mandibleGroup.position.set(0, 6.9, 0.25);
    this.tagMesh(mandibleGroup, "mandible", "Mandible (Jaw)", "skeletal");
    group.add(mandibleGroup);

    // 3. Cervical Spine (C1-C7)
    const cervicalGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const vY = 6.4 - (i * 0.28);
      const vScale = 0.5 + (i * 0.04);
      const cBody = new THREE.Mesh(new THREE.CylinderGeometry(0.42 * vScale, 0.45 * vScale, 0.16 * vScale, 14), this.mats.bone);
      const cSpinous = new THREE.Mesh(new THREE.ConeGeometry(0.12 * vScale, 0.5 * vScale, 6), this.mats.bone);
      cSpinous.rotation.x = -Math.PI / 2.2;
      cSpinous.position.set(0, -0.05 * vScale, -0.38 * vScale);
      
      const vSub = new THREE.Group();
      vSub.position.set(0, vY, -0.15 + (Math.sin(i * 0.4) * 0.08));
      vSub.add(cBody);
      vSub.add(cSpinous);

      // Intervertebral disc
      if (i < 6) {
        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.41 * vScale, 0.43 * vScale, 0.08 * vScale, 12), this.mats.disc);
        disc.position.set(0, -0.12 * vScale, 0);
        vSub.add(disc);
      }
      cervicalGroup.add(vSub);
    }
    this.tagMesh(cervicalGroup, "cervical_spine", "Cervical Spine (C1-C7)", "skeletal");
    group.add(cervicalGroup);

    // 4. Thoracic Cage & Sternum
    const ribcageGroup = new THREE.Group();
    // Sternum plate
    const sternumGeo = new THREE.BoxGeometry(0.38, 1.8, 0.12);
    const sternumMesh = new THREE.Mesh(sternumGeo, this.mats.bone);
    sternumMesh.position.set(0, 3.4, 1.35);
    ribcageGroup.add(sternumMesh);

    // 12 Rib Pairs
    for (let r = 0; r < 12; r++) {
      const ribY = 4.3 - (r * 0.24);
      const ribRadiusX = 1.1 + Math.sin(r * 0.3) * 0.45;
      const ribRadiusZ = 0.85 + Math.sin(r * 0.3) * 0.35;
      
      // Curved ring segment for rib pair
      const ringGeo = new THREE.TorusGeometry(ribRadiusX, 0.055, 6, 24, Math.PI * 1.8);
      const ringMesh = new THREE.Mesh(ringGeo, this.mats.bone);
      ringMesh.rotation.x = Math.PI / 2 + 0.15;
      ringMesh.rotation.z = -Math.PI * 0.9;
      ringMesh.scale.set(1.0, ribRadiusZ / ribRadiusX, 0.9);
      ringMesh.position.set(0, ribY, 0.15);
      ribcageGroup.add(ringMesh);

      // Thoracic vertebral body behind each rib
      const tBody = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.4, 0.18, 12), this.mats.bone);
      tBody.position.set(0, ribY, -ribRadiusZ + 0.15);
      ribcageGroup.add(tBody);
    }
    this.tagMesh(ribcageGroup, "thoracic_cage", "Thoracic Cage & Sternum", "skeletal");
    group.add(ribcageGroup);

    // 5. Lumbar Spine (L1-L5)
    const lumbarGroup = new THREE.Group();
    for (let l = 0; l < 5; l++) {
      const lY = 1.1 - (l * 0.42);
      const lScale = 0.8 + (l * 0.08);
      const lBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55 * lScale, 0.6 * lScale, 0.28 * lScale, 16), this.mats.bone);
      const lSpinous = new THREE.Mesh(new THREE.BoxGeometry(0.18 * lScale, 0.3 * lScale, 0.65 * lScale), this.mats.bone);
      lSpinous.position.set(0, 0, -0.55 * lScale);
      
      // Lateral transverse wings
      const lTrans = new THREE.Mesh(new THREE.BoxGeometry(1.6 * lScale, 0.14 * lScale, 0.22 * lScale), this.mats.bone);
      lTrans.position.set(0, 0, -0.2 * lScale);

      const lSub = new THREE.Group();
      lSub.position.set(0, lY, -0.3 + (Math.sin(l * 0.6) * 0.1));
      lSub.add(lBody);
      lSub.add(lSpinous);
      lSub.add(lTrans);

      // Lumbar discs
      const lDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.53 * lScale, 0.58 * lScale, 0.14 * lScale, 14), this.mats.disc);
      lDisc.position.set(0, -0.2 * lScale, 0);
      lSub.add(lDisc);

      lumbarGroup.add(lSub);
    }
    this.tagMesh(lumbarGroup, "lumbar_spine", "Lumbar Spine (L1-L5)", "skeletal");
    group.add(lumbarGroup);

    // 6. Pelvis (Ilium, Ischium, Sacrum)
    const pelvisGroup = new THREE.Group();
    // Sacrum
    const sacrumGeo = new THREE.ConeGeometry(0.85, 1.4, 5);
    const sacrumMesh = new THREE.Mesh(sacrumGeo, this.mats.bone);
    sacrumMesh.rotation.x = Math.PI + 0.3;
    sacrumMesh.position.set(0, -1.2, -0.3);
    pelvisGroup.add(sacrumMesh);

    // Bilateral iliac crests (curved flared wings)
    [-1, 1].forEach(side => {
      const iliumGeo = new THREE.TorusGeometry(0.9, 0.22, 8, 16, Math.PI * 0.85);
      const iliumMesh = new THREE.Mesh(iliumGeo, this.mats.bone);
      iliumMesh.rotation.y = side * 0.45;
      iliumMesh.rotation.x = 0.2;
      iliumMesh.position.set(side * 0.75, -0.9, 0.1);
      pelvisGroup.add(iliumMesh);

      // Pubic ramus
      const ramusGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.9, 8);
      const ramusMesh = new THREE.Mesh(ramusGeo, this.mats.bone);
      ramusMesh.position.set(side * 0.45, -1.6, 0.45);
      ramusMesh.rotation.z = side * 0.5;
      pelvisGroup.add(ramusMesh);
    });
    this.tagMesh(pelvisGroup, "pelvis", "Pelvic Girdle & Sacrum", "skeletal");
    group.add(pelvisGroup);

    // 7. Lower Limbs (Femurs, Patellae, Tibias, Fibulas, Feet)
    const femurGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      // Femoral head & neck
      const headGeo = new THREE.SphereGeometry(0.28, 12, 12);
      const headMesh = new THREE.Mesh(headGeo, this.mats.bone);
      headMesh.position.set(side * 0.85, -1.6, 0.05);
      femurGroup.add(headMesh);

      // Femoral shaft (angled slightly inward)
      const shaftGeo = new THREE.CylinderGeometry(0.22, 0.24, 3.2, 12);
      const shaftMesh = new THREE.Mesh(shaftGeo, this.mats.bone);
      shaftMesh.position.set(side * 1.15, -3.4, 0.05);
      shaftMesh.rotation.z = -side * 0.07;
      femurGroup.add(shaftMesh);

      // Distal condyles & patella
      const condyleGeo = new THREE.SphereGeometry(0.32, 10, 10);
      const condyleMesh = new THREE.Mesh(condyleGeo, this.mats.bone);
      condyleMesh.position.set(side * 1.18, -5.0, 0.05);
      femurGroup.add(condyleMesh);

      const patellaGeo = new THREE.SphereGeometry(0.16, 8, 8);
      patellaGeo.scale(1, 1.2, 0.5);
      const patellaMesh = new THREE.Mesh(patellaGeo, this.mats.bone);
      patellaMesh.position.set(side * 1.18, -4.95, 0.35);
      femurGroup.add(patellaMesh);

      // Tibia & Fibula (Lower Leg)
      const tibiaGeo = new THREE.CylinderGeometry(0.24, 0.18, 3.2, 12);
      const tibiaMesh = new THREE.Mesh(tibiaGeo, this.mats.bone);
      tibiaMesh.position.set(side * 1.18, -6.8, 0.05);
      femurGroup.add(tibiaMesh);

      const fibulaGeo = new THREE.CylinderGeometry(0.08, 0.07, 3.0, 8);
      const fibulaMesh = new THREE.Mesh(fibulaGeo, this.mats.bone);
      fibulaMesh.position.set(side * 1.45, -6.8, 0.0);
      femurGroup.add(fibulaMesh);

      // Foot (Calcaneus + Metatarsals)
      const footGeo = new THREE.BoxGeometry(0.4, 0.22, 1.05);
      const footMesh = new THREE.Mesh(footGeo, this.mats.bone);
      footMesh.position.set(side * 1.22, -8.5, 0.35);
      femurGroup.add(footMesh);
    });
    this.tagMesh(femurGroup, "femur", "Lower Extremity Osseous Chain", "skeletal");
    group.add(femurGroup);

    // 8. Upper Limbs (Clavicles, Scapulae, Humeri, Radii, Ulnae, Hands)
    const upperLimbsGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      // Clavicle (Collarbone)
      const clavicleGeo = new THREE.CylinderGeometry(0.09, 0.1, 1.5, 8);
      const clavicleMesh = new THREE.Mesh(clavicleGeo, this.mats.bone);
      clavicleMesh.position.set(side * 1.1, 4.6, 0.6);
      clavicleMesh.rotation.z = -side * 0.2;
      clavicleMesh.rotation.y = side * 0.3;
      upperLimbsGroup.add(clavicleMesh);

      // Scapula (Shoulder Blade)
      const scapulaGeo = new THREE.BoxGeometry(1.0, 1.2, 0.1);
      const scapulaMesh = new THREE.Mesh(scapulaGeo, this.mats.bone);
      scapulaMesh.position.set(side * 1.2, 3.8, -0.9);
      scapulaMesh.rotation.y = -side * 0.35;
      upperLimbsGroup.add(scapulaMesh);

      // Humerus
      const humerusGeo = new THREE.CylinderGeometry(0.18, 0.16, 2.5, 10);
      const humerusMesh = new THREE.Mesh(humerusGeo, this.mats.bone);
      humerusMesh.position.set(side * 2.3, 3.0, 0);
      humerusMesh.rotation.z = side * 0.15;
      upperLimbsGroup.add(humerusMesh);

      // Radius & Ulna (Forearm)
      const radiusGeo = new THREE.CylinderGeometry(0.12, 0.11, 2.3, 8);
      const radiusMesh = new THREE.Mesh(radiusGeo, this.mats.bone);
      radiusMesh.position.set(side * 2.7, 0.8, 0.1);
      upperLimbsGroup.add(radiusMesh);

      const ulnaGeo = new THREE.CylinderGeometry(0.11, 0.09, 2.4, 8);
      const ulnaMesh = new THREE.Mesh(ulnaGeo, this.mats.bone);
      ulnaMesh.position.set(side * 2.85, 0.75, -0.05);
      upperLimbsGroup.add(ulnaMesh);

      // Hand / Metacarpals
      const handGeo = new THREE.BoxGeometry(0.3, 0.75, 0.15);
      const handMesh = new THREE.Mesh(handGeo, this.mats.bone);
      handMesh.position.set(side * 2.8, -0.7, 0.05);
      upperLimbsGroup.add(handMesh);
    });
    this.tagMesh(upperLimbsGroup, "humerus", "Upper Extremity Osseous Chain", "skeletal");
    group.add(upperLimbsGroup);

    return group;
  }

  // ==========================================
  // MUSCULAR SYSTEM GENERATION
  // ==========================================
  buildMuscularSystem() {
    const group = new THREE.Group();
    group.name = "system_muscular";

    // 1. Pectoralis Major (Chest Plates)
    const pecGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      const pecGeo = new THREE.SphereGeometry(0.85, 14, 12);
      pecGeo.scale(1.2, 0.65, 0.35);
      const pecMesh = new THREE.Mesh(pecGeo, this.mats.muscle);
      pecMesh.position.set(side * 0.88, 3.65, 0.95);
      pecMesh.rotation.z = side * 0.2;
      pecMesh.rotation.y = side * 0.15;
      pecGroup.add(pecMesh);
    });
    this.tagMesh(pecGroup, "pectoralis_major", "Pectoralis Major (Chest)", "muscular");
    group.add(pecGroup);

    // 2. Deltoids (Shoulders)
    const deltoidGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      const deltGeo = new THREE.SphereGeometry(0.65, 12, 12);
      deltGeo.scale(0.8, 1.25, 0.9);
      const deltMesh = new THREE.Mesh(deltGeo, this.mats.muscle);
      deltMesh.position.set(side * 2.2, 4.3, 0.05);
      deltMesh.rotation.z = -side * 0.25;
      deltoidGroup.add(deltMesh);
    });
    this.tagMesh(deltoidGroup, "deltoid", "Deltoid Muscles (Shoulders)", "muscular");
    group.add(deltoidGroup);

    // 3. Biceps Brachii & Triceps (Arms)
    const armMusclesGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      // Biceps (Anterior)
      const bicepGeo = new THREE.CylinderGeometry(0.24, 0.18, 1.8, 12);
      const bicepMesh = new THREE.Mesh(bicepGeo, this.mats.muscle);
      bicepMesh.position.set(side * 2.35, 2.9, 0.28);
      bicepMesh.rotation.z = side * 0.12;
      armMusclesGroup.add(bicepMesh);

      // Triceps (Posterior)
      const tricepGeo = new THREE.CylinderGeometry(0.28, 0.22, 1.9, 12);
      const tricepMesh = new THREE.Mesh(tricepGeo, this.mats.muscle);
      tricepMesh.position.set(side * 2.38, 2.95, -0.28);
      tricepMesh.rotation.z = side * 0.12;
      armMusclesGroup.add(tricepMesh);

      // Forearm flexor/extensor muscle mass
      const forearmGeo = new THREE.CylinderGeometry(0.28, 0.14, 2.1, 10);
      const forearmMesh = new THREE.Mesh(forearmGeo, this.mats.muscle);
      forearmMesh.position.set(side * 2.75, 0.9, 0.05);
      armMusclesGroup.add(forearmMesh);
    });
    this.tagMesh(armMusclesGroup, "biceps_brachii", "Biceps & Brachial Musculature", "muscular");
    group.add(armMusclesGroup);

    // 4. Rectus Abdominis ("6-Pack" & Obliques)
    const absGroup = new THREE.Group();
    // 6-pack segments
    for (let row = 0; row < 4; row++) {
      [-1, 1].forEach(side => {
        const segGeo = new THREE.BoxGeometry(0.38, 0.42, 0.2);
        const segMesh = new THREE.Mesh(segGeo, this.mats.muscle);
        segMesh.position.set(side * 0.24, 2.4 - (row * 0.5), 0.88);
        absGroup.add(segMesh);
      });
    }
    // External Obliques (Lateral flanks)
    [-1, 1].forEach(side => {
      const oblGeo = new THREE.BoxGeometry(0.45, 1.9, 0.6);
      const oblMesh = new THREE.Mesh(oblGeo, this.mats.muscle);
      oblMesh.position.set(side * 0.85, 1.6, 0.4);
      oblMesh.rotation.y = side * 0.4;
      absGroup.add(oblMesh);
    });
    this.tagMesh(absGroup, "rectus_abdominis", "Rectus Abdominis & Core Musculature", "muscular");
    group.add(absGroup);

    // 5. Latissimus Dorsi & Trapezius (Back Musculature)
    const backMusclesGroup = new THREE.Group();
    // Trapezius (Diamond upper back cape)
    const trapGeo = new THREE.ConeGeometry(1.6, 2.2, 4);
    const trapMesh = new THREE.Mesh(trapGeo, this.mats.muscle);
    trapMesh.rotation.x = -Math.PI / 2 + 0.3;
    trapMesh.scale.set(1.0, 0.25, 1.0);
    trapMesh.position.set(0, 4.2, -0.65);
    backMusclesGroup.add(trapMesh);

    // Latissimus Dorsi (Flaring wing sheets)
    [-1, 1].forEach(side => {
      const latGeo = new THREE.BoxGeometry(0.9, 2.2, 0.25);
      const latMesh = new THREE.Mesh(latGeo, this.mats.muscle);
      latMesh.position.set(side * 1.15, 2.2, -0.65);
      latMesh.rotation.y = -side * 0.45;
      latMesh.rotation.z = side * 0.2;
      backMusclesGroup.add(latMesh);
    });
    this.tagMesh(backMusclesGroup, "latissimus_dorsi", "Latissimus Dorsi & Posterior Kinetic Chain", "muscular");
    group.add(backMusclesGroup);

    // 6. Gluteus Maximus (Gluteals)
    const gluteGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      const glutGeo = new THREE.SphereGeometry(0.72, 14, 14);
      glutGeo.scale(1.0, 1.25, 0.95);
      const glutMesh = new THREE.Mesh(glutGeo, this.mats.muscle);
      glutMesh.position.set(side * 0.65, -1.25, -0.65);
      glutMesh.rotation.z = -side * 0.2;
      gluteGroup.add(glutMesh);
    });
    this.tagMesh(gluteGroup, "gluteus_maximus", "Gluteus Maximus (Power Extensors)", "muscular");
    group.add(gluteGroup);

    // 7. Quadriceps Femoris & Hamstrings (Thighs)
    const quadGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      // Quadriceps bellies (Vastus lateralis, medialis, rectus femoris)
      const quadGeo = new THREE.CylinderGeometry(0.48, 0.36, 3.1, 14);
      const quadMesh = new THREE.Mesh(quadGeo, this.mats.muscle);
      quadMesh.position.set(side * 1.16, -3.4, 0.25);
      quadMesh.rotation.z = -side * 0.06;
      quadGroup.add(quadMesh);

      // Hamstrings (Posterior thigh)
      const hamGeo = new THREE.CylinderGeometry(0.42, 0.32, 3.0, 12);
      const hamMesh = new THREE.Mesh(hamGeo, this.mats.muscle);
      hamMesh.position.set(side * 1.16, -3.3, -0.35);
      hamMesh.rotation.z = -side * 0.06;
      quadGroup.add(hamMesh);
    });
    this.tagMesh(quadGroup, "quadriceps", "Quadriceps Femoris & Hamstrings", "muscular");
    group.add(quadGroup);

    // 8. Gastrocnemius & Soleus (Calves)
    const calfGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      // Gastrocnemius dual bulge
      [-0.14, 0.14].forEach(subSide => {
        const headGeo = new THREE.SphereGeometry(0.32, 10, 10);
        headGeo.scale(0.8, 1.6, 0.9);
        const headMesh = new THREE.Mesh(headGeo, this.mats.muscle);
        headMesh.position.set(side * 1.2 + subSide, -6.4, -0.32);
        calfGroup.add(headMesh);
      });

      // Achilles tendon cord
      const achillesGeo = new THREE.CylinderGeometry(0.08, 0.09, 1.6, 8);
      const achillesMesh = new THREE.Mesh(achillesGeo, this.mats.tendon);
      achillesMesh.position.set(side * 1.2, -7.7, -0.22);
      calfGroup.add(achillesMesh);
    });
    this.tagMesh(calfGroup, "gastrocnemius", "Gastrocnemius & Achilles Complex", "muscular");
    group.add(calfGroup);

    return group;
  }

  // ==========================================
  // VITAL VISCERAL ORGANS GENERATION
  // ==========================================
  buildOrganSystem() {
    const group = new THREE.Group();
    group.name = "system_organs";

    // 1. Brain (Cerebrum & Cerebellum)
    const brainGroup = new THREE.Group();
    // Left & Right cerebral hemispheres
    [-0.22, 0.22].forEach(side => {
      const hemGeo = new THREE.SphereGeometry(0.55, 16, 16);
      hemGeo.scale(0.85, 1.15, 1.25);
      const hemMesh = new THREE.Mesh(hemGeo, this.mats.brain);
      hemMesh.position.set(side, 0, 0);
      brainGroup.add(hemMesh);
    });
    // Cerebellum
    const cereGeo = new THREE.SphereGeometry(0.38, 12, 12);
    cereGeo.scale(1.2, 0.7, 0.9);
    const cereMesh = new THREE.Mesh(cereGeo, this.mats.brain);
    cereMesh.position.set(0, -0.45, -0.45);
    brainGroup.add(cereMesh);

    // Brainstem
    const stemGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.65, 8);
    const stemMesh = new THREE.Mesh(stemGeo, this.mats.brain);
    stemMesh.position.set(0, -0.65, -0.15);
    brainGroup.add(stemMesh);

    brainGroup.position.set(0, 7.85, 0);
    this.tagMesh(brainGroup, "brain", "Brain (Cerebrum & Cerebellum)", "organs");
    group.add(brainGroup);

    // 2. Heart (Myocardium with Aorta Arch)
    const heartGroup = new THREE.Group();
    const heartBodyGeo = new THREE.SphereGeometry(0.48, 16, 16);
    heartBodyGeo.scale(1.0, 1.25, 0.9);
    const heartMesh = new THREE.Mesh(heartBodyGeo, this.mats.heart);
    heartMesh.rotation.z = -0.3;
    heartMesh.rotation.x = 0.2;
    heartGroup.add(heartMesh);

    // Ascending Aorta & Arch
    const aortaCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0, 0.85, 0.1),
      new THREE.Vector3(0.3, 0.95, -0.2),
      new THREE.Vector3(0.2, 0.2, -0.35)
    );
    const aortaGeo = new THREE.TubeGeometry(aortaCurve, 20, 0.12, 10, false);
    const aortaMesh = new THREE.Mesh(aortaGeo, this.mats.vessel);
    heartGroup.add(aortaMesh);

    // Vena Cava
    const vcGeo = new THREE.CylinderGeometry(0.11, 0.11, 1.1, 8);
    const vcMesh = new THREE.Mesh(vcGeo, this.mats.vein);
    vcMesh.position.set(-0.35, 0.2, -0.1);
    heartGroup.add(vcMesh);

    heartGroup.position.set(0.25, 3.6, 0.35);
    heartGroup.name = "animated_heart";
    this.tagMesh(heartGroup, "heart", "Heart (Cor & Great Vessels)", "organs");
    group.add(heartGroup);

    // 3. Lungs & Bronchial Tree
    const lungsGroup = new THREE.Group();
    // Right lung (3 lobes, larger)
    const rightLungGeo = new THREE.SphereGeometry(0.68, 14, 14);
    rightLungGeo.scale(0.9, 1.85, 1.05);
    const rightLung = new THREE.Mesh(rightLungGeo, this.mats.lungs);
    rightLung.position.set(-0.75, 3.5, 0.15);
    lungsGroup.add(rightLung);

    // Left lung (2 lobes with cardiac notch)
    const leftLungGeo = new THREE.SphereGeometry(0.64, 14, 14);
    leftLungGeo.scale(0.85, 1.8, 1.0);
    const leftLung = new THREE.Mesh(leftLungGeo, this.mats.lungs);
    leftLung.position.set(0.82, 3.5, 0.15);
    lungsGroup.add(leftLung);

    // Trachea
    const tracheaGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.4, 10);
    const trachea = new THREE.Mesh(tracheaGeo, this.mats.cartilage);
    trachea.position.set(0, 4.8, 0.2);
    lungsGroup.add(trachea);

    lungsGroup.name = "animated_lungs";
    this.tagMesh(lungsGroup, "lungs", "Lungs & Tracheobronchial Tree", "organs");
    group.add(lungsGroup);

    // 4. Liver (Right & Left Lobes)
    const liverGroup = new THREE.Group();
    const liverGeo = new THREE.ConeGeometry(0.95, 1.6, 6);
    liverGeo.scale(1.2, 0.75, 0.85);
    const liverMesh = new THREE.Mesh(liverGeo, this.mats.liver);
    liverMesh.rotation.z = Math.PI / 2.3;
    liverMesh.rotation.x = -0.3;
    liverMesh.position.set(-0.45, 2.1, 0.35);
    liverGroup.add(liverMesh);
    this.tagMesh(liverGroup, "liver", "Liver (Hepar)", "organs");
    group.add(liverGroup);

    // 5. Kidneys & Renal System
    const kidneysGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      const kidneyGeo = new THREE.SphereGeometry(0.32, 12, 12);
      kidneyGeo.scale(0.7, 1.25, 0.8);
      const kidneyMesh = new THREE.Mesh(kidneyGeo, this.mats.kidney);
      kidneyMesh.position.set(side * 0.72, 1.5, -0.45);
      kidneyMesh.rotation.z = side * 0.2;
      kidneysGroup.add(kidneyMesh);

      // Ureter
      const ureterGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6);
      const ureter = new THREE.Mesh(ureterGeo, this.mats.vessel);
      ureter.position.set(side * 0.6, 0.6, -0.35);
      ureter.rotation.z = -side * 0.15;
      kidneysGroup.add(ureter);
    });
    this.tagMesh(kidneysGroup, "kidneys", "Kidneys & Renal System", "organs");
    group.add(kidneysGroup);

    return group;
  }

  // ==========================================
  // NERVOUS SYSTEM GENERATION
  // ==========================================
  buildNervousSystem() {
    const group = new THREE.Group();
    group.name = "system_nervous";

    // 1. Central Spinal Cord
    const cordPoints = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const y = 6.4 - (t * 7.5);
      const z = (Math.sin(t * Math.PI * 2.2) * 0.6 - 0.2) - 0.15;
      cordPoints.push(new THREE.Vector3(0, y, z));
    }
    const cordCurve = new THREE.CatmullRomCurve3(cordPoints);
    const cordGeo = new THREE.TubeGeometry(cordCurve, 50, 0.08, 8, false);
    const cordMesh = new THREE.Mesh(cordGeo, this.mats.nerve);
    
    const cordGroup = new THREE.Group();
    cordGroup.add(cordMesh);

    // Spinal nerve roots branching out bilaterally
    for (let r = 0; r < 20; r++) {
      const t = r / 20;
      const pt = cordCurve.getPoint(t);
      [-1, 1].forEach(side => {
        const rootCurve = new THREE.CubicBezierCurve3(
          pt,
          new THREE.Vector3(side * 0.35, pt.y - 0.05, pt.z + 0.1),
          new THREE.Vector3(side * 0.75, pt.y - 0.15, pt.z + 0.2),
          new THREE.Vector3(side * 1.1, pt.y - 0.25, pt.z)
        );
        const rootGeo = new THREE.TubeGeometry(rootCurve, 10, 0.025, 4, false);
        const rootMesh = new THREE.Mesh(rootGeo, this.mats.nerve);
        cordGroup.add(rootMesh);
      });
    }
    this.tagMesh(cordGroup, "spinal_cord", "Spinal Cord & Neural Axis", "nervous");
    group.add(cordGroup);

    // 2. Sciatic Nerves (Lower Limbs)
    const sciaticGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      const sciaticCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(side * 0.45, -1.2, -0.4),
        new THREE.Vector3(side * 0.75, -2.8, -0.55),
        new THREE.Vector3(side * 1.15, -4.8, -0.3),
        new THREE.Vector3(side * 1.18, -8.2, -0.2)
      );
      const sciaticGeo = new THREE.TubeGeometry(sciaticCurve, 32, 0.065, 6, false);
      const sciaticMesh = new THREE.Mesh(sciaticGeo, this.mats.nerve);
      sciaticGroup.add(sciaticMesh);
    });
    this.tagMesh(sciaticGroup, "sciatic_nerve", "Sciatic Nerves (Sacral Plexus)", "nervous");
    group.add(sciaticGroup);

    // 3. Brachial Plexus (Upper Limbs)
    const brachialGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      const brachialCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(side * 0.2, 5.2, 0),
        new THREE.Vector3(side * 1.2, 4.4, 0.2),
        new THREE.Vector3(side * 2.1, 3.2, 0.05),
        new THREE.Vector3(side * 2.7, 0.8, 0.1)
      );
      const brachialGeo = new THREE.TubeGeometry(brachialCurve, 24, 0.05, 6, false);
      const brachialMesh = new THREE.Mesh(brachialGeo, this.mats.nerve);
      brachialGroup.add(brachialMesh);
    });
    this.tagMesh(brachialGroup, "brachial_plexus", "Brachial Plexus (Arm Innervation)", "nervous");
    group.add(brachialGroup);

    return group;
  }

  // ==========================================
  // HOLOGRAPHIC ENVELOPE / SILHOUETTE
  // ==========================================
  buildHologramShell() {
    const group = new THREE.Group();
    group.name = "system_shell";

    // Torso silhouette
    const torsoGeo = new THREE.CylinderGeometry(1.65, 1.25, 6.2, 20);
    torsoGeo.scale(1.0, 1.0, 0.75);
    const torsoMesh = new THREE.Mesh(torsoGeo, this.mats.hologramShell);
    torsoMesh.position.set(0, 2.5, 0);
    group.add(torsoMesh);

    // Head envelope
    const headGeo = new THREE.SphereGeometry(1.05, 20, 20);
    headGeo.scale(0.9, 1.2, 1.05);
    const headMesh = new THREE.Mesh(headGeo, this.mats.hologramShell);
    headMesh.position.set(0, 7.8, 0);
    group.add(headMesh);

    // Limbs silhouettes
    [-1, 1].forEach(side => {
      // Arm
      const armGeo = new THREE.CylinderGeometry(0.42, 0.28, 5.2, 14);
      const armMesh = new THREE.Mesh(armGeo, this.mats.hologramShell);
      armMesh.position.set(side * 2.45, 2.0, 0.05);
      armMesh.rotation.z = side * 0.1;
      group.add(armMesh);

      // Leg
      const legGeo = new THREE.CylinderGeometry(0.68, 0.35, 7.6, 16);
      const legMesh = new THREE.Mesh(legGeo, this.mats.hologramShell);
      legMesh.position.set(side * 1.2, -4.8, 0.05);
      legMesh.rotation.z = -side * 0.04;
      group.add(legMesh);
    });

    return group;
  }
}

if (typeof window !== 'undefined') {
  window.AnatomicalModelBuilder = AnatomicalModelBuilder;
}
