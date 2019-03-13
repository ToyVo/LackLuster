class PauseScene extends Phaser.Scene {
  init () {}

  preload () {
  }

  create () {
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    let gameHeight = this.sys.game.config.height;
    let gameWidth = this.sys.game.config.width;
    let text = this.add.text(gameWidth / 2, gameHeight / 4, 'Resumedsdsdsdsds', {
      font: '40px Arial',
      fill: '#FFFFFF'
    }).setInteractive();
    text.setOrigin(0.5, 0.5);
    text.setDepth(1);

    let textBg = this.add.graphics();
    textBg.fillStyle(0x000000, 0.7);
    textBg.fillRect(gameWidth / 2 - text.width / 2 - 10, gameHeight / 4 - text.height / 2 - 10, text.width + 20, text.height + 20);

    //resume game
    text.on('pointerup', function () {
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
