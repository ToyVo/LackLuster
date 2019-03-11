/* global centerX, centerY, centerGameObjects, Player */

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

    // Camera
    this.gameCamera = this.cameras.main;
    this.gameCamera.setBackgroundColor('#FF8');
    this.gameCamera.setViewport(0, 0, 1920, 1080);
    this.cameras.main.setBounds(0, 0, 4800, 2700, true);

    // Physics
    this.physics.world.setBounds(0, 0, 4800, 2700, true, true, true, true);

    // other objects
    this.physics.add.sprite(50, 50, '');

    // Player
    this.player = new Player(this, 0, 0, '');
    this.gameCamera.startFollow(this.player, false, 0.5, 0.5);

    // key inputs
    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };

    // Bring the debug draw layer to the top
    if (__DEV__) {
      this.debugDraw.bringToTop();
    }
  }

  update (time, delta) {
    this.player.update(this.keys, time, delta);
  }
}

// Ensure this is a globally accessible class
window.GameScene = GameScene;
