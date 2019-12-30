import * as Phaser from 'phaser';

export const centerGameObjects = (objects: Array<Phaser.GameObjects.Sprite>): void => {
    for (const obj of objects) {
        obj.setOrigin(0.5, 0.5);
    }
};

export const getGameWidth = (scene: Phaser.Scene): number => scene.game.scale.width;

export const getGameHeight = (scene: Phaser.Scene): number => scene.game.scale.height;
