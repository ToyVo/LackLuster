/* global centerX, centerY, centerGameObjects */

class GameScene extends Phaser.Scene {
  // Run when the scene is first loaded
  init () {
    // Show message that the assets are loading
    this.loadingText = this.add.text(centerX(this), centerY(this),
      'Loading ...', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    centerGameObjects([this.loadingText]);
  }

  // Pre-load function: queues all needed assets for downloading
  // (they are actually downloaded asynchronously, prior to 'create')
  preload () {
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  // Run after all loading (queued in preload) is finished
  create () {
    // Delete loading text
    this.loadingText.destroy();

    // Background image
    let sky = this.add.image(0, 0, 'sky');
    sky.setOrigin(0.0, 0.0);
    sky.setScale(window.CONFIG.gameWidth / sky.width, window.CONFIG.gameHeight / sky.height);

    // Particle emitter
    let particles = this.add.particles('red');
    let emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    // Bouncing phaser 3 logo
    let logo = this.physics.add.image(400, 100, 'logo');
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    logo.setScale(0.5);

    // Make the emitter follow the logo
    emitter.startFollow(logo);

    // Bring the debug draw layer to the top
    if (__DEV__) {
      this.debugDraw.bringToTop();
    }
  }
}

// Ensure this is a globally accessible class
window.GameScene = GameScene;
