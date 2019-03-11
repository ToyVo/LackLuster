class PauseScene extends Phaser.Scene {
  init () {}

  preload () {
    this.load.image('sky', 'assets/skies/space3.png');
  }

  create () {
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.resume = this.add.sprite(0, 0, 'sky').setInteractive();
    this.resume.setOrigin(0, 0);

    //resume game
    this.resume.on('pointerup', function () {
      this.scene.resume('GameScene');
      this.scene.stop('PauseScene');
    }, this);

    this.input.keyboard.on('keyup_ESC', function (event) {
      this.scene.resume('GameScene');
      this.scene.stop('PauseScene');
    }, this);
  }

  update () {
  }
}
