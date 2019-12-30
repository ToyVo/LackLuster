import { setupAnimations } from '../Animations';
import { Player } from '../sprites/Player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private player: Player;
    private finalOrb: Phaser.GameObjects.Sprite;
    private finalTally = 0;
    private lightsArray: Array<Phaser.Tilemaps.StaticTilemapLayer>;
    private mainThemeSound = this.sound.add('mainTheme', {
        volume: 0.4,
        rate: 1,
        loop: true,
    });

    private levelOneSound = this.sound.add('levelOne', {
        volume: 0.7,
        rate: 0.8,
        loop: true,
    });

    private levelTwoSound = this.sound.add('levelTwo', {
        volume: 0.5,
        rate: 2,
        loop: true,
    });

    private levelThreeSound = this.sound.add('levelThree', {
        volume: 0.4,
        rate: 0.53,
        loop: true,
    });

    private powerUp = this.sound.add('powerUp', {
        volume: 0.6,
        rate: 2.75,
        loop: false,
    });

    private spike = this.sound.add('spike', {
        volume: 0.3,
        rate: 1,
        loop: false,
    });

    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        setupAnimations(this);
    }

    create(): void {
        // map
        const level2BlockPlayer = true;
        const level3BlockPlayer = true;
        const map = this.make.tilemap({ key: 'map' });
        const tileSetImg = map.addTilesetImage('LL_tiled_tiles', 'LL_tiled_tiles');
        const tileLightSetImg = map.addTilesetImage('LL_tiled_light_tiles', 'LL_tiled_light_tiles');
        const grass = map.createStaticLayer(0, tileSetImg, 0, 0);
        const tiles = map.createStaticLayer(1, [tileSetImg, tileLightSetImg], 0, 0);
        const walls = map.createStaticLayer(2, tileSetImg, 0, 0);
        const wallTop = map.createStaticLayer(3, tileSetImg, 0, 0).setDepth(12);
        const enemyColl = map.createStaticLayer(4, tileSetImg);
        // Light layers below
        const lightLayerStart = map.createStaticLayer(5, [tileSetImg, tileLightSetImg]);
        const lightLayer1 = map.createStaticLayer(6, [tileSetImg, tileLightSetImg]);
        const lightLayer2 = map.createStaticLayer(7, [tileSetImg, tileLightSetImg]);
        const lightLayer3 = map.createStaticLayer(8, [tileSetImg, tileLightSetImg]);
        const lightLayer4 = map.createStaticLayer(9, [tileSetImg, tileLightSetImg]);
        const lightLayer5 = map.createStaticLayer(10, [tileSetImg, tileLightSetImg]);
        const lightLayer6 = map.createStaticLayer(11, [tileSetImg, tileLightSetImg]);
        const lightLayer7 = map.createStaticLayer(12, [tileSetImg, tileLightSetImg]);
        const lightLayer8 = map.createStaticLayer(13, [tileSetImg, tileLightSetImg]);
        const lightLayer9 = map.createStaticLayer(14, [tileSetImg, tileLightSetImg]);
        const lightLayer10 = map.createStaticLayer(15, [tileSetImg, tileLightSetImg]);
        const lightLayer11 = map.createStaticLayer(16, [tileSetImg, tileLightSetImg]);
        const lightLayer12 = map.createStaticLayer(17, [tileSetImg, tileLightSetImg]);
        const lightLayer13 = map.createStaticLayer(18, [tileSetImg, tileLightSetImg]);
        const lightLayer14 = map.createStaticLayer(19, [tileSetImg, tileLightSetImg]);
        const lightLayer15 = map.createStaticLayer(20, [tileSetImg, tileLightSetImg]);
        const lightLayer16 = map.createStaticLayer(21, [tileSetImg, tileLightSetImg]);
        const lightLayer17 = map.createStaticLayer(22, [tileSetImg, tileLightSetImg]); // Layer 23
        this.lightsArray = [
            lightLayerStart,
            lightLayer1,
            lightLayer2,
            lightLayer3,
            lightLayer4,
            lightLayer5,
            lightLayer6,
            lightLayer7,
            lightLayer8,
            lightLayer9,
            lightLayer10,
            lightLayer11,
            lightLayer12,
            lightLayer13,
            lightLayer14,
            lightLayer15,
            lightLayer16,
            lightLayer17,
        ];
        for (const layer of this.lightsArray) {
            layer.setVisible(false);
        }

        walls.setCollisionByProperty({ collides: true });
        enemyColl.setCollisionByProperty({ collides: true });
        lightLayer16.setCollisionByProperty({ collides: true });
        lightLayer17.setCollisionByProperty({ collides: true });
        walls.setTileLocationCallback(240, 175, 15, 5, () => {
            if (!this.levelOneSound.isPlaying) {
                this.mainThemeSound.stop();
                this.levelOneSound.play();
                this.levelTwoSound.stop();
                this.levelThreeSound.stop();
            }
        });
        walls.setTileLocationCallback(165, 250, 5, 15, () => {
            if (!this.levelTwoSound.isPlaying) {
                this.mainThemeSound.stop();
                this.levelOneSound.stop();
                this.levelTwoSound.play();
                this.levelThreeSound.stop();
            }
        });
        walls.setTileLocationCallback(320, 250, 5, 15, () => {
            if (!this.levelThreeSound.isPlaying) {
                this.mainThemeSound.stop();
                this.levelOneSound.stop();
                this.levelTwoSound.stop();
                this.levelThreeSound.play();
            }
        });
        walls.setTileLocationCallback(170, 180, 145, 150, () => {
            if (!this.mainThemeSound.isPlaying) {
                this.mainThemeSound.play();
                this.levelOneSound.stop();
                this.levelTwoSound.stop();
                this.levelThreeSound.stop();
            }
        });
        walls.setTileLocationCallback(240, 360, 5, 15, () => {
            this.lightsArray[0].visible = true;
        });
        const fSpawnPoint = map.findObject('Objects', obj => obj.name === 'fSpawnPoint');
        const level2BlockPos = map.findObject('Objects', obj => obj.name === 'Level2Block');
        const level2Blocker = this.physics.add
            .sprite(level2BlockPos.x + 50, level2BlockPos.y + 40, 'Blocker')
            .setScale(5)
            .setImmovable()
            .setSize(65, 500);
        const level3BlockPos = map.findObject('Objects', obj => obj.name === 'Level3Block');
        const level3Blocker = this.physics.add
            .sprite(level3BlockPos.x + 50, level3BlockPos.y + 40, 'Blocker')
            .setScale(5)
            .setImmovable()
            .setSize(65, 500);
        const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

        // Camera
        this.cameras.main.setBackgroundColor('#536b5d');
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

        // Player
        this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
        this.cameras.main.startFollow(this.player, false, 0.5, 0.5);
        // Pause Game
        this.input.gamepad.on('up', (button: Phaser.Input.Gamepad.Button) => {
            if (button.index === 1) {
                this.scene.run('PauseScene');
                this.scene.bringToTop('PauseScene');
                this.scene.pause('GameScene');
            }
        });
        this.input.keyboard.on('keyup-ESC', () => {
            this.scene.run('PauseScene');
            this.scene.bringToTop('PauseScene');
            this.scene.pause('GameScene');
        });

        this.events.on('resume', (sys, data) => {
            if (data === 1) {
                this.input.keyboard.resetKeys();
                this.player.setPosition(spawnPoint.x, spawnPoint.y);
                this.player.health = 6;
            }
        });

        // Enemy
        const slimeGroup = this.physics.add.group({ key: 'slime_black_walking' });
        const enemySpawn = map.createFromObjects('Objects', 'EnemySpawn', { key: 'slime_black_walking' });
        for (const slime of enemySpawn) {
            slimeGroup.add(slime);
            this.physics.add.existing(slime);
            slime.anims.play('slimeAnim');
            slime.setDepth(5);
            slime.body = new Phaser.Physics.Arcade.Body(this.physics.world, slime).setVelocity(-300);
            slime.setScale(2);
        }

        // light orbs
        const pillarGroup = this.physics.add.group({ key: 'light_orb' });
        const pSpawn = map.createFromObjects('Objects', 'PillarSpawn', { key: 'light_orb' });
        for (const pillar of pSpawn) {
            pillarGroup.add(pillar);
            this.physics.add.existing(pillar);
            pillar.setScale(3);
            pillar.setDepth(11);
            pillar.setSize(32, 30);
            pillar.body = new Phaser.Physics.Arcade.Body(this.physics.world, pillar)
                .setImmovable(true)
                .setOffset(0, 30);
            pillar.on('animationstart', () => {
                this.pillarUp.play();
                this.finalTally++;
            });
        }

        // Spikes
        const trapGroup = this.physics.add.group({ key: 'spikeT' });
        const traps = map.createFromObjects('Objects', 'Spike', { key: 'spikeT' });
        for (const trap of traps) {
            trapGroup.add(trap);
            this.physics.add.existing(trap);
            trap.body = new Phaser.Physics.Arcade.Body(this.physics.world, trap)
                .setImmovable(true)
                .setSize(22, 22)
                .setOffset(6, 6);
            trap.setScale(3);
            trap.setDepth(1);
            trap.on('animationcomplete-spikeTrapOn', () => {
                spikeTrap.play();
                this.player.takeDamage();
            });
        }
        // Boulders
        const boulderGroup = this.physics.add.group({ key: 'boul' });
        const boulder = map.createFromObjects('Objects', 'Boulder', { key: 'boul' });
        for (const boul of boulder) {
            boulderGroup.add(boul);
            this.physics.add.existing(boul);
            boul.setDepth(11);
            boul.setScale(2.65);
            boul.body = new Phaser.Physics.Arcade.Body(this.physics.world, boul).setVelocity(0, 400);
        }

        // Webs
        const webGroup = this.physics.add.group({ key: 'web' });
        const web = map.createFromObjects('Objects', 'Web', { key: 'web' });
        for (const iweb of web) {
            webGroup.add(iweb);
            this.physics.add.existing(iweb);
            iweb.body = new Phaser.Physics.Arcade.Body(this.physics.world, iweb).setImmovable(true);
            iweb.setScale(3);
        }

        // Final Orb
        this.finalOrb = this.physics.add
            .sprite(fSpawnPoint.x, fSpawnPoint.y, 'final_orb_activation_sheet')
            .setScale(3)
            .setImmovable();
        this.finalOrb.setSize(93, 96).setOffset(0, 32);
        this.finalOrb.on('animationcomplete', () => {
            this.finalOrb.anims.play('final_orb_idle_anim');
        });

        this.physics.add.collider(this.player, this.finalOrb);
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, lightLayer16).name = 'Level2Blocker';
        this.physics.add.collider(this.player, lightLayer17).name = 'Level3Blocker';
        this.physics.add.collider(this.player, pillarGroup.getChildren(), pillar => {
            for (let o = 0; o < pSpawn.length; o++) {
                if (pSpawn[o] === pillar) {
                    // The pillar we touch is equiv to the pillar in the group..
                    // In here we want to get this pillar number and use it to activate a particular Tiled layer
                    // Probs setup an array with all the layers and access it using the same o we get
                    this.lightsArray[o + 1].visible = true; // Offset 1 since our 1st element is the Start Light
                }
            }
            pillar.anims.play('light_orb_activated', true);
        });
        this.physics.add.overlap(this.player, webGroup.getChildren(), () => {
            this.player.velocity = 105;
        });
        this.physics.add.collider(this.player, slimeGroup.getChildren(), this.player.takeDamage);
        this.physics.add.collider(pillarGroup.getChildren(), slimeGroup.getChildren());
        this.physics.add.overlap(this.player, trapGroup.getChildren(), spike => {
            if (!spike.anims.isPlaying) {
                spike.play('spikeTrapOn');
                spike.play('spikeTrapOff');
            }
        });
        this.physics.add.collider(this.player, boulderGroup.getChildren(), this.player.takeDamage);

        this.physics.add.collider(boulderGroup.getChildren(), walls, () => {
            boulderGroup.children.iterate(child => {
                child.body.setImmovable(true);
                if (child.body.touching.down || child.body.blocked.down) {
                    child.body.setVelocityY(-400);
                    child.anims.play('boulUp');
                } else if (child.body.touching.up || child.body.blocked.up) {
                    child.body.setVelocityY(400);
                    child.anims.play('boulDown');
                }
            });
        });
        this.physics.add.collider(boulderGroup.getChildren(), wallTop, () => {
            boulderGroup.children.iterate(child => {
                child.body.setImmovable(true);
                if (child.body.touching.down || child.body.blocked.down) {
                    child.body.setVelocityY(-400);
                    child.anims.play('boulUp');
                } else if (child.body.touching.up || child.body.blocked.up) {
                    child.body.setVelocityY(400);
                    child.anims.play('boulDown');
                }
            });
        });
        this.physics.add.collider(walls, slimeGroup.getChildren(), () => {
            this.slimeGroup.children.iterate(child => {
                child.body.setImmovable(true);
                if (child.body.touching.right || child.body.blocked.right) {
                    child.body.velocity.y = 300;
                    child.body.velocity.x = 0; // turn down
                } else if (child.body.touching.left || child.body.blocked.left) {
                    child.body.velocity.y = -300; // turn up
                    child.body.velocity.x = 0;
                } else if (child.body.touching.up || child.body.blocked.up) {
                    child.body.velocity.y = 0;
                    child.body.velocity.x = 300; // turn right
                } else if (child.body.touching.down || child.body.blocked.down) {
                    child.body.velocity.y = 0;
                    child.body.velocity.x = -300; // turn left
                }
            });
        });
        this.physics.add.collider(enemyColl, slimeGroup.getChildren());
        this.physics.add.collider(slimeGroup.getChildren(), slimeGroup.getChildren());
        this.physics.add.collider(wallTop, slimeGroup.getChildren(), () => {
            this.slimeGroup.children.iterate(child => {
                child.body.setImmovable(true);
                if (child.body.touching.right || child.body.blocked.right) {
                    child.body.velocity.y = 300;
                    child.body.velocity.x = 0; // turn down
                } else if (child.body.touching.left || child.body.blocked.left) {
                    child.body.velocity.y = -300; // turn up
                    child.body.velocity.x = 0;
                } else if (child.body.touching.up || child.body.blocked.up) {
                    child.body.velocity.y = 0;
                    child.body.velocity.x = 300; // turn right
                } else if (child.body.touching.down || child.body.blocked.down) {
                    child.body.velocity.y = 0;
                    child.body.velocity.x = -300; // turn left
                }
            });
        });
    }

    update(time: number, delta: number): void {
        this.player.update(time, delta);
        switch (this.finalTally) {
            case 15:
                if (this.finalOrb.x - this.player.body.x < 350 && this.finalOrb.x - this.player.body.x > -350) {
                    if (this.finalOrb.y - this.player.body.y < 450 && this.finalOrb.y - this.player.body.y > -450) {
                        if (!this.finalOrb.anims.isPlaying) {
                            const sparkles = this.physics.add
                                .sprite(fSpawnPoint.x + 10, fSpawnPoint.y + 10, 'sparkle')
                                .setScale(40, 45)
                                .setImmovable();
                            sparkles.alpha = 0.3;
                            sparkles.anims.play('sparkles');
                            this.finalOrb.anims.play('final_orb_activation_anim');
                            this.add
                                .text(7980, 8000, 'Thanks for playing!', {
                                    fontFamily: 'font1',
                                    fontSize: '80px',
                                    fill: '#FFFFFF',
                                })
                                .setOrigin(0.5, 0.5)
                                .setDepth(100);
                            this.cameras.main.fade(5000, 0, 0, 0, false);
                            this.cameras.main.on('camerafadeoutcomplete', () => {
                                this.scene.restart();
                            });
                        }
                    }
                }
                break;
            case 8:
                this.level3Blocker.setVisible(false);
                this.level3Blocker.destroy();
                this.physics.world.colliders.remove(
                    this.physics.world.colliders.getActive().find(i => {
                        return i.name === 'Level3Blocker';
                    }),
                );
                this.lightsArray[17].visible = true;
                break;
            case 3:
                this.level2Blocker.setVisible(false);
                this.level2Blocker.destroy();
                this.physics.world.colliders.remove(
                    this.physics.world.colliders.getActive().find(i => {
                        return i.name === 'Level2Blocker';
                    }),
                );
                this.lightsArray[16].visible = true;
                break;
        }
    }
}
