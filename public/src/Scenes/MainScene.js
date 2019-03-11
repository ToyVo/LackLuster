/* global centerX, centerY, centerGameObjects */
class MainScene extends Phaser.Scene {
  // Run when the scene is first loaded
  init () {
    // Show message that the assets are loading
    this.loadingText = this.add.text(centerX(this), centerY(this),
      'Loading ...', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    centerGameObjects([this.loadingText]);
  }

  preload () {
    this.load.image('sky', 'assets/skies/space3.png');
    //this.load.image('player', 'assets/pics/LL_char.png');
	  //this.load.image('pFront', 'assets/pics/LL_front_tester.png');
	  //this.load.image('pBack', 'assets/pics/LL_back_tester.png');
	  //this.load.image('pLeft', 'assets/pics/LL_left_tester.png');
	  //this.load.image('pRight', 'assets/pics/LL_right_tester.png');
	 
	  /*Spritesheets Below*/
	  //this.load.spritesheet('frameTest','assets/pics/LL_4frame_tester.png',
		//{ frameWidth: 32, frameHeight: 32 });
  }

  create () {
    // Delete loading text
    this.loadingText.destroy();

    this.bg = this.add.sprite(0, 0, 'sky').setInteractive();
    this.bg.setOrigin(0, 0);

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

    this.bg.on('pointerdown', function () {
      this.scene.start('GameScene');
    }, this);
  }
}
