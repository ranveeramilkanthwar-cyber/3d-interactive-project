/**
 * HOLOBIO 3D - Comprehensive Anatomical & Biomechanical Dataset
 * Contains high-fidelity clinical and biomechanical metadata for all major body parts,
 * muscles, bones, organs, and neural structures.
 */

const ANATOMY_DATASET = {
  // Systems Metadata
  systems: {
    skeletal: {
      name: "Skeletal System",
      count: 206,
      color: "#e2e8f0",
      holoColor: "#38bdf8",
      description: "Structural osseous framework providing mechanical rigidity, marrow hematopoiesis, calcium homeostasis, and visceral organ protection."
    },
    muscular: {
      name: "Muscular System",
      count: 650,
      color: "#f87171",
      holoColor: "#ff3366",
      description: "Contractile myocyte networks generating dynamic kinetic torque, postural stabilization, visceral motility, and thermogenesis."
    },
    organs: {
      name: "Vital Visceral Organs",
      count: 78,
      color: "#ec4899",
      holoColor: "#a855f7",
      description: "Vital metabolizing, oxygenating, circulatory, and filtration organs maintaining metabolic homeostasis and physiological survival."
    },
    nervous: {
      name: "Nervous System",
      count: 86,
      color: "#fbbf24",
      holoColor: "#00f0ff",
      description: "High-velocity electro-chemical bio-signaling network orchestrating sensory afferents, motor efferents, and cognitive autonomic reflex arcs."
    }
  },

  // Detailed Anatomical Entities
  items: [
    // ==========================================
    // SKELETAL SYSTEM
    // ==========================================
    {
      id: "cranium",
      name: "Cranium (Skull & Neurocranium)",
      latinName: "Cranium Humanum",
      system: "skeletal",
      region: "cranial",
      icon: "psychology",
      summary: "Protective osseous vault housing the brain, sensory organs, and masticatory foundation.",
      description: "The human cranium comprises 22 bones joined by fibrous serrated sutures (coronal, sagittal, lambdoid). It features the calvaria superiorly and the intricate cranial base pierced by 21 distinct foramina transmitting cranial nerves and vascular channels.",
      boneType: "Flat and irregular pneumatic bones",
      joints: ["Sutura sagittalis", "Sutura coronalis", "Temporomandibular Joint (TMJ)"],
      biomechanics: {
        compressiveStrength: "135 MPa",
        fractureThreshold: "4.5 to 6.8 kN dynamic blunt impact",
        meanWeight: "1.2 kg",
        calvarialThickness: "6.5 mm (frontal) to 8.2 mm (parietal)"
      },
      vascularNerve: {
        arterial: "Middle meningeal artery, Internal carotid, Vertebral basilar system",
        nerve: "Cranial Nerves I through XII, Meningeal branches"
      },
      pathologies: [
        "Depressed skull fracture with epidural hematoma risk",
        "Craniosynostosis (premature cranial suture fusion)",
        "Base of skull basilar fracture with CSF rhinorrhea"
      ],
      funFact: "Your skull bones don't fully fuse until adulthood (the anterior fontanelle stays open until 18-24 months of age), allowing rapid childhood brain growth!",
      coordinates: { x: 0, y: 7.6, z: 0 },
      meshId: "mesh_cranium"
    },
    {
      id: "mandible",
      name: "Mandible (Lower Jaw)",
      latinName: "Mandibula",
      system: "skeletal",
      region: "cranial",
      icon: "face",
      summary: "The strongest, densest, and only mobile bone of the human facial skeleton.",
      description: "Horizontally curved body with two perpendicular rami terminating in condylar and coronoid processes. Houses lower dental alveoli and articulates bilaterally with the temporal bones at the TMJ.",
      boneType: "Irregular membranous bone",
      joints: ["Temporomandibular Joint (bilateral ginglymoarthrodial)"],
      biomechanics: {
        biteForceMolar: "720 N (average male), up to 1,300 N in power clenching",
        elasticModulus: "18.2 GPa (cortical bone)",
        romDepression: "40 - 50 mm interincisal opening"
      },
      vascularNerve: {
        arterial: "Inferior alveolar artery (from maxillary artery), Facial artery",
        nerve: "Inferior alveolar nerve (CN V3 mandibular division)"
      },
      pathologies: [
        "TMJ internal derangement / anterior disc displacement",
        "Subcondylar or parasymphyseal traumatic fracture",
        "Osteonecrosis of the jaw (MRONJ)"
      ],
      funFact: "The jaw muscles acting on the mandible can exert crushing forces over 200 pounds on your molars—enough to crack a walnut shell effortlessly.",
      coordinates: { x: 0, y: 6.9, z: 0.7 },
      meshId: "mesh_mandible"
    },
    {
      id: "cervical_spine",
      name: "Cervical Spine (C1 - C7)",
      latinName: "Columna Vertebralis Cervicalis",
      system: "skeletal",
      region: "cervical",
      icon: "accessibility_new",
      summary: "Highly mobile spinal segment supporting cranium weight with transverse foramina for vertebral arteries.",
      description: "Consists of 7 vertebrae. C1 (Atlas) is a ring without a body; C2 (Axis) features the odontoid peg (Dens). C3-C7 possess bifid spinous processes and transverse foramina that protect the ascending vertebral blood supply to the circle of Willis.",
      boneType: "Irregular vertebrae with lordotic curve",
      joints: ["Atlanto-occipital (flexion-extension nod)", "Atlanto-axial (50% of head axial rotation)", "Zygapophyseal facet joints"],
      biomechanics: {
        cervicalLordosis: "-20° to -40° normal sagittal Cobb",
        axialLoadCapacity: "1,200 N before subaxial facet failure",
        rotationROM: "80° bilateral rotation, 45° lateral flexion, 50° flexion"
      },
      vascularNerve: {
        arterial: "Vertebral arteries (V1-V4), Ascending cervical artery",
        nerve: "Cervical spinal nerves C1-C8, Phrenic nerve (C3-C5 keeps the diaphragm alive)"
      },
      pathologies: [
        "Cervical spondylotic myelopathy / cord compression",
        "C5-C6 / C6-C7 disc herniation causing radiculopathy",
        "Whiplash hyperflexion-hyperextension ligamentous sprain"
      ],
      funFact: "Even though a giraffe's neck is over 6 feet long, both humans and giraffes have exactly 7 cervical vertebrae!",
      coordinates: { x: 0, y: 5.8, z: -0.1 },
      meshId: "mesh_cervical"
    },
    {
      id: "thoracic_cage",
      name: "Thoracic Cage & Sternum (T1-T12, 12 Ribs)",
      latinName: "Cavea Thoracis et Sternum",
      system: "skeletal",
      region: "thoracic",
      icon: "grid_view",
      summary: "Semi-rigid osteo-cartilaginous cage guarding heart and lungs while driving bellows respiration.",
      description: "12 pairs of ribs (1-7 true sternal, 8-10 false, 11-12 floating) linked by costal cartilage to the three-part sternum (manubrium, gladiolus, xiphoid). Articulates posteriorly with 12 thoracic vertebrae at costovertebral and costotransverse joints.",
      boneType: "Flat, curved osseous and hyaline cartilage",
      joints: ["Sternocostal joints", "Costovertebral joints", "Costotransverse joints"],
      biomechanics: {
        cageStiffness: "80 N/mm anterior-posterior resistance",
        expansionDelta: "3.5 to 7.0 cm thoracic circumference during deep inspiration",
        elasticSpringRate: "Absorbs up to 2.4 kJ blunt impact before multiple rib fractures"
      },
      vascularNerve: {
        arterial: "Internal thoracic (mammary) arteries, Posterior intercostal arteries",
        nerve: "Intercostal nerves T1-T11, Subcostal nerve T12"
      },
      pathologies: [
        "Flail chest (multiple segmental rib fractures)",
        "Costochondritis (Tietze syndrome inflammation)",
        "Pectus excavatum (sunken sternum) and carinatum"
      ],
      funFact: "Your ribcage moves up and down roughly 23,000 times every single day during normal resting breathing without you ever thinking about it.",
      coordinates: { x: 0, y: 3.4, z: 0.1 },
      meshId: "mesh_ribcage"
    },
    {
      id: "lumbar_spine",
      name: "Lumbar Spine (L1 - L5)",
      latinName: "Columna Vertebralis Lumbalis",
      system: "skeletal",
      region: "lumbar",
      icon: "swap_vert",
      summary: "Heavy-duty weight-bearing spinal pillar absorbing dynamic ground reaction forces and torso torque.",
      description: "Composed of 5 massive kidney-shaped vertebrae with thick pedicles, sagittal-oriented facet joints limiting axial rotation, and thick fibrocartilaginous intervertebral discs that cushion hundreds of kilograms during lifting movements.",
      boneType: "Massive irregular vertebrae with secondary lordosis",
      joints: ["L1-S1 Zygapophyseal joints", "Intervertebral symphyses"],
      biomechanics: {
        lordoticAngle: "-40° to -60°",
        axialLoadTolerance: "3,400 N in standing; exceeds 7,000 N during heavy athletic lifting",
        intradiscalPressure: "0.5 MPa (supine), 1.0 MPa (upright standing), 2.3 MPa (slouched lifting)"
      },
      vascularNerve: {
        arterial: "Lumbar arteries (from abdominal aorta), Median sacral artery",
        nerve: "Lumbar spinal nerves L1-L5, Cauda equina (horse-tail neural bundle)"
      },
      pathologies: [
        "L4-L5 / L5-S1 disc herniation with sciatic nerve impingement",
        "Lumbar spinal canal stenosis with neurogenic claudication",
        "Spondylolisthesis (vertebral body forward slippage)"
      ],
      funFact: "Astronauts in microgravity grow up to 2 inches taller because their lumbar discs decompress without Earth's gravity pulling down on them!",
      coordinates: { x: 0, y: 0.8, z: -0.2 },
      meshId: "mesh_lumbar"
    },
    {
      id: "pelvis",
      name: "Pelvic Girdle (Ilium, Ischium, Pubis, Sacrum)",
      latinName: "Cingulum Pelvicum",
      system: "skeletal",
      region: "pelvic",
      icon: "pie_chart",
      summary: "The body's primary mechanical load transfer bridge between spine and lower extremities.",
      description: "Rigid bony ring formed by two os coxae (hip bones) joined anteriorly at the pubic symphysis and posteriorly to the triangular sacrum at the sacroiliac (SI) joints. Contains deep cup-like acetabula for femoral head articulation.",
      boneType: "Large flat and irregular fused bones",
      joints: ["Sacroiliac joints (amphiarthrodial)", "Symphysis pubis", "Acetabulofemoral (Hip)"],
      biomechanics: {
        loadTransferEfficiency: "98% axial spinal load transmitted bilaterally to femurs",
        yieldStrength: "Can withstand 4,500 N lateral compression before pelvic ring breach",
        pelvicIncidenceAngle: "45° - 65° individual anatomic baseline"
      },
      vascularNerve: {
        arterial: "Common, internal, and external iliac arteries, Superior gluteal artery",
        nerve: "Lumbosacral trunk, Sacral plexus, Pudendal nerve"
      },
      pathologies: [
        "Sacroiliitis / Ankylosing spondylitis immune joint fusion",
        "High-energy 'open-book' pelvic ring disruption",
        "Acetabular labral tear and femoroacetabular impingement (FAI)"
      ],
      funFact: "The human pelvis evolved dramatic re-shaping when our ancestors shifted to bipedalism, creating a biomechanical bowl that balances the entire torso upright.",
      coordinates: { x: 0, y: -0.8, z: 0 },
      meshId: "mesh_pelvis"
    },
    {
      id: "femur",
      name: "Femur (Thigh Bone)",
      latinName: "Os Femoris",
      system: "skeletal",
      region: "lower_limb",
      icon: "straighten",
      summary: "The longest, strongest, and most resilient tubular bone in the entire human skeleton.",
      description: "Features a spherical articular head, 125° angled neck, greater and lesser trochanters for hip muscle insertion, cylindrical bowed shaft (diaphysis), and wide medial/lateral condyles forming the knee joint.",
      boneType: "Long tubular cortical bone with trabecular cancellous interior",
      joints: ["Coxofemoral (Hip ball-and-socket)", "Patellofemoral", "Tibiofemoral (Knee hinge)"],
      biomechanics: {
        compressiveStrength: "1,200 to 1,500 kg/cm² (capable of supporting 30 times human body weight)",
        bendingMoment: "250 to 300 Nm before midshaft fracture",
        neckShaftAngle: "125° to 135° (Coxa norma)"
      },
      vascularNerve: {
        arterial: "Profunda femoris, Medial & lateral circumflex femoral arteries",
        nerve: "Femoral nerve anteriorly, Sciatic nerve posteriorly"
      },
      pathologies: [
        "Subcapital femoral neck fracture (osteoporotic elderly hazard)",
        "High-velocity comminuted femoral shaft fracture",
        "Avascular necrosis (AVN) of the femoral head"
      ],
      funFact: "Ounce for ounce, human femoral cortical bone is stronger than reinforced structural concrete while being roughly four times lighter!",
      coordinates: { x: 0.9, y: -3.8, z: 0 },
      meshId: "mesh_femur"
    },
    {
      id: "humerus",
      name: "Humerus (Upper Arm Bone)",
      latinName: "Humerus",
      system: "skeletal",
      region: "upper_limb",
      icon: "fitness_center",
      summary: "Upper limb structural link offering the greatest rotational freedom of any major bone.",
      description: "Connects scapular glenoid cavity to the radius and ulna of the forearm. Features the hemispherical head, greater/lesser tubercles, deltoid tuberosity, and distal trochlea and capitulum.",
      boneType: "Long cylindrical bone",
      joints: ["Glenohumeral joint (shallow ball-and-socket)", "Humeroulnar joint (hinge)", "Humeroradial joint"],
      biomechanics: {
        torsionalStrength: "65 Nm maximum torque",
        flexionExtensionTorque: "120 Nm through elbow hinge",
        glenohumeralMotionRange: "180° flexion/abduction, 90° external rotation"
      },
      vascularNerve: {
        arterial: "Brachial artery, Anterior/posterior circumflex humeral arteries",
        nerve: "Radial nerve (travels directly in spiral radial groove), Axillary nerve"
      },
      pathologies: [
        "Proximal humerus fracture (Neer classification)",
        "Midshaft spiral fracture with acute radial nerve palsy (wrist drop)",
        "Anterior glenohumeral dislocation"
      ],
      funFact: "The sensation when you hit your 'funny bone' is actually your ulnar nerve vibrating against the hard medial epicondyle of your humerus!",
      coordinates: { x: 2.1, y: 3.2, z: 0 },
      meshId: "mesh_humerus"
    },

    // ==========================================
    // MUSCULAR SYSTEM
    // ==========================================
    {
      id: "pectoralis_major",
      name: "Pectoralis Major (Chest Muscle)",
      latinName: "Musculus Pectoralis Major",
      system: "muscular",
      region: "thoracic",
      icon: "shield",
      summary: "Broad fan-shaped chest muscle powering forceful arm adduction, internal rotation, and pushing torque.",
      description: "Arises from two distinct anatomical heads: the clavicular head (medial half of clavicle) and the sternocostal head (sternum and upper 6 costal cartilages). Converges into a flat U-shaped bilaminar tendon inserting onto the lateral lip of the bicipital groove of the humerus.",
      muscleType: "Skeletal striated muscle (convergent multipennate)",
      origin: "Medial clavicle, anterior sternum, ribs 1-6 cartilage",
      insertion: "Lateral lip of intertubercular sulcus of humerus",
      innervation: "Medial and lateral pectoral nerves (C5-T1 roots)",
      biomechanics: {
        maxForceOutput: "Over 1,200 N during peak bench press or punching torque",
        fiberComposition: "60% Type II fast-twitch glycolytic, 40% Type I slow oxidative",
        primaryAction: "Arm horizontal adduction, shoulder internal rotation, arm flexion"
      },
      vascularNerve: {
        arterial: "Pectoral branch of thoracoacromial trunk, Lateral thoracic artery",
        nerve: "Lateral pectoral nerve (C5-C7), Medial pectoral nerve (C8-T1)"
      },
      pathologies: [
        "Pectoralis major distal tendon rupture (eccentric bench press overload)",
        "Poland syndrome (congenital unilateral absence of sternal head)",
        "Pectoralis minor tightness causing neurovascular thoracic outlet compression"
      ],
      funFact: "World-record powerlifters can generate over 3,000 Newtons of tension through their pectoralis tendons during a 700+ lb bench press!",
      coordinates: { x: 0.9, y: 3.8, z: 0.8 },
      meshId: "mesh_pectoralis"
    },
    {
      id: "deltoid",
      name: "Deltoid Muscle (Shoulder)",
      latinName: "Musculus Deltoideus",
      system: "muscular",
      region: "upper_limb",
      icon: "radio_button_checked",
      summary: "Triangular muscular cap providing 180° arm abduction and shoulder stabilization.",
      description: "Comprises anterior (clavicular), lateral (acromial - multipennate for sheer power), and posterior (spinal) divisions that coalesce into the deltoid tuberosity on the mid-lateral humerus.",
      muscleType: "Multipennate skeletal muscle",
      origin: "Lateral 1/3 of clavicle, acromion process, spine of scapula",
      insertion: "Deltoid tuberosity of humerus",
      innervation: "Axillary nerve (C5, C6 posterior cord)",
      biomechanics: {
        abductionTorque: "Peak torque generated at 60° to 90° arm abduction (~45 Nm)",
        fiberArchitecture: "Multipennate central fibers allow maximum cross-sectional area and force density",
        primaryAction: "Arm abduction (15° to 90°+), forward flexion (anterior), horizontal extension (posterior)"
      },
      vascularNerve: {
        arterial: "Posterior circumflex humeral artery, Deltoid branch of thoracoacromial",
        nerve: "Axillary nerve (vulnerable to injury in shoulder dislocation or surgical neck fractures)"
      },
      pathologies: [
        "Axillary nerve neuropathy causing deltoid atrophy and shoulder contour flattening",
        "Subacromial impingement syndrome involving supraspinatus under deltoid leverage",
        "Deltoid intramuscular injection site nerve injury"
      ],
      funFact: "The lateral head of the deltoid is multipennate—its muscle fibers are angled like bird feathers, packing far more muscle fibers into a compact space for lifting strength!",
      coordinates: { x: 2.2, y: 4.3, z: 0.1 },
      meshId: "mesh_deltoid"
    },
    {
      id: "biceps_brachii",
      name: "Biceps Brachii (Arm Flexor)",
      latinName: "Musculus Biceps Brachii",
      system: "muscular",
      region: "upper_limb",
      icon: "hardware",
      summary: "Two-headed anterior arm muscle serving as the premier forearm supinator and elbow flexor.",
      description: "Originates as a long head (supraglenoid tubercle of scapula, passing through the joint capsule) and short head (coracoid process). Merges into a common tendon inserting into the radial tuberosity and bicipital aponeurosis.",
      muscleType: "Fusiform parallel-fiber skeletal muscle",
      origin: "Long head: supraglenoid tubercle; Short head: coracoid process of scapula",
      insertion: "Radial tuberosity and bicipital aponeurosis into deep forearm fascia",
      innervation: "Musculocutaneous nerve (C5, C6)",
      biomechanics: {
        supinationTorque: "Strongest supinator of the forearm (4.2 Nm torque when elbow is at 90°)",
        flexionStrength: "Peak elbow flexion power achieved at 90° - 100° flexion angle",
        tendonTensionLimit: "Distal tendon can resist up to 1,500 N before acute avulsion"
      },
      vascularNerve: {
        arterial: "Brachial artery muscular branches",
        nerve: "Musculocutaneous nerve"
      },
      pathologies: [
        "Distal biceps tendon rupture ('Popeye' muscle retraction deformity)",
        "Long head proximal tendinitis and SLAP (superior labrum anterior-posterior) tears",
        "Bicipital groove subluxation from transverse humeral ligament failure"
      ],
      funFact: "Your biceps is actually much more powerful at twisting your arm (supinating, like turning a corkscrew or driving a screwdriver) than it is at simply bending your elbow!",
      coordinates: { x: 2.3, y: 2.8, z: 0.4 },
      meshId: "mesh_biceps"
    },
    {
      id: "rectus_abdominis",
      name: "Rectus Abdominis (Core / 6-Pack)",
      latinName: "Musculus Rectus Abdominis",
      system: "muscular",
      region: "abdominal",
      icon: "view_column",
      summary: "Paired vertical abdominal muscle providing trunk flexion and compressing abdominal viscera.",
      description: "Separated in the midline by the linea alba and subdivided horizontally by 3 to 4 fibrous bands called tendinous intersections (intersectiones tendineae), creating the characteristic segmented 'six-pack' anatomical architecture.",
      muscleType: "Long strap-like polygonally segmented muscle",
      origin: "Pubic crest and pubic symphysis",
      insertion: "Xiphoid process and costal cartilages of ribs 5-7",
      innervation: "Thoracoabdominal intercostal nerves (T7 - T12)",
      biomechanics: {
        trunkFlexionForce: "Generates over 750 N trunk curling force",
        intraabdominalPressure: "Can elevate intra-abdominal pressure above 200 mmHg during Valsalva maneuver",
        posturalStabilizer: "Counters lumbar lordosis and stabilizes the pelvis against anterior pelvic tilt"
      },
      vascularNerve: {
        arterial: "Superior and inferior epigastric arteries (anastomose in rectus sheath)",
        nerve: "Lower 6 thoracic ventral rami (T7-T12)"
      },
      pathologies: [
        "Diastasis recti (pathologic separation of left and right rectus bellies)",
        "Rectus sheath hematoma (rupture of inferior epigastric artery)",
        "Athletic pubalgia ('sports hernia' tearing of rectus abdominis insertion at pubis)"
      ],
      funFact: "The fibrous lines dividing your 6-pack are remnants of segmentation from our vertebrate ancestors, exactly like the muscle segments you see in a fish fillet!",
      coordinates: { x: 0, y: 1.8, z: 0.8 },
      meshId: "mesh_rectus_abdominis"
    },
    {
      id: "latissimus_dorsi",
      name: "Latissimus Dorsi (Broad Back Wing)",
      latinName: "Musculus Latissimus Dorsi",
      system: "muscular",
      region: "thoracic",
      icon: "filter_hdr",
      summary: "The broadest muscle in the human body, providing powerful climbing, pulling, and swimming torque.",
      description: "Spans from the lower thoracic and lumbar spines via the thoracolumbar fascia, iliac crest, and lower ribs to wrap around and insert into the floor of the intertubercular groove of the humerus.",
      muscleType: "Broad triangular sheet muscle",
      origin: "Spinous processes T7-T12, thoracolumbar fascia, iliac crest, ribs 9-12",
      insertion: "Floor of bicipital groove of humerus",
      innervation: "Thoracodorsal nerve (C6, C7, C8)",
      biomechanics: {
        pullForce: "Primary muscle engine for pull-ups, swimming butterfly, and climbing (>1,500 N force)",
        shoulderExtension: "Provides extreme humerus adduction, extension, and internal rotation",
        respiratorySupport: "Acts as an accessory expiratory muscle during vigorous coughing ('cough muscle')"
      },
      vascularNerve: {
        arterial: "Thoracodorsal artery (branch of subscapular artery)",
        nerve: "Thoracodorsal nerve"
      },
      pathologies: [
        "Latissimus dorsi tendon avulsion in professional baseball pitchers",
        "Thoracolumbar fascial stiffness causing persistent lower back pain",
        "Post-thoracotomy muscle spasm and scarring"
      ],
      funFact: "Because the latissimus dorsi is so massive and richly vascularized, plastic surgeons frequently use it as a donor flap to reconstruct breast tissue or cover large tissue defects!",
      coordinates: { x: 0, y: 2.2, z: -0.8 },
      meshId: "mesh_latissimus"
    },
    {
      id: "gluteus_maximus",
      name: "Gluteus Maximus (Buttock Extensor)",
      latinName: "Musculus Gluteus Maximus",
      system: "muscular",
      region: "pelvic",
      icon: "directions_run",
      summary: "The heaviest and single most powerful muscle in the human muscular system.",
      description: "Coarse thick quadrilateral muscle forming the prominence of the nates. Anchors onto the outer ilium, sacrum, and coccyx, inserting into the iliotibial (IT) tract and gluteal tuberosity of the femur.",
      muscleType: "Coarse multipennate high-mass skeletal muscle",
      origin: "Posterior gluteal line of ilium, sacrum, coccyx, sacrotuberous ligament",
      insertion: "Iliotibial tract of fascia lata and gluteal tuberosity of femur",
      innervation: "Inferior gluteal nerve (L5, S1, S2)",
      biomechanics: {
        peakForceProduction: "Exceeds 2,200 N of explosive hip extension force during sprinting or jumping",
        stairClimbingEngine: "Crucial for rising from seated postures, sprinting, and climbing slopes",
        pelvisStabilizer: "Locks the femoral head firmly into the acetabulum preventing anterior pelvic collapse"
      },
      vascularNerve: {
        arterial: "Superior and inferior gluteal arteries",
        nerve: "Inferior gluteal nerve"
      },
      pathologies: [
        "Gluteal amnesia / reciprocal inhibition from prolonged desk sitting",
        "Piriformis / deep gluteal syndrome irritating the passing sciatic nerve",
        "Gluteus maximus tendon bursitis (trochanteric bursitis)"
      ],
      funFact: "Humans have proportionately much larger gluteus maximus muscles than chimpanzees or gorillas—it is our primary evolutionary adaptation for running upright on two legs!",
      coordinates: { x: 0, y: -1.2, z: -0.9 },
      meshId: "mesh_gluteus"
    },
    {
      id: "quadriceps",
      name: "Quadriceps Femoris (Thigh Muscle)",
      latinName: "Musculus Quadriceps Femoris",
      system: "muscular",
      region: "lower_limb",
      icon: "electric_bolt",
      summary: "Massive four-headed anterior thigh muscle extending the knee and stabilizing human bipedal stance.",
      description: "Comprises Rectus Femoris (crosses both hip and knee), Vastus Lateralis, Vastus Medialis (with oblique fibers stabilizing patellar tracking), and Vastus Intermedius. Converges into the quadriceps tendon continuing via the patella as the patellar ligament.",
      muscleType: "Compound four-bellied skeletal muscle",
      origin: "AIIS (Rectus femoris) and femoral shaft (Vastus lateralis, medialis, intermedius)",
      insertion: "Tibial tuberosity via patella and patellar ligament",
      innervation: "Femoral nerve (L2, L3, L4)",
      biomechanics: {
        peakKneeExtensorTorque: "Over 350 Nm torque; can absorb ground shock up to 5 times body weight upon landing",
        crossSectionalArea: "Largest muscle volume in the human body (~1,800 cm³)",
        patellarLeverage: "The patella increases the biomechanical moment arm of the quads by up to 30%"
      },
      vascularNerve: {
        arterial: "Lateral circumflex femoral artery, Deep femoral artery branches",
        nerve: "Femoral nerve"
      },
      pathologies: [
        "Quadriceps tendon or patellar tendon rupture",
        "Patellofemoral pain syndrome (runner's knee) from vastus medialis obliquus (VMO) weakness",
        "Myositis ossificans following traumatic quadriceps blunt contusion"
      ],
      funFact: "When you jump and land, your quadriceps undergo eccentric contraction absorbing thousands of Newtons of kinetic energy in milliseconds to keep your knees from collapsing!",
      coordinates: { x: 0.9, y: -3.5, z: 0.5 },
      meshId: "mesh_quadriceps"
    },
    {
      id: "gastrocnemius",
      name: "Gastrocnemius & Soleus (Calf / Triceps Surae)",
      latinName: "Musculus Gastrocnemius et Soleus",
      system: "muscular",
      region: "lower_limb",
      icon: "hiking",
      summary: "Dynamic two-headed calf muscle powering ankle plantarflexion and propulsion during sprinting.",
      description: "Medial and lateral heads arise from the femoral condyles, blending with the deep soleus muscle to form the calcaneal (Achilles) tendon—the thickest and strongest tendon in the human body.",
      muscleType: "Pennate high-tensile power muscle",
      origin: "Medial and lateral condyles of femur (gastrocnemius), posterior tibia and fibula (soleus)",
      insertion: "Posterior surface of calcaneus bone via Achilles tendon",
      innervation: "Tibial nerve (S1, S2)",
      biomechanics: {
        achillesTensileStrength: "Can withstand tensile loads exceeding 8,000 N (8-10x body weight in sprinting)",
        elasticEnergyRecoil: "Stores and releases kinetic elastic energy like a biological spring during running gait",
        soleusMuscleVenousPump: "Acts as the 'peripheral heart', pumping deoxygenated blood back up to the torso"
      },
      vascularNerve: {
        arterial: "Sural arteries (popliteal branch), Posterior tibial artery",
        nerve: "Tibial nerve"
      },
      pathologies: [
        "Acute Achilles tendon rupture (audible 'gunshot' pop during push-off)",
        "Gastrocnemius medial head tear ('tennis leg')",
        "Deep vein thrombosis (DVT) in the soleal venous sinuses"
      ],
      funFact: "The soleus muscle inside your calf is known as your 'second heart' because its contractions squeeze deep veins to pump over 70% of lower body blood back up against gravity!",
      coordinates: { x: 0.8, y: -7.2, z: -0.4 },
      meshId: "mesh_calf"
    },

    // ==========================================
    // VITAL VISCERAL ORGANS & CARDIOVASCULAR
    // ==========================================
    {
      id: "heart",
      name: "Heart (Cor & Myocardium)",
      latinName: "Cor Humanum",
      system: "organs",
      region: "thoracic",
      icon: "favorite",
      summary: "Four-chambered muscular suction-pressure pump circulating 7,500 liters of blood per day.",
      description: "Conical hollow muscular organ located in the middle mediastinum. Consists of right and left atria and ventricles, separated by cardiac valves (tricuspid, mitral, aortic, pulmonary) with an intrinsic cardiac conduction pacing system (SA and AV nodes).",
      organType: "Muscular pump (specialized striated cardiac syncytium)",
      cardiacOutput: "5.0 Liters/min at rest, up to 35 Liters/min in Olympic endurance athletes",
      strokeVolume: "70 mL per beat",
      meanArterialPressure: "93 mmHg (120/80 normal clinical arterial pressure)",
      biomechanics: {
        dailyBeats: "~100,000 contractions per day (over 2.5 billion in an average lifetime)",
        powerOutput: "Approximately 1.3 Watts continuous mechanical work",
        pressureGeneration: "Left ventricle generates 120 mmHg systolic peak ejection pressure"
      },
      vascularNerve: {
        arterial: "Right and Left Coronary Arteries (LAD 'widowmaker', Circumflex, RCA)",
        nerve: "Cardiac plexus (Vagus nerve slows heart rate; sympathetic T1-T4 accelerates)"
      },
      pathologies: [
        "Myocardial infarction (acute coronary artery thrombosis)",
        "Aortic valve stenosis with left ventricular concentric hypertrophy",
        "Atrial fibrillation and heart failure with reduced ejection fraction (HFrEF)"
      ],
      funFact: "Your heart generates enough hydraulic pressure to squirt blood over 30 feet in the air, and beats continuously without taking a single break for your entire life!",
      coordinates: { x: 0.3, y: 3.6, z: 0.2 },
      meshId: "mesh_heart"
    },
    {
      id: "lungs",
      name: "Lungs & Respiratory Tree",
      latinName: "Pulmones",
      system: "organs",
      region: "thoracic",
      icon: "air",
      summary: "Paired gas exchange organs containing 300 million alveoli with an alveolar surface area equal to a tennis court.",
      description: "Right lung features 3 lobes (superior, middle, inferior); left lung features 2 lobes with cardiac notch. Atmospheric air travels via trachea and arborizing bronchi into microscopic alveoli wrapped in capillary beds for passive diffusion of O₂ and CO₂.",
      organType: "Parenchymal sponge-like respiratory organ",
      vitalCapacity: "4.8 L (male), 3.2 L (female) average forced vital volume",
      alveolarSurfaceArea: "75 to 100 square meters",
      biomechanics: {
        negativePleuralPressure: "-5 cm H₂O baseline expanding to -8 cm H₂O on inspiration",
        compliance: "200 mL/cm H₂O normal healthy lung elasticity",
        dailyAirTurnover: "Inhales approximately 11,000 liters of atmospheric air daily"
      },
      vascularNerve: {
        arterial: "Pulmonary arteries (deliver deoxygenated blood), Bronchial arteries (nourish tissue)",
        nerve: "Pulmonary plexus (Vagus and sympathetic trunks)"
      },
      pathologies: [
        "Acute pulmonary embolism (blood clot obstructing pulmonary arterial flow)",
        "Chronic Obstructive Pulmonary Disease (COPD) and emphysema",
        "Tension pneumothorax (air trapping in pleural space collapsing lung)"
      ],
      funFact: "If you unrolled and flattened out all the microscopic air sacs (alveoli) inside both your lungs, they would completely cover an entire standard doubles tennis court!",
      coordinates: { x: 0, y: 3.5, z: 0 },
      meshId: "mesh_lungs"
    },
    {
      id: "brain",
      name: "Brain (Cerebrum & Cerebellum)",
      latinName: "Encephalon",
      system: "organs",
      region: "cranial",
      icon: "neurology",
      summary: "The apex command center comprising 86 billion neurons and 100 trillion synaptic connections.",
      description: "Divided into cerebral hemispheres (frontal, parietal, temporal, occipital lobes), diencephalon (thalamus, hypothalamus), cerebellum (motor balance and coordination), and brainstem (midbrain, pons, medulla regulating cardiac and breathing centers).",
      organType: "High-density neural computing organ",
      cranialVolume: "1,350 to 1,450 cm³",
      metabolicConsumption: "Consumes 20% of total bodily oxygen and 25% of glucose despite being only 2% of body mass",
      biomechanics: {
        shearModulus: "0.5 to 1.5 kPa (extremely soft, gel-like viscoelastic consistency)",
        intracranialPressure: "7 - 15 mmHg normal supine baseline (Monro-Kellie doctrine)",
        csfProduction: "500 mL/day of cerebrospinal fluid providing buoyant cushioning"
      },
      vascularNerve: {
        arterial: "Circle of Willis (Internal carotid arteries + Vertebral-Basilar system)",
        nerve: "Direct origin of Cranial Nerves I through XII"
      },
      pathologies: [
        "Ischemic stroke / Middle cerebral artery (MCA) occlusion",
        "Ruptured cerebral aneurysm with subarachnoid hemorrhage",
        "Traumatic Brain Injury (TBI) with diffuse axonal injury"
      ],
      funFact: "Information signals zip along your neural pathways at speeds up to 268 miles per hour (431 km/h)—faster than a Formula 1 racing car!",
      coordinates: { x: 0, y: 7.7, z: 0.1 },
      meshId: "mesh_brain"
    },
    {
      id: "liver",
      name: "Liver (Hepar)",
      latinName: "Hepar",
      system: "organs",
      region: "abdominal",
      icon: "science",
      summary: "The body's primary metabolic chemical plant performing over 500 essential physiological tasks.",
      description: "Largest internal visceral organ, weighing ~1.5 kg. Located in the right hypochondrium and epigastrium. Synthesizes albumin and clotting factors, stores glycogen, metabolizes drugs/toxins, and secretes bile into the gallbladder and duodenum.",
      organType: "Exocrine gland and metabolic organ",
      bloodFlow: "1,450 mL/min (75% from hepatic portal vein carrying absorbed gut nutrients, 25% hepatic artery)",
      biomechanics: {
        viscoelasticDamping: "High vascular turgor acting as a vascular sponge and fluid reservoir",
        regenerativeProwess: "Can fully regenerate entire functional mass even after 70% surgical resection!",
        glycogenCapacity: "Stores up to 100-120 grams of glycogen for systemic blood sugar regulation"
      },
      vascularNerve: {
        arterial: "Hepatic artery proper, Hepatic portal vein, Hepatic veins draining to IVC",
        nerve: "Hepatic plexus (vagus and celiac sympathetic plexus)"
      },
      pathologies: [
        "Cirrhosis and portal hypertension with esophageal varices",
        "Nonalcoholic steatohepatitis (NASH / MASH) fatty liver disease",
        "Hepatocellular carcinoma (HCC)"
      ],
      funFact: "The liver is the only visceral organ in the human body capable of complete natural regeneration—you can donate 60% of your liver, and it will regrow to full size within weeks!",
      coordinates: { x: -0.6, y: 2.1, z: 0.3 },
      meshId: "mesh_liver"
    },
    {
      id: "kidneys",
      name: "Kidneys (Renal Filter System)",
      latinName: "Renes",
      system: "organs",
      region: "abdominal",
      icon: "water_drop",
      summary: "Twin filtration units filtering 180 liters of blood plasma daily to maintain fluid and electrolyte homeostasis.",
      description: "Retroperitoneal bean-shaped organs at vertebral levels T12-L3. Each contains approximately 1 million microscopic nephrons filtering plasma, regulating blood pressure via the renin-angiotensin-aldosterone axis (RAAS), and producing erythropoietin (EPO) for RBC creation.",
      organType: "Filtration and endocrine organ",
      renalBloodFlow: "1.2 Liters/minute (receives 20-25% of entire resting cardiac output)",
      gfrRate: "120 mL/min glomerular filtration rate",
      biomechanics: {
        osmoticGradient: "Maintains medullary hyperosmolar gradient from 300 to 1,200 mOsm/kg H₂O",
        perfusionPressure: "Autoregulates glomerular capillary pressure across systemic BP 80-180 mmHg",
        dailyFiltration: "Filters your entire blood volume more than 40 times every single day"
      },
      vascularNerve: {
        arterial: "Right and Left Renal Arteries direct from Abdominal Aorta",
        nerve: "Renal plexus (sympathetic vasomotor regulation)"
      },
      pathologies: [
        "Chronic Kidney Disease (CKD) requiring hemodialysis or renal transplant",
        "Nephrolithiasis (kidney stones causing acute renal colic)",
        "Diabetic nephropathy with hyperfiltration and microalbuminuria"
      ],
      funFact: "Every drop of blood in your body flows through your kidneys over 40 times a day, filtering out metabolic wastes while recapturing 99% of filtered water and vital minerals!",
      coordinates: { x: 0.7, y: 1.4, z: -0.3 },
      meshId: "mesh_kidneys"
    },

    // ==========================================
    // NERVOUS SYSTEM
    // ==========================================
    {
      id: "spinal_cord",
      name: "Spinal Cord & Cauda Equina",
      latinName: "Medulla Spinalis",
      system: "nervous",
      region: "spinal",
      icon: "hub",
      summary: "The main neural high-speed trunk line relaying sensory inputs and motor commands between brain and body.",
      description: "Cylindrical neural structure running from the foramen magnum to the conus medullaris (at L1-L2 vertebra), protected within the vertebral canal. Gives rise to 31 pairs of spinal nerves, continuing inferiorly as the cauda equina ('horse's tail').",
      nerveType: "Central nervous system tract bundle",
      length: "43 cm (female) to 45 cm (male)",
      nerveCount: "31 bilateral spinal nerve pairs (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal)",
      biomechanics: {
        conductionVelocity: "Up to 120 meters per second (270 mph) in heavily myelinated A-alpha motor fibers",
        tensileElasticity: "Elongates up to 10% during full spinal flexion without neurological compromise",
        protectiveMeninges: "Three layered protective sheath: Dura mater, Arachnoid mater with CSF, and Pia mater"
      },
      vascularNerve: {
        arterial: "One anterior spinal artery, Two posterior spinal arteries, Radicular artery of Adamkiewicz",
        nerve: "Forms the cervical, brachial, lumbar, and sacral plexuses"
      },
      pathologies: [
        "Traumatic spinal cord transection / paraplegia and quadriplegia",
        "Cauda equina syndrome (surgical emergency from massive central disc herniation)",
        "Multiple Sclerosis (autoimmune demyelination of spinal white matter tracts)"
      ],
      funFact: "Reflexes like pulling your hand off a scorching hot stove happen entirely within your spinal cord in less than 20 milliseconds—before your brain even registers that you've been burned!",
      coordinates: { x: 0, y: 3.2, z: -0.3 },
      meshId: "mesh_spinal_cord"
    },
    {
      id: "sciatic_nerve",
      name: "Sciatic Nerve (Nervus Ischiadicus)",
      latinName: "Nervus Ischiadicus",
      system: "nervous",
      region: "lower_limb",
      icon: "alt_route",
      summary: "The largest and thickest individual nerve in the human body, measuring roughly the width of an adult thumb.",
      description: "Originates from the sacral plexus (L4-S3 spinal nerve roots), exits the pelvis below the piriformis muscle via the greater sciatic foramen, descends along the posterior thigh, and bifurcates at the popliteal fossa into the tibial and common fibular nerves.",
      nerveType: "Mixed sensory and motor peripheral nerve trunk",
      diameter: "Up to 2 cm (width of an adult thumb) at pelvic exit",
      innervationTerritory: "Sensory to leg and foot; motor to hamstrings, calf, foot, and toe musculature",
      biomechanics: {
        mechanicalTensionStrain: "Undergoes significant longitudinal excursion (~28 mm) during hip flexion with knee extension (straight leg raise)",
        protectiveEpineurium: "Encased in a thick fibrous epineural sheath providing high compressive shielding",
        actionPotentialRate: "Transmits up to 500 impulses per second"
      },
      vascularNerve: {
        arterial: "Arteria comitans nervi ischiadici (branch of inferior gluteal artery)",
        nerve: "Direct derivative of anterior rami L4, L5, S1, S2, S3"
      },
      pathologies: [
        "Sciatica (radiating electric pain down the buttock and posterior leg from L5-S1 nerve root compression)",
        "Piriformis syndrome (muscular entrapment of the nerve trunk)",
        "Peroneal / fibular branch entrapment leading to painless foot drop"
      ],
      funFact: "Your sciatic nerve is as thick as your thumb and runs all the way from your lower back down to your big toe—making it the longest single nerve path in your entire body!",
      coordinates: { x: 0.6, y: -2.8, z: -0.4 },
      meshId: "mesh_sciatic"
    }
  ],

  // Detailed Vertebral Column Telemetry Database (Inherited & expanded from Stitch spine project)
  vertebrae: [
    // Cervical (C1 - C7)
    { id: "C1", name: "Atlas (C1)", segment: "Cervical", yPos: 7.2, height: "12mm", canal: "22mm", curvature: "-28.4°", load: "80N", disc: "None (atlanto-occipital)", status: "Optimal", color: "#38bdf8" },
    { id: "C2", name: "Axis (C2)", segment: "Cervical", yPos: 6.7, height: "14mm", canal: "20mm", curvature: "-28.4°", load: "110N", disc: "C1-C2 fibrous", status: "Optimal", color: "#38bdf8" },
    { id: "C3", name: "Cervical 3 (C3)", segment: "Cervical", yPos: 6.2, height: "13.5mm", canal: "18mm", curvature: "-28.4°", load: "130N", disc: "Hydrated 95%", status: "Optimal", color: "#38bdf8" },
    { id: "C4", name: "Cervical 4 (C4)", segment: "Cervical", yPos: 5.7, height: "13.8mm", canal: "17.5mm", curvature: "-28.4°", load: "145N", disc: "Hydrated 93%", status: "Optimal", color: "#38bdf8" },
    { id: "C5", name: "Cervical 5 (C5)", segment: "Cervical", yPos: 5.2, height: "14.0mm", canal: "16.8mm", curvature: "-28.4°", load: "160N", disc: "Hydrated 94%", status: "Optimal", color: "#38bdf8" },
    { id: "C6", name: "Cervical 6 (C6)", segment: "Cervical", yPos: 4.7, height: "14.2mm", canal: "16.5mm", curvature: "-28.4°", load: "180N", disc: "Hydrated 92%", status: "Optimal", color: "#38bdf8" },
    { id: "C7", name: "Vertebra Prominens (C7)", segment: "Cervical", yPos: 4.2, height: "14.8mm", canal: "16.2mm", curvature: "-28.4°", load: "205N", disc: "Hydrated 90%", status: "Optimal", color: "#38bdf8" },
    
    // Thoracic (T1 - T12)
    { id: "T1", name: "Thoracic 1 (T1)", segment: "Thoracic", yPos: 3.7, height: "16mm", canal: "15.8mm", curvature: "+34.8°", load: "230N", disc: "Rigid costal", status: "Optimal", color: "#00f0ff" },
    { id: "T2", name: "Thoracic 2 (T2)", segment: "Thoracic", yPos: 3.2, height: "17mm", canal: "15.5mm", curvature: "+34.8°", load: "260N", disc: "Stable 91%", status: "Optimal", color: "#00f0ff" },
    { id: "T3", name: "Thoracic 3 (T3)", segment: "Thoracic", yPos: 2.7, height: "18mm", canal: "15.2mm", curvature: "+34.8°", load: "290N", disc: "Stable 92%", status: "Optimal", color: "#00f0ff" },
    { id: "T4", name: "Thoracic 4 (T4)", segment: "Thoracic", yPos: 2.2, height: "19mm", canal: "15.0mm", curvature: "+34.8°", load: "320N", disc: "Stable 90%", status: "Optimal", color: "#00f0ff" },
    { id: "T5", name: "Thoracic 5 (T5)", segment: "Thoracic", yPos: 1.7, height: "20mm", canal: "14.8mm", curvature: "+34.8°", load: "350N", disc: "Stable 89%", status: "Optimal", color: "#00f0ff" },
    { id: "T6", name: "Thoracic 6 (T6)", segment: "Thoracic", yPos: 1.2, height: "21mm", canal: "14.6mm", curvature: "+34.8°", load: "380N", disc: "Stable 91%", status: "Optimal", color: "#00f0ff" },
    { id: "T7", name: "Thoracic 7 (T7)", segment: "Thoracic", yPos: 0.7, height: "22mm", canal: "14.5mm", curvature: "+34.8°", load: "410N", disc: "Stable 88%", status: "Optimal", color: "#00f0ff" },
    { id: "T8", name: "Thoracic 8 (T8)", segment: "Thoracic", yPos: 0.2, height: "23mm", canal: "14.5mm", curvature: "+34.8°", load: "440N", disc: "Stable 90%", status: "Optimal", color: "#00f0ff" },
    { id: "T9", name: "Thoracic 9 (T9)", segment: "Thoracic", yPos: -0.3, height: "24mm", canal: "14.7mm", curvature: "+34.8°", load: "470N", disc: "Stable 89%", status: "Optimal", color: "#00f0ff" },
    { id: "T10", name: "Thoracic 10 (T10)", segment: "Thoracic", yPos: -0.8, height: "25mm", canal: "15.0mm", curvature: "+34.8°", load: "500N", disc: "Stable 87%", status: "Optimal", color: "#00f0ff" },
    { id: "T11", name: "Thoracic 11 (T11)", segment: "Thoracic", yPos: -1.3, height: "26mm", canal: "15.5mm", curvature: "+34.8°", load: "530N", disc: "Floating rib", status: "Optimal", color: "#00f0ff" },
    { id: "T12", name: "Thoracic 12 (T12)", segment: "Thoracic", yPos: -1.8, height: "27mm", canal: "16.0mm", curvature: "+34.8°", load: "570N", disc: "Thoracolumbar junc", status: "Optimal", color: "#00f0ff" },

    // Lumbar (L1 - L5)
    { id: "L1", name: "Lumbar 1 (L1)", segment: "Lumbar", yPos: -2.3, height: "29mm", canal: "17.0mm", curvature: "-48.2°", load: "620N", disc: "Hydrated 92%", status: "Optimal", color: "#0284c7" },
    { id: "L2", name: "Lumbar 2 (L2)", segment: "Lumbar", yPos: -2.8, height: "31mm", canal: "17.5mm", curvature: "-48.2°", load: "680N", disc: "Hydrated 91%", status: "Optimal", color: "#0284c7" },
    { id: "L3", name: "Lumbar 3 (L3)", segment: "Lumbar", yPos: -3.3, height: "33mm", canal: "17.8mm", curvature: "-48.2°", load: "740N", disc: "Hydrated 93%", status: "Optimal", color: "#0284c7" },
    { id: "L4", name: "Lumbar 4 (L4)", segment: "Lumbar", yPos: -3.8, height: "34mm", canal: "18.0mm", curvature: "-48.2°", load: "820N", disc: "Buffer 96.8%", status: "Optimal", color: "#0284c7" },
    { id: "L5", name: "Lumbar 5 (L5)", segment: "Lumbar", yPos: -4.3, height: "35mm", canal: "18.5mm", curvature: "-48.2°", load: "910N", disc: "High shear zone", status: "Monitor", color: "#0284c7" },

    // Sacrum & Coccyx
    { id: "S1-S5", name: "Sacrum (Fused S1-S5)", segment: "Sacral", yPos: -5.2, height: "Fused 105mm", canal: "15mm", curvature: "39° Sacral slope", load: "1,150N", disc: "Sacral promontory", status: "Keystone", color: "#6366f1" },
    { id: "Co1-Co4", name: "Coccyx (Tailbone)", segment: "Coccyx", yPos: -6.4, height: "Fused 28mm", canal: "None", curvature: "Anterior curve", load: "120N sitting", disc: "Sacrococcygeal symphysis", status: "Intact", color: "#818cf8" }
  ],

  // AI Diagnostic & Simulation Scenarios (for "Train/Simulate AI Model")
  aiSimulations: [
    {
      id: "sim_squat_load",
      title: "Heavy Barbell Squat (1,200 N Axial Compression)",
      category: "Biomechanical Kinetic Load",
      targetIds: ["lumbar_spine", "quadriceps", "gluteus_maximus"],
      description: "Applies 1,200 Newtons of axial gravitational compression down the spinal column, tracking intradiscal barometric spike at L4-L5 and concentric motor recruitment in Quadriceps and Gluteus Maximus.",
      telemetryDeltas: {
        axialLoad: "1,240 N (+195%)",
        flexionAngle: "88.5°",
        intradiscalPressure: "2.15 MPa (Safe range)",
        vibrationHz: "34 Hz firing frequency"
      },
      aiReport: "DIAGNOSTIC TELEMETRY: Spinal lordosis maintained within physiological limit. Vastus lateralis motor unit action potential synchronization at 94%. No focal disc extrusion detected under peak barbell displacement."
    },
    {
      id: "sim_sciatica",
      title: "L5-S1 Herniation & Sciatic Impingement",
      category: "Neurological Pathology",
      targetIds: ["lumbar_spine", "sciatic_nerve"],
      description: "Simulates posterolateral annulus fibrosus rupture with 4.2mm nucleus pulposus extrusion compressing the exiting L5 nerve root and radiating down the sciatic trunk.",
      telemetryDeltas: {
        axialLoad: "480 N",
        flexionAngle: "12.0° (Antalgic splinting)",
        intradiscalPressure: "0.42 MPa (Decompressed rupture)",
        vibrationHz: "120 Hz neuropathic firing"
      },
      aiReport: "PATHOLOGY ALERT: Focal 4.2mm disc extrusion identified at L5-S1 left lateral recess. Neural conduction velocity along the sciatic trunk dropped by 38% with distal S1 dermatomal paresthesia."
    },
    {
      id: "sim_cardio_sprint",
      title: "High-Intensity Sprint Cardiovascular Surge",
      category: "Physiological Stress Test",
      targetIds: ["heart", "lungs", "gastrocnemius"],
      description: "Elevates cardiac stroke volume, accelerates lung minute ventilation to 120 L/min, and tracks lactic acid threshold buffering in the Triceps Surae / Gastrocnemius.",
      telemetryDeltas: {
        axialLoad: "620 N",
        flexionAngle: "34.5° ankle dorsiflexion",
        intradiscalPressure: "0.95 MPa",
        vibrationHz: "Heart rate: 178 BPM | SpO₂: 98%"
      },
      aiReport: "HEMODYNAMIC AUDIT: Coronary artery perfusion pressure elevated to 110 mmHg. Stroke volume peaked at 135 mL/beat. Calf venous muscle pump returning 3.8 L/min back to right atrium."
    },
    {
      id: "sim_cervical_whiplash",
      title: "Motor Vehicle Sudden Deceleration (Whiplash)",
      category: "Trauma Kinematics",
      targetIds: ["cervical_spine", "deltoid"],
      description: "Simulates high-G sagittal deceleration force triggering extreme rapid hyperextension followed by violent hyperflexion of C1-C7 vertebral segments.",
      telemetryDeltas: {
        axialLoad: "850 N shear force",
        flexionAngle: "-62.0° hyperextension shock",
        intradiscalPressure: "1.80 MPa instantaneous peak",
        vibrationHz: "75 Hz mechanoreceptor spike"
      },
      aiReport: "TRAUMA SURGICAL SUMMARY: C5-C6 anterior longitudinal ligament strain detected. No vertebral odontoid fracture observed on simulated stereotactic CT fluoroscopy."
    },
    {
      id: "sim_biceps_curl",
      title: "Biceps Peak Hypertrophy Contraction (350 N)",
      category: "Muscle Kinetic Isolation",
      targetIds: ["biceps_brachii", "humerus"],
      description: "Simulates heavy dumbbell curl with maximum forearm supination, isolating peak tensile tension on the distal bicipital tendon at radial tuberosity.",
      telemetryDeltas: {
        axialLoad: "350 N tensile pull",
        flexionAngle: "92.0° elbow flexion apex",
        intradiscalPressure: "0.65 MPa",
        vibrationHz: "52 Hz fast-twitch EMG"
      },
      aiReport: "KINETIC EVALUATION: Peak joint torque registered at 38.4 Nm. Bicipital aponeurosis intact; myocyte motor unit recruitment index reached 98.2% with active hyperemia."
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.ANATOMY_DATASET = ANATOMY_DATASET;
}
