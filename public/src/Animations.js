/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "setupAnimations" }] */

/**
 * sets up all animations for use
 * @param {Phaser.Scene} scene
 */
function setupAnimations (scene) {
	scene.anims.create({
		key: 'slimeAnim',
		frames: scene.anims.generateFrameNumbers('slime_black_walking', { start: 0, end: 4 }),
		frameRate: 12,
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
}
