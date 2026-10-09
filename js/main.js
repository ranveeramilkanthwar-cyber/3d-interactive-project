/**
 * HOLOBIO 3D - Application Entrypoint
 * Bootstraps the 3D Hologram Engine and HUD Controller.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Initializing HOLOBIO 3D - Biomechanical Hologram Diagnostic Suite...");

  // Verify Three.js availability
  if (typeof THREE === 'undefined') {
    console.error("Three.js failed to load!");
    return;
  }

  // 1. Initialize Hologram 3D Engine
  const engine = new HoloEngine('threejs-viewport');

  // 2. Initialize HUD Controller
  const hud = new HudController(engine, window.ANATOMY_DATASET);

  // Store globally for debugging or console access
  window.holoApp = {
    engine: engine,
    hud: hud
  };

  console.log("HOLOBIO 3D initialized successfully.");
});
