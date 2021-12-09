import { Player } from "./player.js"

class Random extends Player {
    constructor(color){
        super("random",color);
    }

    select_tile(){
        let index = Math.round(Math.random()*(this.playable_tile_list.length-1))
        return this.playable_tile_list[index];
    }

    move(game){
        let tile = this.select_tile();
        game.board.add_piece(tile.x, tile.y, this);
        game.board.find_playable(this.opponent);
        game.change_player();
    }
}

export { Random }