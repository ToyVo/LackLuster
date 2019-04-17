class ControlsScene extends Phaser.Scene {
	create () {
		let gameHeight = this.sys.game.config.height;
		let gameWidth = this.sys.game.config.width;
		let background = this.add.graphics();
		background.fillStyle(0x000000, 0.4);
		background.fillRect(0, 0, gameWidth, gameHeight);

		let backButton = this.add.text(gameWidth / 2, 3 * gameHeight / 4, 'Back', {
			fontFamily: 'font1',
			fill: '#FFFFFF'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		backButton.on('pointerup', function () {
			this.scene.start('StartScene');
			this.scene.stop('ControlsScene');
		}, this);

		backButton.on('pointerover', function () {
			backButton.tint = Math.random() * 0xffffff;
		}, this);
		backButton.on('pointerout', function () {
			backButton.clearTint();
		}, this);

		let controlstext = this.add.text(gameWidth / 2, gameHeight / 2,
			'W, A, S, D, or arrow keys to move\nSpace to "dash"', {
				fontFamily: 'font1',
				align: 'center',
				fill: '#FFFFFF'
			}).setOrigin(0.5, 0.5).setDepth(1);
	}
}
