/**
 * utils.ts: Simple functions that help reduce code in places
 * throughout your game. Put short, reusable code snippits in here.
 * Don't forget to add them to 'window' at the end!
 */

/**
 * Set the origin of all passed in objects to be (0.5, 0.5) so they
 * are drawn around their own logical center.
 * @param objects An array of GameObjects objects to be centered.
 */
export function centerGameObjects(
  objects: Array<Phaser.GameObjects.Sprite>
): void {
  objects.forEach((object: Phaser.GameObjects.Sprite) =>
    object.setOrigin(0.5, 0.5)
  );
}

/**
 * Retieve the currently configured game width (likely set when the Phaser.Game was created)
 * @param scene Scene object to use to retrieve the game config width
 */
export function gameWidth(scene: Phaser.Scene): number {
  return +scene.sys.game.config.width;
}

/**
 * Retieve the currently configured game height (likely set when the Phaser.Game was created)
 * @param scene Scene object to use to retrieve the game config height
 */
export function gameHeight(scene: Phaser.Scene): number {
  return +scene.sys.game.config.height;
}

/**
 * Retieve the horizontal center of the world for the current scene
 * If the main camera has bounds, it will use those.  Otherwise, returns the width of the
 * configured game bounds divided by 2.
 * @param scene Scene object to use to get horizontal center
 */
export function centerX(scene: Phaser.Scene): number {
  if (scene.cameras.main.useBounds) {
    return scene.cameras.main.getBounds().width / 2;
  } else {
    return gameWidth(scene) / 2;
  }
}

/**
 * Retieve the vertical center of the world for the current scene
 * If the main camera has bounds, it will use those.  Otherwise, returns the height of the
 * configured game bounds divided by 2.
 * @param scene Scene object to use to get vertical center
 */
export function centerY(scene: Phaser.Scene): number {
  if (scene.cameras.main.useBounds) {
    return scene.cameras.main.getBounds().height / 2;
  } else {
    return gameHeight(scene) / 2;
  }
}
