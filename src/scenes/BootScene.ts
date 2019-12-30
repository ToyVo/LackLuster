import { getGameHeight, getGameWidth } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    public preload(): void {
        const halfWidth = getGameWidth(this) * 0.5;
        const halfHeight = getGameHeight(this) * 0.5;

        const progressBarHeight = 100;
        const progressBarWidth = 400;

        const progressBarContainer = this.add.rectangle(
            halfWidth,
            halfHeight,
            progressBarWidth,
            progressBarHeight,
            0x000000,
        );
        const progressBar = this.add.rectangle(
            halfWidth + 20 - progressBarContainer.width * 0.5,
            halfHeight,
            10,
            progressBarHeight - 20,
            0x888888,
        );

        const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
        const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
        const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

        this.load.on('progress', (value: number) => {
            progressBar.width = (progressBarWidth - 30) * value;

            const percent = value * 100;
            percentText.setText(`${percent}%`);
        });

        this.load.on('fileprogress', file => {
            assetText.setText(file.key);
        });

        this.load.on('complete', () => {
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            progressBar.destroy();
            progressBarContainer.destroy();

            this.scene.start('MainMenu');
        });

        this.loadAssets();
    }

    /**
     * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
     * should be added to this method. Once loaded in, the loader will keep track of them, independent of which scene
     * is currently active, so they can be accessed anywhere.
     */
    private loadAssets(): void {
        // Load sample assets
        this.load.image('LL_tiled_tiles', 'assets/sprites/LL_tiled_tiles.png');
        this.load.image('LL_tiled_light_tiles', 'assets/sprites/LL_tiled_light_tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/json/LL_final_map.json');
        this.load.spritesheet('slime_black_walking', 'assets/spritesheets/slime_walking_black.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image('Blocker', 'assets/sprites/LL_Blocker.png');
        this.load.image('web', 'assets/sprites/web.png');
        this.load.image('Tile', 'assets/sprites/Trap.png');
        this.load.image('boul', 'assets/sprites/boulder.png');
        this.load.image('health_orb', 'assets/sprites/health_orb.png');
        this.load.image('player_front', 'assets/player/player_front.png');
        this.load.image('player_right', 'assets/player/player_right.png');
        this.load.image('player_back', 'assets/player/player_back.png');
        this.load.image('player_left', 'assets/player/player_left.png');
        this.load.spritesheet('player_walk_front_sheet', 'assets/player/player_walk_front.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_walk_back_sheet', 'assets/player/player_walk_back.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_walk_left_sheet', 'assets/player/player_walk_left.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_walk_right_sheet', 'assets/player/player_walk_right.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_dash_anim_down', 'assets/spritesheets/Dash_Down.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_dash_anim_up', 'assets/spritesheets/Dash_Up.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_dash_anim_left', 'assets/spritesheets/Dash_Left.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('player_dash_anim_right', 'assets/spritesheets/Dash_Right.png', {
            frameWidth: 14,
            frameHeight: 24,
            margin: 1,
            spacing: 2,
        });
        this.load.spritesheet('slime_black_walking', 'assets/spritesheets/slime_walking_black.png', {
            frameWidth: 32,
            frameHeight: 32,
            spacing: 1,
        });
        this.load.spritesheet('spikeT', 'assets/spritesheets/Spike.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('light_orb', 'assets/spritesheets/light_ORB.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('sparkle', 'assets/spritesheets/sparkle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('final_orb_activation_sheet', 'assets/spritesheets/Orb_Activation.png', {
            frameWidth: 96,
            frameHeight: 128,
        });
        this.load.spritesheet('final_orb_idle_sheet', 'assets/spritesheets/Orb_Idle.png', {
            frameWidth: 96,
            frameHeight: 128,
        });
        this.load.spritesheet('boulderUp', 'assets/spritesheets/Boulder_Upwards.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('boulderDown', 'assets/spritesheets/Boulder_Downwards.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.audio('dash', 'assets/audio/dash.wav');
        this.load.audio('playerH', 'assets/audio/slimeHurt.wav');
        this.load.audio('mainTheme', 'assets/audio/mainTheme.wav');
        this.load.audio('spike', 'assets/audio/spike.wav');
        this.load.audio('playerD', 'assets/audio/pDeath.wav');
        this.load.audio('walk', 'assets/audio/footsteps.wav');
        this.load.audio('powerUp', 'assets/audio/pillarCollide.wav');
        this.load.audio('levelOne', 'assets/audio/Level3.wav'); // Intentional swap
        this.load.audio('levelTwo', 'assets/audio/Level2.wav');
        this.load.audio('levelThree', 'assets/audio/Level1.wav');
    }
}
