import { ControlsScene } from './ControlsScene';
import { CreditsScene } from './CreditsScene';
import { GameOverScene } from './GameOverScene';
import { GameScene } from './GameScene';
import { PauseScene } from './PauseScene';
import { BootScene } from './BootScene';
import { MainMenuScene } from './MainMenuScene';

export const SceneNames = {
    controls: String = 'ControlsScene',
    credits: String = 'CreditsScene',
    gameOver: String = 'GameOverScene',
    gameScene: String = 'GameScene',
    pause: String = 'PauseScene',
    boot: String = 'BootScene',
    mainMenu: String = 'MainMenuScene',
};

export default [BootScene, CreditsScene, ControlsScene, GameOverScene, PauseScene, GameScene, MainMenuScene];
