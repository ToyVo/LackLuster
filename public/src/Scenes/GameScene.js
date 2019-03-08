/* global centerX, centerY, centerGameObjects */

class GameScene extends Phaser.Scene {
    // Pre-load function: queues all needed assets for downloading
  // (they are actually downloaded asynchronously, prior to 'create')
  preload () {
    this.load.image('player', 'assets/characters/LL_maincharacter_01.png');
  }

  // Run after all loading (queued in preload) is finished
  create () {
    // Camera
    this.gameCamera = this.cameras.main;
    this.gameCamera.setBackgroundColor('#434343');
    this.gameCamera.setViewport(0,0,1920,1080);
    this.cameras.main.setBounds(0,0,4800,2700,true);

    // Physics
    this.physics.world.setBounds(0,0,4800,2700, true, true,true,true);

    // other objects
    this.physics.add.sprite(50,50,'');

    // Player
    this.player = new Player(this, 0, 0, 'player');
    this.player.setScale(5,5);
    this.gameCamera.startFollow(this.player, false, 0.5, 0.5);

    // key inputs
    this.keys = {
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
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

  update(time, delta)
  {
    if (this.keys.esc.isDown) {
      this.scene.run('PauseScene');
      this.scene.bringToTop('PauseScene');
      this.scene.pause('GameScene');
    }

    this.player.update(this.keys, time, delta);
    //console.log(this.player.rollCooldown);
    console.log(this.player.body.acceleration);
  }
}

// Ensure this is a globally accessible class
window.GameScene = GameScene;
