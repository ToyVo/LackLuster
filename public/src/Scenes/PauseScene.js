class PauseScene extends Phaser.Scene {
  init () {}

  preload () {
    this.load.image('sky', 'assets/skies/space3.png');
  }

  create () {
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.resume = this.add.sprite(0, 0, 'sky').setInteractive();
    this.resume.setOrigin(0, 0);

    this.resume.on('pointerdown', function () {
      this.scene.resume('GameScene');
      this.scene.stop('PauseScene');
    }, this);
  }

  update () {
    if (this.esc.isDown) {
      console.log('esc');
      this.scene.resume('GameScene');
      this.scene.stop('PauseScene');
    }
  }
}
