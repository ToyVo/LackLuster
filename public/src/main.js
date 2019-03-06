/* global GameScene */

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
  backgroundColor: '#434343',
  plugins: {
    scene: scenePlugins
  },
  physics: {
    default: 'arcade',
    debug: __DEV__,
    arcade: {
      gravity: { y: 0 }
    }
  }
};

// Create the primary game object and attach to the global 'window' object
window.game = new Phaser.Game(config);

// Register and start the main scene
window.game.scene.add('GameOver', GameOver, false);
window.game.scene.add('PauseScene', PauseScene, false);
window.game.scene.add('MainScene', GameScene, false);
window.game.scene.start('MainScene');
