/**
 * HOLOBIO 3D - HUD Controller
 * Manages user interactions, UI state, dataset filtering,
 * dossier panel rendering, and the AI Holographic Simulation modal.
 */

class HudController {
  constructor(engine, dataset) {
    this.engine = engine;
    this.data = dataset;
    this.currentSystemFilter = "all";
    this.searchQuery = "";
    this.activeItemId = "cranium";

    this.init();
  }

  init() {
    this.bindHeaderControls();
    this.bindLayerControls();
    this.bindSystemTabs();
    this.bindSearch();
    this.bindCameraPresets();
    this.bindExplodeSlider();
    this.bindSpineScroller();
    this.bindAiModal();

    // Engine callbacks
    this.engine.callbacks.onSelect = (itemId) => {
      this.displayPartDossier(itemId);
      this.highlightListItem(itemId);
    };

    // Render initial list and dossier
    this.renderPartsList();
    this.displayPartDossier(this.activeItemId);
  }

  // ==========================================
  // HEADER & GLOBAL CONTROLS
  // ==========================================
  bindHeaderControls() {
    // Theme Selector
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        document.body.className = `theme-${theme}`;
        this.engine.setTheme(theme);
        if (window.HoloAudio) window.HoloAudio.playScanBlip();
      });
    }

    // Audio SFX Toggle
    const audioBtn = document.getElementById('btn-audio-toggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (window.HoloAudio) {
          const muted = window.HoloAudio.toggleMute();
          audioBtn.classList.toggle('active', !muted);
          audioBtn.querySelector('.material-symbols-outlined').textContent = muted ? 'volume_off' : 'volume_up';
        }
      });
    }

    // Turntable Rotate Toggle
    const rotateBtn = document.getElementById('btn-rotate-toggle');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.engine.isAutoRotating = !this.engine.isAutoRotating;
        rotateBtn.classList.toggle('active', this.engine.isAutoRotating);
        if (window.HoloAudio) window.HoloAudio.playScanBlip();
      });
    }

    // Wireframe Toggle
    const wireBtn = document.getElementById('btn-wireframe-toggle');
    if (wireBtn) {
      let wire = false;
      wireBtn.addEventListener('click', () => {
        wire = !wire;
        this.engine.setWireframe(wire);
        wireBtn.classList.toggle('active', wire);
        if (window.HoloAudio) window.HoloAudio.playScanBlip();
      });
    }

    // AI Simulator Modal Trigger Button
    const aiBtn = document.getElementById('btn-open-ai-modal');
    if (aiBtn) {
      aiBtn.addEventListener('click', () => {
        this.openAiModal();
      });
    }
  }

  // ==========================================
  // LAYER VISIBILITY CONTROLS
  // ==========================================
  bindLayerControls() {
    const layerButtons = document.querySelectorAll('[data-layer]');
    layerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.getAttribute('data-layer');
        const isActive = btn.classList.toggle('active');
        this.engine.setLayerVisibility(layer, isActive);
        if (window.HoloAudio) window.HoloAudio.playLayerWhoosh();
      });
    });
  }

  // ==========================================
  // SYSTEM TABS & SEARCH
  // ==========================================
  bindSystemTabs() {
    const tabs = document.querySelectorAll('.system-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentSystemFilter = tab.getAttribute('data-system');
        this.renderPartsList();
        if (window.HoloAudio) window.HoloAudio.playScanBlip();
      });
    });
  }

  bindSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderPartsList();
      });
    }
  }

  renderPartsList() {
    const listContainer = document.getElementById('parts-list-container');
    if (!listContainer) return;

    let items = this.data.items;

    // Filter by system
    if (this.currentSystemFilter !== 'all') {
      items = items.filter(it => it.system === this.currentSystemFilter);
    }

    // Filter by search query
    if (this.searchQuery) {
      items = items.filter(it => 
        it.name.toLowerCase().includes(this.searchQuery) ||
        it.latinName.toLowerCase().includes(this.searchQuery) ||
        it.summary.toLowerCase().includes(this.searchQuery) ||
        it.region.toLowerCase().includes(this.searchQuery)
      );
    }

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-mono);">
          NO ANATOMICAL STRUCTURE FOUND
        </div>
      `;
      return;
    }

    listContainer.innerHTML = items.map(item => `
      <div class="part-card ${item.id === this.activeItemId ? 'active' : ''}" data-id="${item.id}">
        <div class="part-card-left">
          <span class="material-symbols-outlined part-card-icon">${item.icon || 'view_in_ar'}</span>
          <div>
            <div class="part-card-name">${item.name}</div>
            <div class="part-card-latin">${item.latinName}</div>
          </div>
        </div>
        <span class="part-card-tag">${item.system.toUpperCase()}</span>
      </div>
    `).join('');

    // Attach click listeners
    listContainer.querySelectorAll('.part-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.selectItem(id);
      });
    });
  }

  selectItem(itemId) {
    this.activeItemId = itemId;
    this.highlightListItem(itemId);
    this.displayPartDossier(itemId);
    this.engine.selectPart(itemId);
  }

  highlightListItem(itemId) {
    const cards = document.querySelectorAll('.part-card');
    cards.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-id') === itemId);
    });
  }

  // ==========================================
  // RIGHT DOSSIER RENDERING
  // ==========================================
  displayPartDossier(itemId) {
    const item = this.data.items.find(it => it.id === itemId);
    const container = document.getElementById('dossier-content');
    if (!item || !container) return;

    const sysInfo = this.data.systems[item.system] || {};

    let biomechHtml = "";
    if (item.biomechanics) {
      biomechHtml = Object.entries(item.biomechanics).map(([k, v]) => `
        <div class="metric-box">
          <span class="metric-title">${k.replace(/([A-Z])/g, ' $1')}</span>
          <span class="metric-value">${v}</span>
        </div>
      `).join('');
    }

    let pathologiesHtml = "";
    if (item.pathologies && item.pathologies.length) {
      pathologiesHtml = `
        <div class="pathology-box">
          <div class="pathology-title">
            <span class="material-symbols-outlined" style="font-size: 16px;">warning</span>
            Clinical Pathologies & Trauma
          </div>
          ${item.pathologies.map(p => `
            <div class="pathology-item">
              <span class="material-symbols-outlined" style="font-size: 13px; margin-top: 1px;">error_outline</span>
              <span>${p}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    let extraDetailsHtml = "";
    if (item.system === 'muscular') {
      extraDetailsHtml = `
        <div class="info-section-card">
          <div class="info-section-title"><span class="material-symbols-outlined" style="font-size: 15px;">link</span>Attachments & Innervation</div>
          <div class="info-section-body">
            <strong>Origin:</strong> ${item.origin || 'N/A'}<br/>
            <strong>Insertion:</strong> ${item.insertion || 'N/A'}<br/>
            <strong>Innervation:</strong> ${item.innervation || 'N/A'}
          </div>
        </div>
      `;
    } else if (item.system === 'skeletal') {
      extraDetailsHtml = `
        <div class="info-section-card">
          <div class="info-section-title"><span class="material-symbols-outlined" style="font-size: 15px;">hub</span>Articulations & Joint Mechanics</div>
          <div class="info-section-body">
            <strong>Type:</strong> ${item.boneType || 'Osseous bone'}<br/>
            <strong>Articulating Joints:</strong> ${(item.joints || []).join(', ') || 'N/A'}
          </div>
        </div>
      `;
    } else if (item.system === 'organs') {
      extraDetailsHtml = `
        <div class="info-section-card">
          <div class="info-section-title"><span class="material-symbols-outlined" style="font-size: 15px;">vital_signs</span>Physiological Hemodynamics</div>
          <div class="info-section-body">
            <strong>Classification:</strong> ${item.organType || 'Visceral Organ'}<br/>
            <strong>Arterial Supply:</strong> ${(item.vascularNerve && item.vascularNerve.arterial) || 'Systemic capillary network'}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="dossier-card">
        <div class="dossier-tag-row">
          <span class="dossier-system-badge">
            <span class="pulse-dot"></span>
            ${sysInfo.name || item.system.toUpperCase()}
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--secondary);">
            X:${item.coordinates.x.toFixed(1)} Y:${item.coordinates.y.toFixed(1)} Z:${item.coordinates.z.toFixed(1)}
          </span>
        </div>

        <div>
          <h2 class="dossier-title">${item.name}</h2>
          <div class="dossier-latin">${item.latinName}</div>
        </div>

        <p class="dossier-summary">${item.description}</p>

        <!-- Biomechanical Telemetry Grid -->
        <div class="telemetry-grid">
          ${biomechHtml}
        </div>

        <!-- System-Specific Details -->
        ${extraDetailsHtml}

        <!-- Clinical Pathologies -->
        ${pathologiesHtml}

        <!-- Fascinating Trivia -->
        ${item.funFact ? `
          <div class="trivia-box">
            <div class="trivia-title">
              <span class="material-symbols-outlined" style="font-size: 16px;">lightbulb</span>
              Anatomical Fact
            </div>
            <div class="trivia-text">"${item.funFact}"</div>
          </div>
        ` : ''}

        <!-- Action Export Button -->
        <button class="btn-action" style="width: 100%; justify-content: center; margin-top: 0.5rem;" id="btn-export-dicom">
          <span class="material-symbols-outlined" style="font-size: 18px;">download</span>
          Export 3D DICOM / STL Tomography
        </button>
      </div>
    `;

    const exportBtn = document.getElementById('btn-export-dicom');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        alert(`Generating high-resolution stereotactic 3D STL & DICOM dataset for: ${item.name}...\n\nSpatial Matrix Coordinates: [${item.coordinates.x}, ${item.coordinates.y}, ${item.coordinates.z}]\nPhysiological telemetry package prepared successfully.`);
      });
    }
  }

  // ==========================================
  // CAMERA PRESETS & EXPLODE SLIDER
  // ==========================================
  bindCameraPresets() {
    const viewButtons = document.querySelectorAll('[data-view]');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.getAttribute('data-view');
        this.engine.setCameraView(view);
        if (window.HoloAudio) window.HoloAudio.playScanBlip();
      });
    });
  }

  bindExplodeSlider() {
    const slider = document.getElementById('explode-slider');
    const labelVal = document.getElementById('explode-value');
    if (slider && labelVal) {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        labelVal.textContent = `${Math.round(val * 100)}%`;
        this.engine.setExplode(val);
      });
    }
  }

  // ==========================================
  // BOTTOM SPINE SCROLLER (Stitch feature)
  // ==========================================
  bindSpineScroller() {
    const pills = document.querySelectorAll('.spine-pill-btn');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const seg = pill.getAttribute('data-segment');

        if (seg === 'cervical') {
          this.selectItem('cervical_spine');
        } else if (seg === 'thoracic') {
          this.selectItem('thoracic_cage');
        } else if (seg === 'lumbar') {
          this.selectItem('lumbar_spine');
        } else if (seg === 'sacral') {
          this.selectItem('pelvis');
        }
      });
    });
  }

  // ==========================================
  // AI HOLOGRAM GENERATOR / SIMULATOR MODAL
  // ==========================================
  bindAiModal() {
    const overlay = document.getElementById('ai-modal-overlay');
    const closeBtn = document.getElementById('btn-close-ai-modal');
    const simList = document.getElementById('sim-scenarios-list');
    const promptInput = document.getElementById('custom-ai-prompt');
    const runBtn = document.getElementById('btn-run-ai-prompt');
    const outputBox = document.getElementById('ai-output-stream');

    if (!overlay) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    // Populate pre-trained scenarios
    if (simList && this.data.aiSimulations) {
      simList.innerHTML = this.data.aiSimulations.map(sim => `
        <div class="sim-scenario-card" data-sim-id="${sim.id}">
          <div class="sim-scenario-title">${sim.title}</div>
          <div class="sim-scenario-sub">${sim.category}</div>
        </div>
      `).join('');

      simList.querySelectorAll('.sim-scenario-card').forEach(card => {
        card.addEventListener('click', () => {
          const simId = card.getAttribute('data-sim-id');
          this.executeSimulation(simId);
        });
      });
    }

    // Run custom prompt
    if (runBtn && promptInput) {
      runBtn.addEventListener('click', () => {
        const query = promptInput.value.trim();
        if (query) {
          this.executeCustomSimulation(query);
        }
      });
      promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = promptInput.value.trim();
          if (query) this.executeCustomSimulation(query);
        }
      });
    }
  }

  openAiModal() {
    const overlay = document.getElementById('ai-modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      if (window.HoloAudio) window.HoloAudio.playLaserLock();
    }
  }

  executeSimulation(simId) {
    const sim = this.data.aiSimulations.find(s => s.id === simId);
    if (!sim) return;

    const outputBox = document.getElementById('ai-output-stream');
    if (outputBox) {
      outputBox.innerHTML = `<em>> Initializing Neural Bio-Simulator weights...</em><br/><em>> Simulating: ${sim.title}</em>`;
    }

    if (window.HoloAudio) window.HoloAudio.playLaserLock();

    // Select primary target
    if (sim.targetIds && sim.targetIds.length) {
      this.selectItem(sim.targetIds[0]);
    }

    setTimeout(() => {
      if (outputBox) {
        outputBox.innerHTML = `
          <strong style="color: var(--primary);">[SIMULATION ACTIVE: ${sim.category.toUpperCase()}]</strong><br/>
          ${sim.aiReport}<br/><br/>
          <span style="color: var(--secondary);">AXIAL DELTA: ${sim.telemetryDeltas.axialLoad} | FLEXION: ${sim.telemetryDeltas.flexionAngle} | PRESSURE: ${sim.telemetryDeltas.intradiscalPressure}</span>
        `;
      }
      if (window.HoloAudio) window.HoloAudio.playScanBlip();
    }, 600);
  }

  executeCustomSimulation(userPrompt) {
    const outputBox = document.getElementById('ai-output-stream');
    if (outputBox) {
      outputBox.innerHTML = `<em>> Synthesizing prompt: "${userPrompt}"...</em><br/><em>> Calculating musculoskeletal kinematic vectors...</em>`;
    }

    if (window.HoloAudio) window.HoloAudio.playLaserLock();

    // Scan prompt for keyword matching to isolate target
    const lower = userPrompt.toLowerCase();
    let targetId = "lumbar_spine";
    if (lower.includes("heart") || lower.includes("cardio")) targetId = "heart";
    else if (lower.includes("lung") || lower.includes("breath")) targetId = "lungs";
    else if (lower.includes("brain") || lower.includes("cranial")) targetId = "brain";
    else if (lower.includes("bicep") || lower.includes("arm")) targetId = "biceps_brachii";
    else if (lower.includes("quad") || lower.includes("leg") || lower.includes("knee")) targetId = "quadriceps";
    else if (lower.includes("glute") || lower.includes("hip")) targetId = "gluteus_maximus";
    else if (lower.includes("cervical") || lower.includes("neck")) targetId = "cervical_spine";
    else if (lower.includes("sciatic") || lower.includes("nerve")) targetId = "sciatic_nerve";

    this.selectItem(targetId);

    setTimeout(() => {
      if (outputBox) {
        outputBox.innerHTML = `
          <strong style="color: var(--primary);">[AI NEURAL BIO-SCAN COMPLETE]</strong><br/>
          Prompt calibrated against anatomical telemetry database.<br/>
          Target Structure: <strong>${targetId.toUpperCase()}</strong> | Kinetic Load Factor: <strong>1.48x Dynamic Peak</strong><br/>
          Holographic deformation field successfully rendered in active 3D viewport.
        `;
      }
      if (window.HoloAudio) window.HoloAudio.playScanBlip();
    }, 700);
  }
}

if (typeof window !== 'undefined') {
  window.HudController = HudController;
}
