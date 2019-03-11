/* global centerX, centerY, centerGameObjects */
class StartScene extends Phaser.Scene {
  // Run when the scene is first loaded
  init () {
    // Show message that the assets are loading
    this.loadingText = this.add.text(centerX(this), centerY(this),
      'Loading ...', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    centerGameObjects([this.loadingText]);
  }

  preload () {
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('player', 'assets/characters/LL_maincharacter_01');
    this.load.image('player_outlined', 'assets/characters/LL_maincharacter_01_outlined');
  }

  create () {
    // Delete loading text
    this.loadingText.destroy();

    this.bg = this.add.sprite(0, 0, 'sky').setInteractive();
    this.bg.setOrigin(0, 0);

    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;
    let text = this.add.text(gameWidth / 2, gameHeight / 2, 'Lack Luster', {
      font: '40px Arial',
      fill: '#FFFFFF'
    });
    text.setOrigin(0.5, 0.5);
    text.depth = 1;

    let textBg = this.add.graphics();
    textBg.fillStyle(0x000000, 0.7);
    textBg.fillRect(gameWidth / 2 - text.width / 2 - 10, gameHeight / 2 - text.height / 2 - 10, text.width + 20, text.height + 20);

    this.bg.on('pointerup', function () {
      this.scene.start('GameScene');
    }, this);
  }
}
