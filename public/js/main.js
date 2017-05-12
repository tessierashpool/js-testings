PlayState = {};
PlayState.preload = function () {

};

PlayState.init = function () {
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT
    });
};

PlayState.create = function () {

    this.game.stage.backgroundColor = "#4488AA";
};

window.onload = function () {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', PlayState);
    game.state.start('play');
};
