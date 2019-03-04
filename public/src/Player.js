/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "(Player)" }] */
/**
 * Main player class used in game
 *
 */
class Player extends Phaser.GameObjects.Sprite {
  /**
	 * player constuctor
	 * @param {Phaser.Game.scene} scene scene this object exists in (this)
	 * @param {*} x x Location
	 * @param {*} y y Location
	 * @param {*} texture texture key
	 */
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture);
    	scene.add.esisting(this);
  }

  update (keys) {

  }
}
