import { Board } from "../board/board.js";
import { Tile } from "../board/tile.js";
import { Game } from "../game/game.js";
import { Player } from "./player.js"
import { Sim } from "./sim.js";

function game_clone(original_game){

    function tile_list_clone(list){
        let copy = []
        for(let e of list){
            copy.push(new Tile(e.x, e.y, e.playable));
        }
        return copy;
    }

    function board_clone(){
        let copy = []
        original_game.board.tab.forEach(e => {
            copy.push(tile_list_clone(e));
        })
        return copy;
    }

    let tab_copy = board_clone()

    let p1_piece_list = tile_list_clone(original_game.player_1.piece_list)
    let p2_piece_list = tile_list_clone(original_game.player_2.piece_list)
    let p1_playable_tile_list = tile_list_clone(original_game.player_1.playable_tile_list)
    let p2_playable_tile_list = tile_list_clone(original_game.player_2.playable_tile_list)


    let  p1_copy = new Sim("sim1", "black", p1_piece_list,p1_playable_tile_list);
    let  p2_copy = new Sim("sim2", "white", p2_piece_list,p2_playable_tile_list);

    p1_copy.opponent = p2_copy;
    p2_copy.opponent = p1_copy;

    let move_id_copy = original_game.move_id

    let board_copy = new Board(tab_copy);
    
    return   new Game(p1_copy, p2_copy, board_copy, move_id_copy);
}

class Computer extends Player {
    constructor(color, depth) {
        super("minimax", color);
        this.depth = depth;
    }

    

    minimax(original_game, depth, alpha, beta, maximizing_player) {
        let index = 0;
        let game = game_clone(original_game)

        if (depth == 0){
            return this.evaluation(game)
        }

        if (maximizing_player) {
            let max_eval = -Infinity;
            for (let i = 0; i < original_game.actual_player.playable_tile_list.length; i++) {
                let tile_test = original_game.actual_player.playable_tile_list[i];
                game.actual_player.move(game, tile_test);
                game.actual_player = game.actual_player.opponent;
                let eval_result = this.minimax(game, depth - 1, alpha, beta, false)
                if (max_eval < eval_result) {
                    max_eval = eval_result;
                    index = i;
                }
                alpha = Math.max(alpha, eval_result);
                if (beta <= alpha) break;
            }
            return (depth == this.depth) ? this.playable_tile_list[index] : max_eval;
        }

        else {
            let min_eval = Infinity;
            for (let i = 0; i < original_game.actual_player.playable_tile_list.length; i++) {
                let tile_test = original_game.actual_player.playable_tile_list[i];
                game.actual_player.move(game, tile_test);
                game.actual_player = game.actual_player.opponent;
                let eval_result = this.minimax(game, depth - 1, alpha, beta, true)
                if (min_eval > eval_result) {
                    min_eval = eval_result;
                    index = i;
                }
                alpha = Math.max(alpha, eval_result);
                if (beta <= alpha) break;
            }
            return (depth == this.depth) ? this.playable_tile_list[index] : min_eval;
        }


    }

    evaluation(game) {
        game.actual_player.playable_tile_list.length
    }

    move(game) {
        let game_copy = game_clone(game);
        console.log(game, game_copy);
        let tile = this.minimax(game_copy, this.depth, -Infinity, Infinity, true);
        console.log(game, game_copy);
        game.board.add_piece(tile.x, tile.y, this);
        game.board.find_playable(this.opponent);
        game.change_player();
    }

}

export { Computer }