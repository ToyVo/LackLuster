import { getGameHeight, getGameWidth } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Controls',
};

export class ControlsScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    create(): void {
        const gameWidth = getGameWidth(this);
        const gameHeight = getGameHeight(this);
        const background = this.add.graphics();
        background.fillStyle(0x000000, 0.4);
        background.fillRect(0, 0, gameWidth, gameHeight);

        const backButton = this.add
            .text(gameWidth / 2, (3 * gameHeight) / 4, 'Back', {
                fontFamily: 'font1',
                fill: '#FFFFFF',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        backButton
            .on('pointerup', () => {
                this.scene.start('StartScene');
                this.scene.stop('ControlsScene');
            })
            .on('pointerover', () => {
                backButton.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                backButton.clearTint();
            });

        this.add
            .text(gameWidth / 2, gameHeight / 2, 'W, A, S, D, or arrow keys to move\nSpace to "dash"', {
                fontFamily: 'font1',
                align: 'center',
                fill: '#FFFFFF',
            })
            .setOrigin(0.5, 0.5)
            .setDepth(1);
    }
}
