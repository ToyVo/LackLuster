import Phaser from "phaser/dist/phaser.min.js";

export class PauseScene extends Phaser.Scene {
  create() {
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    const gameHeight = this.sys.game.config.height;
    const gameWidth = this.sys.game.config.width;
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.4);
    background.fillRect(0, 0, gameWidth, gameHeight);

    const resume = this.add
      .text(gameWidth / 3, (3 * gameHeight) / 4, "Resume", {
        fontFamily: "Pixeled",
        fill: "#FFFFFF",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    const quit = this.add
      .text((2 * gameWidth) / 3, (3 * gameHeight) / 4, "Quit", {
        fontFamily: "Pixeled",
        fill: "#FFFFFF",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    const leftX = resume.x;
    const leftY = resume.y + 70;
    this.add
      .graphics({ fillStyle: { color: 0xff0000 } })
      .fillCircle(leftX, leftY, 30);
    this.add
      .text(leftX, leftY, "LEFT", {
        fontFamily: "Pixeled",
        fontSize: "12px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    const rightX = quit.x;
    const rightY = quit.y + 70;
    this.add
      .graphics({ fillStyle: { color: 0x0000ff } })
      .fillCircle(rightX, rightY, 30);
    this.add
      .text(rightX, rightY, "RIGHT", {
        fontFamily: "Pixeled",
        fontSize: "12px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    // resume game
    resume.on(
      "pointerup",
      function () {
        this.scene.resume("GameScene");
        this.scene.stop("PauseScene");
      },
      this,
    );

    this.input.gamepad.on(
      "up",
      function (button) {
        if (button.index === 0) {
          this.scene.resume("GameScene");
          this.scene.stop("PauseScene");
        }
      },
      this,
    );

    this.input.keyboard.on(
      "keyup-ESC",
      function () {
        this.scene.resume("GameScene");
        this.scene.stop("PauseScene");
      },
      this,
    );

    // Quit Game
    this.input.gamepad.on(
      "up",
      function (button) {
        if (button.index === 1) {
          this.scene.start("StartScene");
          this.scene.stop("GameScene");
        }
      },
      this,
    );

    quit.on(
      "pointerup",
      function () {
        this.scene.start("StartScene");
        this.scene.stop("GameScene");
      },
      this,
    );

    // button effects
    quit.on(
      "pointerover",
      function () {
        quit.tint = Math.random() * 0xffffff;
      },
      this,
    );
    quit.on(
      "pointerout",
      function () {
        quit.clearTint();
      },
      this,
    );
    resume.on(
      "pointerover",
      function () {
        resume.tint = Math.random() * 0xffffff;
      },
      this,
    );
    resume.on(
      "pointerout",
      function () {
        resume.clearTint();
      },
      this,
    );
  }

  update() {
    this.input.update();
  }
}
