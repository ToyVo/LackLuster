import Phaser from "phaser/dist/phaser.min.js";

export class CreditsScene extends Phaser.Scene {
  create() {
    const gameHeight = this.sys.game.config.height;
    const gameWidth = this.sys.game.config.width;
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.4);
    background.fillRect(0, 0, gameWidth, gameHeight);

    const backButton = this.add
      .text(gameWidth / 2, (3 * gameHeight) / 4, "Back", {
        fontFamily: "Pixeled",
        fill: "#FFFFFF",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    backButton.on(
      "pointerup",
      function () {
        this.scene.start("StartScene");
        this.scene.stop("CreditsScene");
      },
      this,
    );

    backButton.on(
      "pointerover",
      function () {
        backButton.tint = Math.random() * 0xffffff;
      },
      this,
    );
    backButton.on(
      "pointerout",
      function () {
        backButton.clearTint();
      },
      this,
    );

    this.add
      .text(
        gameWidth / 2,
        gameHeight / 2,
        "Collin Diekvoss, Programmer\nAndrew Frideres, Programmer\nJoshua Haakana, Artist\nLex Klusman, Artist",
        {
          fontFamily: "Pixeled",
          align: "center",
          fill: "#FFFFFF",
        },
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1);
  }
}
