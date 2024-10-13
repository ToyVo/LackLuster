import Phaser from "phaser/dist/phaser.min.js";

export class GameOver extends Phaser.Scene {
  preload() {}

  create() {
    const gameHeight = this.sys.game.config.height;
    const gameWidth = this.sys.game.config.width;
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.4);
    background.fillRect(0, 0, gameWidth, gameHeight);

    this.add
      .text(gameWidth / 2, gameHeight / 2 - 250, "Game Over", {
        fontFamily: "Pixeled",
        fontSize: "85px",
        fill: "#dddddd",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    const retryText = this.add
      .text(gameWidth / 2, gameHeight / 2 + 100, "Retry?", {
        fontFamily: "Pixeled",
        fill: "#dddddd",
        align: "center",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    retryText.on(
      "pointerover",
      function () {
        retryText.tint = Math.random() * 0xffffff;
      },
      this,
    );
    retryText.on(
      "pointerout",
      function () {
        retryText.clearTint();
      },
      this,
    );
    retryText.on(
      "pointerup",
      function () {
        // Ideally here we would have a checkpoint we could load or a way to detect
        // And run different scenes based off progression
        this.scene.resume("GameScene", 1);
        this.scene.stop("GameOver");
      },
      this,
    );

    this.input.gamepad.on(
      "up",
      function () {
        this.scene.resume("GameScene", "retry");
        this.scene.stop("GameOver");
      },
      this,
    );
  }

  update() {
    this.input.update();
  }
}
