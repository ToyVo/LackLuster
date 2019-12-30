import { getGameHeight, getGameWidth } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameOver',
};

export class GameOver extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    create(): void {
        const gameHeight = getGameHeight(this);
        const gameWidth = getGameWidth(this);
        const background = this.add.graphics();
        background.fillStyle(0x000000, 0.4);
        background.fillRect(0, 0, gameWidth, gameHeight);

        this.add
            .text(gameWidth / 2, gameHeight / 2 - 250, 'Game Over', {
                fontFamily: 'font1',
                fontSize: '85px',
                fill: '#dddddd',
                align: 'center',
            })
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        const retryText = this.add
            .text(gameWidth / 2, gameHeight / 2 + 100, 'Retry?', {
                fontFamily: 'font1',
                fill: '#dddddd',
                align: 'center',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        retryText
            .on('pointerover', () => {
                retryText.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                retryText.clearTint();
            })
            .on('pointerup', () => {
                // Ideally here we would have a checkpoint we could load or a way to detect
                // And run different scenes based off progression
                this.scene.resume('GameScene', 1);
                this.scene.stop('GameOver');
            });

        this.input.gamepad.on('up', () => {
            this.scene.resume('GameScene', { retry: true });
            this.scene.stop('GameOver');
        });
    }
}
