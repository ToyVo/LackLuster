/* global GameScene, GameOver, PauseScene, StartScene, ControllerDebug, Level1 */

// Configure any plugins
let scenePlugins = [{
	key: 'updatePlugin',
	plugin: Phaser.Plugins.UpdatePlugin,
	mapping: 'updates'
}];

// Add the debugDraw plugin if in DEV mode
if (__DEV__) {
	scenePlugins.push({
		key: 'DebugDrawPlugin',
		plugin: PhaserDebugDrawPlugin,
		mapping: 'debugDraw'
	});
}

// Phaser base configuration
let config = {
	type: Phaser.WEBGL,
	scale: {
		parent: 'content',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		width: window.CONFIG.gameWidth,
		height: window.CONFIG.gameHeight
	},
	title: 'Lack Luster',
	backgroundColor: '#536b5d',
	plugins: {
		scene: scenePlugins
	},
	physics: {
		default: 'arcade',
		debug: __DEV__,
		arcade: {
			gravity: { y: 0 }
		}
	},
	input: {
		gamepad: true
	},
	render: {
		pixelArt: true
	}
};

// Create the primary game object and attach to the global 'window' object
window.game = new Phaser.Game(config);

// Register and start the main scene
window.game.scene.add('ControllerDebug', ControllerDebug, false);
window.game.scene.add('GameOver', GameOver, false);
window.game.scene.add('PauseScene', PauseScene, false);
window.game.scene.add('GameScene', GameScene, false);
window.game.scene.add('Level1', Level1, false);
window.game.scene.add('StartScene', StartScene, false);
window.game.scene.start('StartScene');
