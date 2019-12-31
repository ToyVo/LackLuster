import { getGameHeight, getGameWidth } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
    private blinkTimer = 0;
    private anyButton!: Phaser.GameObjects.Text;

    constructor() {
        super(sceneConfig);
    }

    public create(): void {
        const gameWidth = getGameWidth(this);
        const gameHeight = getGameHeight(this);

        const background = this.add.graphics();
        background.fillStyle(0x000000, 0.4);
        background.fillRect(0, 0, gameWidth, gameHeight);

        this.add
            .text(gameWidth / 2, gameHeight / 4, 'LACK LUSTER', {
                fontFamily: 'font1',
                fontSize: '80px',
                fill: '#FFFFFF',
            })
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        const start = this.add
            .text(gameWidth / 2, (3 * gameHeight) / 4, 'START', {
                fontFamily: 'font1',
                fontSize: '30px',
                fill: '#FFFFFF',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        start
            .on('pointerup', () => {
                this.scene.resume('GameScene');
                this.scene.stop('StartScene');
            })
            .on('pointerover', () => {
                start.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                start.clearTint();
            });

        const credits = this.add
            .text(gameWidth / 3, (3 * gameHeight) / 4, 'CREDITS', {
                fontFamily: 'font1',
                fontSize: '30px',
                fill: '#FFFFFF',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);
        credits
            .on('pointerup', () => {
                this.scene.run('Credits');
                this.scene.stop('StartScreen');
            })
            .on('pointerover', () => {
                credits.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                credits.clearTint();
            });

        const controls = this.add
            .text((2 * gameWidth) / 3, (3 * gameHeight) / 4, 'CONTROLS', {
                fontFamily: 'font1',
                fontSize: '30px',
                fill: '#FFFFFF',
            })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDepth(1);
        controls
            .on('pointerup', () => {
                this.scene.run('ControlsScene');
                this.scene.stop('StartScreen');
            })
            .on('pointerover', () => {
                controls.tint = Math.random() * 0xffffff;
            })
            .on('pointerout', () => {
                controls.clearTint();
            });

        const leftX = start.x - 40;
        const leftY = start.y + 70;
        const rightX = start.x + 40;
        const rightY = start.y + 70;

        this.anyButton = this.add
            .text(start.x, start.y + 120, 'PRESS ANY BUTTON TO START', {
                fontFamily: 'font1',
                fontSize: '12px',
                fill: '#FFFFFF',
            })
            .setOrigin(0.5, 0.5);

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

        this.input.gamepad.on('up', () => {
            this.scene.resume('GameScene');
            this.scene.stop('StartScreen');
        });

        this.scene.run('GameScene');
        this.scene.bringToTop('StartScene');
        this.scene.pause('GameScene');
    }

    public update(_time: number, delta: number): void {
        this.blinkTimer += delta;
        if (this.blinkTimer >= 1000) {
            this.blinkTimer = 0;
            this.anyButton.visible = !this.anyButton.visible;
        }
    }
}
