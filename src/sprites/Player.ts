import { game } from '../main';

/**
 * Main player class used in game
 */
export class Player extends Phaser.GameObjects.Sprite {
    private playerHurt: Phaser.Sound.BaseSound;
    private playerDeath: Phaser.Sound.BaseSound;
    private footsteps: Phaser.Sound.BaseSound;
    private dashDash: Phaser.Sound.BaseSound;

    private healthCenter: Phaser.GameObjects.Sprite;
    private healthLeft: Phaser.GameObjects.Sprite;
    private healthRight: Phaser.GameObjects.Sprite;

    public body: Phaser.Physics.Arcade.Body;

    private damageCoolDown = 0;
    public health = 6;
    private rollCoolDown = 50;
    public velocity = 600;
    private lastDirection = 'down';
    private lastTexture = 'player_front';
    private lastAnim = 'player_walk_front_anim';
    private lastDashAnim = 'playerDashDown';

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setScale(5);
        this.setDepth(10);
        this.anims.play('player_walk_front_anim');

        scene.physics.world.enable(this);
        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setSize(14, 10); // Adjusting y value on the collider
        this.body.setOffset(0, 14);

        this.healthCenter = scene.add
            .sprite(x, y, 'health_orb')
            .setScale(4, 4)
            .setDepth(100);
        this.healthRight = scene.add
            .sprite(x, y, 'health_orb')
            .setScale(4, 4)
            .setDepth(100);
        this.healthLeft = scene.add
            .sprite(x, y, 'health_orb')
            .setScale(4, 4)
            .setDepth(100);

        this.playerHurt = game.sound.add('playerH', {
            volume: 0.8,
            rate: 1,
            loop: false,
        });
        this.playerDeath = game.sound.add('playerD', {
            volume: 0.7,
            rate: 1.3,
            loop: false,
        });
        this.footsteps = game.sound.add('walk', {
            volume: 0.05,
            rate: 1.25,
            loop: false,
        });
        this.dashDash = game.sound.add('dash', {
            volume: 0.3,
            rate: 1,
            loop: false,
        });
    }

    update(_time: number, delta: number): void {
        // this.velocity = 600;
        this.body.setVelocity(0, 0);
        this.body.setAcceleration(0, 0);

        // key inputs
        const keys = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            w: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        };

        let input;
        let gamepad;

        if (this.scene.input.gamepad.total !== 0) {
            gamepad = this.scene.input.gamepad.getPad(0);
        }

        if (gamepad != null) {
            input = {
                left: keys.left.isDown || keys.a.isDown || gamepad.leftStick.x === -1, // analog stick left
                right: keys.right.isDown || keys.d.isDown || gamepad.leftStick.x === 1, // analog stick right
                down: keys.down.isDown || keys.s.isDown || gamepad.leftStick.y === 1, // analog stick down
                up: keys.up.isDown || keys.w.isDown || gamepad.leftStick.y === -1, // analog stick up
                space: keys.space.isDown || gamepad.buttons[0].pressed, // left button, right button is index 1
            };
        } else {
            input = {
                left: keys.left.isDown || keys.a.isDown,
                right: keys.right.isDown || keys.d.isDown,
                down: keys.down.isDown || keys.s.isDown,
                up: keys.up.isDown || keys.w.isDown,
                space: keys.space.isDown,
            };
        }

        if (input.left) {
            if (!this.footsteps.isPlaying) {
                this.footsteps.play();
            }
            this.body.setVelocityX(-this.velocity);
            this.lastDirection = 'left';
        } else if (input.right) {
            if (!this.footsteps.isPlaying) {
                this.footsteps.play();
            }
            this.body.setVelocityX(this.velocity);
            this.lastDirection = 'right';
        } else if (input.up) {
            if (!this.footsteps.isPlaying) {
                this.footsteps.play();
            }
            this.body.setVelocityY(-this.velocity);
            this.lastDirection = 'up';
        } else if (input.down) {
            if (!this.footsteps.isPlaying) {
                this.footsteps.play();
            }
            this.body.setVelocityY(this.velocity);
            this.lastDirection = 'down';
        }

        if (input.up || input.down || input.left || input.right) {
            let anim;
            let dashAnim;
            switch (this.lastDirection) {
                case 'up':
                    anim = 'player_walk_back_anim';
                    dashAnim = 'playerDashUp';
                    break;
                case 'down':
                    anim = 'player_walk_front_anim';
                    dashAnim = 'playerDashDown';
                    break;
                case 'left':
                    anim = 'player_walk_left_anim';
                    dashAnim = 'playerDashLeft';
                    break;
                case 'right':
                    anim = 'player_walk_right_anim';
                    dashAnim = 'playerDashRight';
                    break;
            }
            if (anim != undefined && dashAnim != undefined && (anim !== this.lastAnim || !this.anims.isPlaying)) {
                this.lastAnim = anim;
                this.lastDashAnim = dashAnim;
                this.anims.play(anim);
            }
        } else {
            this.anims.stop();
            this.footsteps.stop();
            let texture;
            switch (this.lastDirection) {
                case 'up':
                    texture = 'player_back';
                    break;
                case 'down':
                    texture = 'player_front';
                    break;
                case 'left':
                    texture = 'player_left';
                    break;
                case 'right':
                    texture = 'player_right';
                    break;
            }
            if (texture != undefined) {
                this.lastTexture = texture;
                this.setTexture(texture);
            }
        }

        this.rollCoolDown -= delta;
        if (
            this.body.blocked.none &&
            this.body.touching.none &&
            this.body.wasTouching.none &&
            input.space &&
            this.rollCoolDown <= 0
        ) {
            this.velocity = 600;
            this.body.setVelocity(this.body.velocity.x * 3, this.body.velocity.y * 3);
            this.rollCoolDown = 1500;
            this.dashDash.play();
            this.anims.play(this.lastDashAnim);
        }

        this.damageCoolDown -= delta;
        if (this.damageCoolDown > 500) {
            this.velocity = -750; // Will simulate knock back to player
        }
        if (this.damageCoolDown <= 500) {
            this.velocity = 600; // Will reset move to normal
        }
        this.healthCenter.x = this.body.x + 35;
        this.healthCenter.y = this.body.y - 100;
        this.healthRight.x = this.body.x + 80;
        this.healthRight.y = this.body.y - 60;
        this.healthLeft.x = this.body.x - 10;
        this.healthLeft.y = this.body.y - 60;
        switch (this.health) {
            case 6:
                this.healthCenter.tint = 0xffffff;
                this.healthCenter.visible = true;
                this.healthRight.visible = true;
                this.healthRight.tint = 0xffffff;
                this.healthLeft.visible = true;
                this.healthLeft.tint = 0xffffff;
                break;
            case 5:
                this.healthRight.tint = 800 * 0xffffff;
                break;
            case 4:
                this.healthCenter.visible = true;
                this.healthRight.visible = false;
                this.healthLeft.visible = true;
                break;
            case 3:
                this.healthCenter.tint = 800 * 0xffffff;
                break;
            case 2:
                this.healthCenter.visible = false;
                this.healthRight.visible = false;
                this.healthLeft.visible = true;
                break;
            case 1:
                this.healthLeft.tint = 800 * 0xffffff;
                break;
            case 0:
                this.healthCenter.visible = false;
                this.healthRight.visible = false;
                this.healthLeft.visible = false;
                break;
        }
    }

    takeDamage(): void {
        this.tint = 0xffffff; // Will reset player color from damage
        // the context of this function is on player, please don't switch it back to being the scene so that we have to
        // do this.player on everything
        if (this.damageCoolDown < 0) {
            if (!this.playerHurt.isPlaying) {
                this.playerHurt.play();
            }
            this.scene.cameras.main.shake(50, 0.005);
            this.health--; // We need to do this.player.body as the context of this changes below
            this.damageCoolDown = 1000;
            for (let i = 0; i < 10; i++) {
                // Loop the color for an extra visual effect
                this.tint = Math.random() * 0xffffff;
            }
        }

        if (this.health <= 0) {
            this.playerDeath.play();
            this.scene.scene.run('GameOver');
            this.scene.scene.bringToTop('GameOver');
            this.scene.scene.pause('GameScene');
        }
        this.tint = 0xffffff; // Will reset player color from damage
    }
}
