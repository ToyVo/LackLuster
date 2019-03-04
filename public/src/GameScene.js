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

    // key inputs
    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // Bring the debug draw layer to the top
    if (__DEV__) {
      this.debugDraw.bringToTop();
    }
  }
}

// Ensure this is a globally accessible class
window.GameScene = GameScene;
