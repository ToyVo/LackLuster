/* global Player */
class GameScene extends Phaser.Scene {
  // Pre-load function: queues all needed assets for downloading
  // (they are actually downloaded asynchronously, prior to 'create')
  preload () {
    this.load.spritesheet('slime_black_walking', 'assets/spritesheets/slime_walking_black.png', {frameWidth: 32, frameHeight: 32 });
    this.anims.create({
      key: 'slimeAnim',
      frames: this.anims.generateFrameNumbers('slime_black_walking', {start:0, end:8}),
      frameRate:12,
      repeat:-1,
    });
  }
  
  // Run after all loading (queued in preload) is finished
  create () {
    // Camera
    this.gameCamera = this.cameras.main;
    this.gameCamera.setBackgroundColor('#434343');
    this.gameCamera.setViewport(0, 0, 1920, 1080);
    this.cameras.main.setBounds(0, 0, 4800, 2700, true);

    let map = this.make.tilemap({key: 'Test3'});
    let tileSetImg = map.addTilesetImage('LL_tile_01_6x', 'LL_tile_01_6x');

    let backgroundlayer = map.createStaticLayer(0, [tileSetImg]);
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn");

    this.slimeGroup = this.physics.add.group({key: 'slime_black_walking'});
    let enemySpawn = map.createFromObjects("Objects", "EnemySpawn", {key:"slime_black_walking"});
    for (var i = 0; i < enemySpawn.length; i++) {
      //enemySpawn.body.setScale(3);
      this.slimeGroup.add(enemySpawn[i]); 
      this.physics.add.existing(enemySpawn[i]);
    }
    
    this.anims.play('slimeAnim', enemySpawn);
    //Only need to specify the object layers name, no need to create it
    //this.groundLayer = this.map.createLayer('Pillars');
    // Physics
    this.physics.world.setBounds(0, 0, 6500, 4400, true, true, true, true);

    // Player
    this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
    this.gameCamera.startFollow(this.player, false, 0.5, 0.5);

		// key inputs
		this.keys = {
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
			down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
			left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
			w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		};

    this.pillarGroup = this.physics.add.group({key: 'pillarCollide', frameQuantity: 350});
    this.pillarGroup.children.iterate(function (child) {
      child.setImmovable(true);
      child.setScale(3)
    });
    let circle = new Phaser.Geom.Circle( 4800, 2600, 4800);
    Phaser.Actions.RandomCircle(this.pillarGroup.getChildren(), circle);
    
    this.dashAnimTest = this.physics.add.sprite(100, 100, 'frameTest').setScale(2).setImmovable(true);
    this.dashAnim = game.anims.create({
      key: 'dash',
      frames: game.anims.generateFrameNumbers('frameTest', {start:0, end:4}),
      frameRate:5,
      repeat:-1,
    });
    this.dashAnimTest.anims.play('dash'); //Context of this changes in the callback below, Beware!
    this.physics.add.collider(this.pillarGroup.getChildren(), this.player,this.player.takeDamage, null, this);
    this.physics.add.collider(this.player, backgroundlayer);
    backgroundlayer.setCollisionByProperty({collides:true});
    
    Phaser.Actions.Call(this.slimeGroup.getChildren(), function(child) {
      child.body.setVelocityX(-100); // ACTUALLY WORKS YES, Appears to be a one time method call
    }); //so we get no weird overriding -100 velocityX in our update
    this.physics.add.collider(this.slimeGroup.getChildren(), this.player, this.player.takeDamage, null, this);
    this.physics.add.collider(this.slimeGroup.getChildren(), backgroundlayer, slimeMove, null, this);
		// Pause Game
		this.input.keyboard.on('keyup_ESC', function (event) {
			this.scene.run('PauseScene');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('GameScene');
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
    } 

    function slimeMove() {
      this.slimeGroup.children.iterate(function (child) {
        child.body.setImmovable(true);
        if (child.body.touching.right || child.body.blocked.right) {
          child.body.velocity.y = 300; 
          child.body.velocity.x = 0; // turn down
        } else if (child.body.touching.left || child.body.blocked.left) {
          child.body.velocity.y = -300; // turn up
          child.body.velocity.x = 0;
        } else if (child.body.touching.up || child.body.blocked.up) {
          child.body.velocity.y = 0; 
          child.body.velocity.x = 300; // turn right
        } else if (child.body.touching.down || child.body.blocked.down) {
          child.body.velocity.y = 0;
          child.body.velocity.x = -300; // turn left
        } 
      });
    }
  }
  


	update (time, delta) {
    this.player.update(this.keys, time, delta);
    //Behold the terrifying moving pillars of DOOM, must be in update
    //or they will not follow the playeres new X,Y position as they 
    //move about in the world
    Phaser.Actions.Call(this.pillarGroup.getChildren(), function(child) {
      this.physics.moveToObject(child, this.player, 20);
    }, this);
    
	}
}

// Ensure this is a globally accessible class
window.GameScene = GameScene;
