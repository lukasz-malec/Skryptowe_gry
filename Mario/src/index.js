import { GameScene } from "./scenes/game-scene.js";
import { GameOverScene } from "./scenes/game-over-scene.js";
import { WinScene } from "./scenes/game-win-scene.js";

const config = {
  width: 640,
  height: 320,
  pixelArt: true,
  parent: 'game',

  
  // gracz będzie skakał i spadał z różnych platform
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },

  scene: [GameScene, GameOverScene, WinScene],

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 320,
  },
};

const game = new Phaser.Game(config);

