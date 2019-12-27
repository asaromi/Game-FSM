window.onload = function () {
    var config = {
        width: 484,
        height: 272,
        backgroundColor: '000000',
        scene: [Scene1, Scene2],
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    }

    var game = new Phaser.Game(config);
}