import { GameOver } from './scenes/GameOver';
import { PauseScene } from './scenes/PauseScene';
import { ControlsScene } from './scenes/ControlsScene';
import { CreditsScene } from './scenes/CreditsScene';
import { StartScene } from './scenes/StartScene';
import { GameScene } from './scenes/GameScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Lack Luster',
  version: '2.0',
  scale: {
    parent: 'content',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1920,
    height: 1080,
  },
  // width: 1920,
  // height: 1080,
  // zoom: 3,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [
    GameOver,
    PauseScene,
    GameScene,
    ControlsScene,
    CreditsScene,
    StartScene,
  ],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: true,
  },
  backgroundColor: '#536b5d',
  render: { pixelArt: true, antialias: false },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};
