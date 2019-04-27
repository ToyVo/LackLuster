/* global Player setupAnimations setupSound  */
class GameScene extends Phaser.Scene {
	// Pre-load function: queues all needed assets for downloading
	// (they are actually downloaded asynchronously, prior to 'create')
	preload () {
		setupAnimations(this);
		setupSound(this);
	}

	// Run after all loading (queued in preload) is finished
	create () { // map
		this.finalTally = 0;
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
		/* const lightLayer4 = map.createStaticLayer(9, [tileSetImg, tileLightSetImg]);
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
		const lightLayer17 = map.createStaticLayer(22, [tileSetImg, tileLightSetImg]);
		const lightLayer18 = map.createStaticLayer(23, [tileSetImg, tileLightSetImg]); */
		lightLayerStart.visible = false; // Start
		lightLayer1.visible = false;
		lightLayer2.visible = false;
		lightLayer3.visible = false;
		/* lightLayer4.visible = false;
		lightLayer5.visible = false;
		lightLayer6.visible = false;
		lightLayer7.visible = false;
		lightLayer8.visible = false;
		lightLayer9.visible = false;
		lightLayer10.visible = false;
		lightLayer11.visible = false;
		lightLayer12.visible = false;
		lightLayer13.visible = false;
		lightLayer14.visible = false;
		lightLayer15.visible = false;
		lightLayer16.visible = false;
		lightLayer17.visible = false;
		lightLayer18.visible = false; */
		this.lightsArray = [lightLayerStart, lightLayer1, lightLayer2, lightLayer3];
		/* this.lightsArray = [lightLayerStart, lightLayer1, lightLayer2, lightLayer3,
			lightLayer4, lightLayer5, lightLayer6, lightLayer7, lightLayer8, lightLayer9,
			lightLayer10, lightLayer11, lightLayer12, lightLayer13, lightLayer14, lightLayer15,
			lightLayer16, lightLayer17, lightLayer18]; */

		walls.setCollisionByProperty({ collides: true });
		enemyColl.setCollisionByProperty({ collides: true });
		grass.setCollisionByProperty({ collides: true });
		walls.setTileLocationCallback(249, 186, 15, 5, this.triggerLevelOneMusic, this);
		walls.setTileLocationCallback(170, 263, 5, 15, this.triggerLevelTwoMusic, this);
		walls.setTileLocationCallback(325, 263, 5, 15, this.triggerLevelThreeMusic, this);
		walls.setTileLocationCallback(180, 195, 145, 150, this.triggerMusic, this);// 190-340y, 175-320x covers the hub area
		walls.setTileLocationCallback(249, 375, 5, 5, this.triggerStart, this);// 190-340y, 175-320x covers the hub area
		const fSpawnPoint = map.findObject('Objects', obj => obj.name === 'fSpawnPoint');
		this.spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// Camera
		this.cameras.main.setBackgroundColor('#536b5d');
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

		// Player
		this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y, 'player_front');
		this.cameras.main.startFollow(this.player, false, 0.5, 0.5);

		/*    this.sparkles = this.physics.add.sprite(this.spawnPoint.x + 10, this.spawnPoint.y + 10, 'sparkle').setScale(50, 45).setImmovable();
		this.sparkles.alpha = 0.3;
		this.sparkles.anims.play('sparkles');  */
		// Pause Game
		this.input.gamepad.on('up', function (pad, button, value) {
			if (button.index === 1) {
				this.scene.run('PauseScene');
				this.scene.bringToTop('PauseScene');
				this.scene.pause('GameScene');
			}
		}, this);
		this.input.keyboard.on('keyup-ESC', function (event) {
			this.scene.run('PauseScene');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('GameScene');
		}, this);

		this.events.on('resume', function (sys, data) {
			if (data === 1) {
				this.player.setPosition(this.spawnPoint.x, this.spawnPoint.y);
				this.player.health = 3;
			}
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
		}

		// Enemy
		this.slimeGroup = this.physics.add.group({ key: 'slime_black_walking' });
		let enemySpawn = map.createFromObjects('Objects', 'EnemySpawn', { key: 'slime_black_walking' });
		for (var i = 0; i < enemySpawn.length; i++) {
			this.slimeGroup.add(enemySpawn[i]);
			this.physics.add.existing(enemySpawn[i]);
			enemySpawn[i].anims.play('slimeAnim');
			enemySpawn[i].setDepth(5);
		}

		// light orbs
		this.pillarGroup = this.physics.add.group({ key: 'light_orb' });
		this.pSpawn = map.createFromObjects('Objects', 'PillarSpawn', { key: 'light_orb' });
		for (var l = 0; l < this.pSpawn.length; l++) {
			this.pillarGroup.add(this.pSpawn[l]);
			this.physics.add.existing(this.pSpawn[l]);
			this.pSpawn[l].setScale(3);
			this.pSpawn[l].body.setImmovable();
			this.pSpawn[l].setSize(32, 32);
			this.pSpawn[l].body.setOffset(0, 32);
			this.pSpawn[l].on('animationstart', function (animation, frame, gameObject) {
				this.finalTally++;
			}, this);
		}

		// Traps
		this.trapGroup = this.physics.add.group({ key: 'spikeT' });
		let traps = map.createFromObjects('Objects', 'Spike', { key: 'spikeT' });
		for (var j = 0; j < traps.length; j++) {
			this.trapGroup.add(traps[j]);
			this.physics.add.existing(traps[j]);
		}
		this.trapGroup.children.each(function (spikeTrap) {
			spikeTrap.body.setSize(22, 22).setOffset(6, 6);
		}, this);
		this.boulderGroup = this.physics.add.group({ key: 'boul' });
		let boulder = map.createFromObjects('Objects', 'Boulder', { key: 'boul' });
		for (var k = 0; k < boulder.length; k++) {
			this.boulderGroup.add(boulder[k]);
			this.physics.add.existing(boulder[k]);
			boulder[k].setDepth(11);
		}

		// Player Collisions
		this.physics.add.collider(this.player, walls);
		this.physics.add.collider(this.player, this.pillarGroup.getChildren(), this.playOrb, null, this);
		this.physics.add.collider(this.player, this.slimeGroup.getChildren(), this.player.takeDamage, null, this.player);
		this.physics.add.overlap(this.player, this.trapGroup.getChildren(), triggerSpikes, null, this); // Want overlap
		this.physics.add.collider(this.player, this.boulderGroup.getChildren(), this.player.takeDamage, null, this.player);

		// Final Orb
		this.finalOrb = this.physics.add.sprite(fSpawnPoint.x, fSpawnPoint.y, 'final_orb_activation_sheet').setScale(3).setImmovable();
		this.finalOrb.setSize(96, 96).setOffset(0, 32);
		this.physics.add.collider(this.player, this.finalOrb, null, null, this);
		this.finalOrb.on('animationcomplete', function (animation, frame, gameObject) {
			this.finalOrb.anims.play('final_orb_idle_anim');
		}, this);

		// Other Collisions
		this.physics.add.collider(this.boulderGroup.getChildren(), walls, letsRoll, null, this);
		this.physics.add.collider(this.boulderGroup.getChildren(), wallTop, letsRoll, null, this);
		this.physics.add.collider(walls, this.slimeGroup.getChildren(), slimeMove, null, this);
		this.physics.add.collider(enemyColl, this.slimeGroup.getChildren()); // Contains the slimes
		this.physics.add.collider(wallTop, this.slimeGroup.getChildren(), slimeMove, null, this); // Contains the slimes
		Phaser.Actions.Call(this.slimeGroup.getChildren(), function (child) {
			child.body.setVelocityX(-300); // ACTUALLY WORKS YES, Appears to be a one time method call
			child.setScale(2);
		});
		Phaser.Actions.Call(this.trapGroup.getChildren(), function (child) {
			child.body.setImmovable(true);
			child.setScale(3);
			child.setDepth(1);// Spikes
		});
		Phaser.Actions.Call(this.boulderGroup.getChildren(), function (child) {
			child.setScale(2.65); // this.boulderRoll.play();
			child.body.setVelocityY(400);
		});
		function letsRoll (player, boulder) {
			// boulder.anims.play('boulder_roll');
			this.boulderGroup.children.iterate(function (child) {
				child.body.setImmovable(true);
				if (child.body.touching.down || child.body.blocked.down) {
					child.body.setVelocityY(-400);
				} else if (child.body.touching.up || child.body.blocked.up) {
					child.body.setVelocityY(400);
				}
			});
			/* if (boulder.body.touching.right || boulder.body.blocked.right ||
				boulder.body.touching.left || boulder.body.blocked.left) {
				if (!this.boulderDeath.isPlaying) { this.boulderDeath.play(); }
				// boulder.anims.play('boulder_death');
				boulder.visible = false;
				boulder.body.destroy();
			} */
		}

		function slimeMove () { // Is fine on the group since they all behave the same
			this.slimeGroup.children.iterate(function (child) {
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
		}

		function triggerSpikes (player, spike) {
			spike.play('spikeTrapOn');
			spike.play('spikeTrapOff');
			this.spikeTrap.play();
			this.player.takeDamage();
		}
	} // End create func

	update (time, delta) {
		this.input.update();
		this.player.update(time, delta);
		if (this.finalTally >= 18) {
			if (this.finalOrb.x - this.player.body.x < 350 && this.finalOrb.x - this.player.body.x > -350) {
				if (this.finalOrb.y - this.player.body.y < 450 && this.finalOrb.y - this.player.body.y > -450) {
					if (!this.finalOrb.anims.isPlaying) {
						this.playFinalOrb();
					}
				}
			}
		}
	}

	triggerMusic () {
		if (!this.mainTheme.isPlaying) {
			this.mainTheme.play();
			this.levelOne.stop();
			this.levelTwo.stop();
			this.levelThree.stop();
		}
	}

	triggerStart () {
		this.lightsArray[0].visible = true;
	}

	triggerLevelOneMusic () {
		if (!this.levelOne.isPlaying) {
			this.mainTheme.stop();
			this.levelOne.play();
			this.levelTwo.stop();
			this.levelThree.stop();
		}
	}

	triggerLevelTwoMusic () {
		if (!this.levelTwo.isPlaying) {
			this.mainTheme.stop();
			this.levelOne.stop();
			this.levelTwo.play();
			this.levelThree.stop();
		}
	}

	triggerLevelThreeMusic () {
		if (!this.levelThree.isPlaying) {
			this.mainTheme.stop();
			this.levelOne.stop();
			this.levelTwo.stop();
			this.levelThree.play();
		}
	}

	playFinalOrb () {
		this.finalOrb.anims.play('final_orb_activation_anim');
		let title = this.add.text(7980, 8000, 'Thanks for playing!', {
			fontFamily: 'font1',
			fontSize: '80px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5).setDepth(100);
		this.cameras.main.fade(5000, 0, 0, 0, false);

		this.cameras.main.on('camerafadeoutcomplete', function () {
			this.end();
		}, this);
	}
	end () {
		this.scene.restart();
	}

	playOrb (player, pillar) {
		for (let o = 0; o < this.pSpawn.length; o++) {
			if (this.pSpawn[o] === pillar) { // The pillar we touch is equiv to the pillar in the group..
				// In here we want to get this pillar number and use it to activate a particular Tiled layer
				// Probs setup an array with all the layers and access it using the same o we get
				this.lightsArray[o + 1].visible = true;
			}
		}
		pillar.anims.play('light_orb_activated', true);
		this.pillarUp.play();
	}
}
// Ensure this is a globally accessible class
window.GameScene = GameScene;
