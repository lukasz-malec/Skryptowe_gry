export class GameOverScene extends Phaser.Scene {

  constructor() {
    super({ key: "GameOverScene" });
  }


  // scena (ekran) jak gracz przegra (utrata zycia, przeszkody, upadek do dziury)
  // spacja zeby zagrac jeszcze raz

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 20, "GAME OVER",
    {
      fontFamily: "'Press Start 2P'",
      fontSize: "16px",
      color: "#ffffff",
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