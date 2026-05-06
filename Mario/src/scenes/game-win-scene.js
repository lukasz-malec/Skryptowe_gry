export class WinScene extends Phaser.Scene {

  constructor() {
    super({ key: "WinScene" });
  }


  // scena (ekran) jak gracz dojdzie do mety (flaga) na koncu mapy
  // spacja zeby zagrac jeszcze raz

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 20, "YOU WON!",
    {
      fontFamily: "'Press Start 2P'",
      fontSize: "16px",
      color: "#ffff00",
    }).setOrigin(0.5);



    this.add.text(width / 2, height / 2 + 20, "press space to play again",
    {
      fontFamily: "'Press Start 2P'",
      fontSize: "8px",
      color: "#aaaaaa",
    }).setOrigin(0.5);



    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }

}