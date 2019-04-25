/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "setupAnimations" }] */

/**
 * sets up all animations for use
 * @param {Phaser.Scene} scene
 */
function setupAnimations (scene) {
	scene.anims.create({
		key: 'slimeAnim',
		frames: scene.anims.generateFrameNumbers('slime_black_walking', { start: 0, end: 12 }),
		frameRate: 12,
		repeat: -1
	});

	scene.anims.create({
		key: 'sparkles',
		frames: scene.anims.generateFrameNumbers('sparkle', { start: 0, end: 6 }),
		frameRate: 5,
		repeat: -1
	});

	scene.anims.create({
		key: 'player_walk_front_anim',
		frames: scene.anims.generateFrameNumbers('player_walk_front_sheet', { start: 0, end: 12 }),
		frameRate: 12,
		repeat: -1
	});

	scene.anims.create({
		key: 'player_walk_back_anim',
		frames: scene.anims.generateFrameNumbers('player_walk_back_sheet', { start: 0, end: 12 }),
		frameRate: 12,
		repeat: -1
	});

	scene.anims.create({
		key: 'player_walk_left_anim',
		frames: scene.anims.generateFrameNumbers('player_walk_left_sheet', { start: 0, end: 12 }),
		frameRate: 12,
		repeat: -1
	});

	scene.anims.create({
		key: 'player_walk_right_anim',
		frames: scene.anims.generateFrameNumbers('player_walk_right_sheet', { start: 0, end: 12 }),
		frameRate: 12,
		repeat: -1
	});

	scene.anims.create({
		key: 'playerDashRight',
		frames: scene.anims.generateFrameNumbers('player_dash_anim_right', { start: 0, end: 8 }),
		frameRate: 12,
		repeat: 0
	});

	scene.anims.create({
		key: 'playerDashLeft',
		frames: scene.anims.generateFrameNumbers('player_dash_anim_left', { start: 0, end: 8 }),
		frameRate: 12,
		repeat: 0
	});

	scene.anims.create({
		key: 'playerDashUp',
		frames: scene.anims.generateFrameNumbers('player_dash_anim_up', { start: 0, end: 8 }),
		frameRate: 12,
		repeat: 0
	});

	scene.anims.create({
		key: 'playerDashDown',
		frames: scene.anims.generateFrameNumbers('player_dash_anim_down', { start: 0, end: 8 }),
		frameRate: 12,
		repeat: 0
	});

	scene.anims.create({
		key: 'spikeTrapOn',
		frames: scene.anims.generateFrameNumbers('spikeT', { start: 0, end: 4 }),
		frameRate: 12,
		repeat: 0
	});
	scene.anims.create({
		key: 'spikeTrapOff',
		frames: scene.anims.generateFrameNumbers('spikeT', { start: 4, end: 8 }),
		frameRate: 12,
		repeat: 0
	});

	scene.anims.create({
		key: 'light_orb_activated',
		frames: scene.anims.generateFrameNumbers('light_orb', { start: 1, end: 6 }),
		frameRate: 4,
		repeat: -1
	});
}
