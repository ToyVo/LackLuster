export class CreditsScene extends Phaser.Scene {
  constructor() {
    super('CreditsScene');
  }

  create() {
    const gameHeight: number = +this.sys.game.config.height;
    const gameWidth: number = +this.sys.game.config.width;
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.4);
    background.fillRect(0, 0, gameWidth, gameHeight);

    const backButton = this.add
      .text(gameWidth / 2, (3 * gameHeight) / 4, 'Back', {
        fontFamily: 'font1',
        color: '#FFFFFF',
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    backButton.on(
      'pointerup',
      function () {
        this.scene.start('StartScene');
        this.scene.stop('CreditsScene');
      },
      this
    );

    backButton.on(
      'pointerover',
      function () {
        backButton.tint = Math.random() * 0xffffff;
      },
      this
    );
    backButton.on(
      'pointerout',
      function () {
        backButton.clearTint();
      },
      this
    );

    const creditsText = this.add
      .text(
        gameWidth / 2,
        gameHeight / 2,
        'Collin Diekvoss, Programmer\nAndrew Frideres, Programmer\nJoshua Haakana, Artist\nLex Klusman, Artist',
        {
          fontFamily: 'font1',
          align: 'center',
          color: '#FFFFFF',
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1);
  }
}
