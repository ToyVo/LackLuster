/* global centerX, centerY, centerGameObjects */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "GameOver" }] */

class GameOver extends Phaser.Scene {
	preload () {}

	create () {
		this.gameOverText = this.add.text(centerX(this), centerY(this) - 250,
			'Game Over', { font: '84px Arial', fill: '#dddddd', align: 'center' });
		centerGameObjects([this.gameOverText]);

		this.retryText = this.add.text(centerX(this), centerY(this) + 100,
			'Retry?', { font: '84px Arial', fill: '#dddddd', align: 'center' });
		centerGameObjects([this.retryText]);
		this.retryText.setInteractive();

		this.retryText.on('pointerover', function () {
			this.tint = Math.random() * 0xffffff;
		});
		this.retryText.on('pointerout', function () {
			this.tint = 0xffffff;
		});
		this.retryText.on('pointerup', function () {
			// Ideally here we would have a checkpoint we could load or a way to detect
			// And run different scenes based off progression
			this.scene.start('GameScene');
		}, this);

		this.input.gamepad.on('up', function () {
			this.scene.start('GameScene');
		}, this);
	}

	update () {
		this.input.update();
	}
}
