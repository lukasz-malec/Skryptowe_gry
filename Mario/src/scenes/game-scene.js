export class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {

    // tło jest darmowym gaming assetem ze strony https://craftpix.net/freebies/free-nature-backgrounds-pixel-art/
    // licencja : https://craftpix.net/file-licenses/
    this.load.image("bg", "assets/2.png");


    // pixelArt jako artStyle  
    // tileset oraz player tworzone wlasnorecznie korzystajac z LibreSprite
    // tileset to 1280x320, a pojedyczny kafelek oraz gracz to 16x16  
    this.load.image("tileset", "assets/tileset.png");
    this.load.image("player", "assets/player.png");


    // json zawierający informacje o warstwach oraz properties tilesetu, z programu Tiled
    this.load.tilemapTiledJSON("map", "assets/map.json");
   
    }


  create() {
    const map = this.make.tilemap({ key: "map" });

    this.add.image(0, 0, "bg").setOrigin(0, 0).setScrollFactor(0.3).setDisplaySize(map.widthInPixels, map.heightInPixels);

    const tileset = map.addTilesetImage("tileset", "tileset");
    if (!tileset)
    {
      console.error("Tileset nie załadowany!");
      return;
    }

    const groundLayer = map.createLayer("Ground", tileset, 0, 0);
    groundLayer.setCollisionByProperty({ collides: true });

    this.spikesLayer = map.createLayer("spikes", tileset, 0, 0);
    this.spikesLayer.setCollision([1274, 1275, 1363, 1364]);

    map.createLayer("meta", tileset, 0, 0);

    this.player = this.physics.add.image(96, 20, "player");
    this.player.setBodySize(16, 28);
    this.physics.add.collider(this.player, groundLayer);


    // gracz nie moze wyjsc z ekranu po lewej, prawej i od góry 
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels * 10, true, true, true, false);
    this.player.setCollideWorldBounds(true);


    // kamera sledzi gracza
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.mapHeight = map.heightInPixels;
    this.isDead = false;
  }

  die() {
    if (this.isDead)
      return;


    this.isDead = true;
    this.player.setVelocity(0, 0);

    this.time.delayedCall(100, () => {
      this.scene.start("GameOverScene");
    });
  }

  win() {
    if (this.isDead)
      return;

    this.isDead = true;
    this.player.setVelocity(0, 0);

    this.time.delayedCall(500, () => {
      this.scene.start("WinScene");
    });
  }

  update() {
    if (this.isDead)
      return;

    if (this.player.y > this.mapHeight + 50)
    {
      this.die();
      return;
    }


    // szpikulce (przeszkody) 
    const spikeTile = this.spikesLayer.getTileAtWorldXY(this.player.x, this.player.y);
    if (spikeTile && [1274, 1275, 1363, 1364].includes(spikeTile.index)) {
      this.die();
      return;
    }

    // flaga (meta)
    // sprawdzanie hitboxa
    const flagX = 79 * 16;
    const flagY = 17 * 16;
    if (  this.player.x > flagX - 16 && this.player.x < flagX + 32
          && this.player.y > flagY - 16 && this.player.y < flagY + 48)
    {
      this.win();
      return;
    }

    const speed = 160;

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-speed);
    }
    
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(speed);
    } 
    else
    {
      this.player.setVelocityX(0);
    }

    
    if (this.cursors.up.isDown && this.player.body.blocked.down)
    {
      this.player.setVelocityY(-350 );
    }
  }
}