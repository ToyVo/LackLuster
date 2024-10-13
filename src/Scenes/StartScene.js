import Phaser from "phaser/dist/phaser.min.js";
import { centerGameObjects, centerX, centerY } from "../utils";
import LL_tiled_tiles from "../assets/sprites/LL_tiled_tiles.png";
import LL_tiled_light_tiles from "../assets/sprites/LL_tiled_light_tiles.png";
import map from "../assets/json/LL_final_map.json";
import Blocker from "../assets/sprites/LL_Blocker.png";
import web from "../assets/sprites/web.png";
import Tile from "../assets/sprites/Trap.png";
import boul from "../assets/sprites/boulder.png";
import health_orb from "../assets/sprites/health_orb.png";
import player_front from "../assets/player/player_front.png";
import player_right from "../assets/player/player_right.png";
import player_back from "../assets/player/player_back.png";
import player_left from "../assets/player/player_left.png";
import player_walk_front_sheet from "../assets/player/player_walk_front.png";
import player_walk_back_sheet from "../assets/player/player_walk_back.png";
import player_walk_left_sheet from "../assets/player/player_walk_left.png";
import player_walk_right_sheet from "../assets/player/player_walk_right.png";
import player_dash_anim_down from "../assets/spritesheets/Dash_Down.png";
import player_dash_anim_up from "../assets/spritesheets/Dash_Up.png";
import player_dash_anim_left from "../assets/spritesheets/Dash_Left.png";
import player_dash_anim_right from "../assets/spritesheets/Dash_Right.png";
import slime_black_walking from "../assets/spritesheets/slime_walking_black.png";
import spikeT from "../assets/spritesheets/Spike.png";
import light_orb from "../assets/spritesheets/light_ORB.png";
import sparkle from "../assets/spritesheets/sparkle.png";
import final_orb_activation_sheet from "../assets/spritesheets/Orb_Activation.png";
import final_orb_idle_sheet from "../assets/spritesheets/Orb_Idle.png";
import boulderUp from "../assets/spritesheets/Boulder_Upwards.png";
import boulderDown from "../assets/spritesheets/Boulder_Downwards.png";
import dash from "../assets/audio/dash.wav";
import playerH from "../assets/audio/slimeHurt.wav";
import mainTheme from "../assets/audio/mainTheme.wav";
import spike from "../assets/audio/spike.wav";
import playerD from "../assets/audio/pDeath.wav";
import walk from "../assets/audio/footsteps.wav";
import powerUp from "../assets/audio/pillarCollide.wav";
import levelOne from "../assets/audio/Level3.wav";
import levelTwo from "../assets/audio/Level2.wav";
import levelThree from "../assets/audio/Level1.wav";

export class StartScene extends Phaser.Scene {
  // Run when the scene is first loaded
  init() {
    // Show message that the assets are loading
    this.loadingText = this.add.text(
      centerX(this),
      centerY(this),
      "Loading ...",
      {
        fontFamily: "Pixeled",
        fontSize: "16px",
        fill: "#dddddd",
        align: "center",
      },
    );
    centerGameObjects([this.loadingText]);
  }

  preload() {
    this.load.image("LL_tiled_tiles", LL_tiled_tiles);
    this.load.image("LL_tiled_light_tiles", LL_tiled_light_tiles);
    this.load.tilemapTiledJSON("map", map);
    // End Tiled Assets
    this.load.spritesheet("slime_black_walking", slime_black_walking, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("Blocker", Blocker);
    this.load.image("web", web);
    this.load.image("Tile", Tile);
    this.load.image("boul", boul);
    this.load.image("health_orb", health_orb);

    /* Player AKA THICC SNACC */
    this.load.image("player_front", player_front);
    this.load.image("player_right", player_right);
    this.load.image("player_back", player_back);
    this.load.image("player_left", player_left);
    this.load.spritesheet("player_walk_front_sheet", player_walk_front_sheet, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_walk_back_sheet", player_walk_back_sheet, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_walk_left_sheet", player_walk_left_sheet, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_walk_right_sheet", player_walk_right_sheet, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_dash_anim_down", player_dash_anim_down, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_dash_anim_up", player_dash_anim_up, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_dash_anim_left", player_dash_anim_left, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet("player_dash_anim_right", player_dash_anim_right, {
      frameWidth: 14,
      frameHeight: 24,
      margin: 1,
      spacing: 2,
    });

    /* Misc Spritesheets Below */
    this.load.spritesheet("slime_black_walking", slime_black_walking, {
      frameWidth: 32,
      frameHeight: 32,
      spacing: 1,
    });
    this.load.spritesheet("spikeT", spikeT, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("light_orb", light_orb, {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("sparkle", sparkle, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(
      "final_orb_activation_sheet",
      final_orb_activation_sheet,
      { frameWidth: 96, frameHeight: 128 },
    );
    this.load.spritesheet("final_orb_idle_sheet", final_orb_idle_sheet, {
      frameWidth: 96,
      frameHeight: 128,
    });
    this.load.spritesheet("boulderUp", boulderUp, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("boulderDown", boulderDown, {
      frameWidth: 32,
      frameHeight: 32,
    });

    /* Audio */
    this.load.audio("dash", dash);
    this.load.audio("playerH", playerH);
    this.load.audio("mainTheme", mainTheme);
    this.load.audio("spike", spike);
    this.load.audio("playerD", playerD);
    this.load.audio("walk", walk);
    this.load.audio("powerUp", powerUp);
    this.load.audio("levelOne", levelOne); // Intentional swap
    this.load.audio("levelTwo", levelTwo);
    this.load.audio("levelThree", levelThree);
  }

  create() {
    // Delete loading text
    this.loadingText.destroy();

    const gameHeight = this.sys.game.config.height;
    const gameWidth = this.sys.game.config.width;
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.4);
    background.fillRect(0, 0, gameWidth, gameHeight);

    // Title
    this.add
      .text(gameWidth / 2, gameHeight / 4, "LACK LUSTER", {
        fontFamily: "Pixeled",
        fontSize: "80px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    // Start Button(s)
    const start = this.add
      .text(gameWidth / 2, (3 * gameHeight) / 4, "START", {
        fontFamily: "Pixeled",
        fontSize: "30px",
        fill: "#FFFFFF",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    this.blinkTimer = 0;
    this.anyButton = this.add
      .text(start.x, start.y + 120, "PRESS ANY BUTTON TO START", {
        fontFamily: "Pixeled",
        fontSize: "12px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    const leftX = start.x - 40;
    const leftY = start.y + 70;
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

    const rightX = start.x + 40;
    const rightY = start.y + 70;
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

    // Credits Button
    const credits = this.add
      .text(gameWidth / 3, (3 * gameHeight) / 4, "CREDITS", {
        fontFamily: "Pixeled",
        fontSize: "30px",
        fill: "#FFFFFF",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    // Controls Button
    const controls = this.add
      .text((2 * gameWidth) / 3, (3 * gameHeight) / 4, "CONTROLS", {
        fontFamily: "Pixeled",
        fontSize: "30px",
        fill: "#FFFFFF",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    // Scene Switching
    start.on(
      "pointerup",
      function () {
        this.scene.resume("GameScene");
        this.scene.stop("StartScene");
      },
      this,
    );

    this.input.gamepad.on(
      "up",
      function () {
        this.scene.resume("GameScene");
        this.scene.stop("StartScene");
      },
      this,
    );

    this.scene.run("GameScene");
    this.scene.bringToTop("StartScene");
    this.scene.pause("GameScene");

    controls.on(
      "pointerup",
      function () {
        this.scene.run("ControlsScene");
        this.scene.stop("StartScene");
      },
      this,
    );

    credits.on(
      "pointerup",
      function () {
        this.scene.run("CreditsScene");
        this.scene.stop("StartScene");
      },
      this,
    );

    // Button highlighting
    start.on(
      "pointerover",
      function () {
        start.tint = Math.random() * 0xffffff;
      },
      this,
    );
    start.on(
      "pointerout",
      function () {
        start.clearTint();
      },
      this,
    );
    credits.on(
      "pointerover",
      function () {
        credits.tint = Math.random() * 0xffffff;
      },
      this,
    );
    credits.on(
      "pointerout",
      function () {
        credits.clearTint();
      },
      this,
    );
    controls.on(
      "pointerover",
      function () {
        controls.tint = Math.random() * 0xffffff;
      },
      this,
    );
    controls.on(
      "pointerout",
      function () {
        controls.clearTint();
      },
      this,
    );
  }

  update(time, delta) {
    this.input.update();
    this.blinkTimer += delta;
    if (this.blinkTimer >= 1000) {
      this.blinkTimer = 0;
      this.anyButton.visible = !this.anyButton.visible;
    }
  }
}
