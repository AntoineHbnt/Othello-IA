import { Player } from "./player.js"

class Sim extends Player {
    constructor(name, color, piece_list, playable_tile_list) {
        super(name, color);
        this.piece_list = piece_list;
        this.playable_tile_list = playable_tile_list;
    }

    move(game, tile) {
        game.board.add_piece(tile.x, tile.y, this);
        game.board.find_playable(this.opponent);
        game.change_player();
    }

}

export { Sim }