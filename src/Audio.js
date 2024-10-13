/**
 * sets up all animations for use
 * @param {import("phaser").Scene} scene
 */
export const setupSound = (scene) => {
  scene.mainTheme = scene.sound.add("mainTheme", {
    volume: 0.4,
    rate: 1,
    loop: true,
  });

  scene.levelOne = scene.sound.add("levelOne", {
    volume: 0.7,
    rate: 0.8,
    loop: true, // Check
  });

  scene.levelTwo = scene.sound.add("levelTwo", {
    volume: 0.5,
    rate: 2,
    loop: true, // Check
  });

  scene.levelThree = scene.sound.add("levelThree", {
    volume: 0.4,
    rate: 0.53,
    loop: true,
  });

  scene.pillarUp = scene.sound.add("powerUp", {
    volume: 0.6,
    rate: 2.75,
    loop: false,
  });

  scene.spikeTrap = scene.sound.add("spike", {
    volume: 0.3,
    rate: 1,
    loop: false,
  });
};
