import { getGameHeight, getGameWidth } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Pause',
};

export class PauseScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    create(): void {
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        const gameHeight = getGameHeight(this);
        const gameWidth = getGameWidth(this);
        const background = this.add.graphics();
        background.fillStyle(0x000000, 0.4);
        background.fillRect(0, 0, gameWidth, gameHeight);

        const resume = this.add
            .text(gameWidth / 3, (3 * gameHeight) / 4, 'Resume', {
                fontFamily: 'font1',
                fill: '#FFFFFF',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);
        resume
            .on('pointerup', () => {
                this.scene.resume('GameScene');
                this.scene.stop('PauseScene');
            })
            .on('pointerover', () => {
                resume.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                resume.clearTint();
            });

        const quit = this.add
            .text((2 * gameWidth) / 3, (3 * gameHeight) / 4, 'Quit', {
                fontFamily: 'font1',
                fill: '#FFFFFF',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);
        quit.on('pointerup', () => {
            this.scene.start('StartScene');
            this.scene.stop('GameScene');
        })
            .on('pointerover', () => {
                quit.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                quit.clearTint();
            });

        const leftX = resume.x;
        const leftY = resume.y + 70;
        const rightX = quit.x;
        const rightY = quit.y + 70;

        this.add.graphics({ fillStyle: { color: 0xff0000 } }).fillCircle(leftX, leftY, 30);
        this.add
            .text(leftX, leftY, 'LEFT', {
                fontFamily: 'font1',
                fontSize: '12px',
                fill: '#FFFFFF',
            })
            .setOrigin(0.5, 0.5);

        this.add.graphics({ fillStyle: { color: 0x0000ff } }).fillCircle(rightX, rightY, 30);
        this.add
            .text(rightX, rightY, 'RIGHT', {
                fontFamily: 'font1',
                fontSize: '12px',
                fill: '#FFFFFF',
            })
            .setOrigin(0.5, 0.5);

        this.input.gamepad
            .on('up', (button: Phaser.Input.Gamepad.Button) => {
                if (button.index === 0) {
                    this.scene.resume('GameScene');
                    this.scene.stop('PauseScene');
                }
            })
            .on('up', (button: Phaser.Input.Gamepad.Button) => {
                if (button.index === 1) {
                    this.scene.start('StartScene');
                    this.scene.stop('GameScene');
                }
            });

        this.input.keyboard.on('keyup-ESC', () => {
            this.scene.resume('GameScene');
            this.scene.stop('PauseScene');
        });
    }
}
