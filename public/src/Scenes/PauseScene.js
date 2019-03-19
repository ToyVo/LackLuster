class PauseScene extends Phaser.Scene {
	init () {}

	preload () {
	}

	create () {
		this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		let gameHeight = this.sys.game.config.height;
		let gameWidth = this.sys.game.config.width;
		let resume = this.add.text(gameWidth / 3, 3 * gameHeight / 4, 'Resume', {
			font: '40px Arial',
			fill: '#FFFFFF'
		}).setInteractive();
		resume.setOrigin(0.5, 0.5);
		resume.setDepth(1);

		let resumeBg = this.add.graphics();
		resumeBg.fillStyle(0x000000, 0.7);
		resumeBg.fillRect(gameWidth / 3 - resume.width / 2 - 10, 3 * gameHeight / 4 - resume.height / 2 - 10, resume.width + 20, resume.height + 20);

		let quit = this.add.text(2 * gameWidth / 3, 3 * gameHeight / 4, 'Quit', {
			font: '40px Arial',
			fill: '#FFFFFF'
		}).setInteractive();
		quit.setOrigin(0.5, 0.5);
		quit.setDepth(1);

		let quitBg = this.add.graphics();
		quitBg.fillStyle(0x000000, 0.7);
		quitBg.fillRect(2 * gameWidth / 3 - quit.width / 2 - 10, 3 * gameHeight / 4 - quit.height / 2 - 10, quit.width + 20, quit.height + 20);

		// resume game
		resume.on('pointerup', function () {
			this.scene.resume('GameScene');
			this.scene.stop('PauseScene');
		}, this);

		quit.on('pointerup', function () {
			this.scene.start('StartScene');
		}, this);

		this.input.keyboard.on('keyup_ESC', function (event) {
			this.scene.resume('GameScene');
			this.scene.stop('PauseScene');
		}, this);
	}

	update () {
	}
}
