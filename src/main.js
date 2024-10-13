import Phaser from "phaser/dist/phaser.min.js";
import PhaserDebugDrawPlugin from "phaser-plugin-debug-draw";
import UpdatePlugin from "phaser-plugin-update";
import { GameOver } from "./Scenes/GameOver";
import { PauseScene } from "./Scenes/PauseScene";
import { GameScene } from "./Scenes/GameScene";
import { ControlsScene } from "./Scenes/ControlsScene";
import { CreditsScene } from "./Scenes/CreditsScene";
import { StartScene } from "./Scenes/StartScene";
import { CONFIG } from "./config";
import "./style.css";
import "./assets/Font/Pixeled.ttf";

// Configure any plugins
const scenePlugins = [
  {
    key: "updatePlugin",
    plugin: UpdatePlugin,
    mapping: "updates",
  },
];

// Add the debugDraw plugin if in DEV mode
if (import.meta.env.DEV) {
  scenePlugins.push({
    key: "DebugDrawPlugin",
    plugin: PhaserDebugDrawPlugin,
    mapping: "debugDraw",
  });
}

// Phaser base configuration
const config = {
  type: Phaser.WEBGL,
  scale: {
    parent: "phaser-game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: CONFIG.gameWidth,
    height: CONFIG.gameHeight,
  },
  title: "Lack Luster",
  backgroundColor: "#536b5d",
  plugins: {
    scene: scenePlugins,
  },
  physics: {
    default: "arcade",
    debug: import.meta.env.DEV,
    arcade: {
      gravity: { y: 0 },
    },
  },
  input: {
    gamepad: true,
  },
  render: {
    pixelArt: true,
  },
};

// Create the primary game object and export it
export const game = new Phaser.Game(config);

// Register and start the main scene
game.scene.add("GameOver", GameOver, false);
game.scene.add("PauseScene", PauseScene, false);
game.scene.add("GameScene", GameScene, false);
game.scene.add("ControlsScene", ControlsScene, false);
game.scene.add("CreditsScene", CreditsScene, false);
game.scene.add("StartScene", StartScene, false);
game.scene.start("StartScene");
