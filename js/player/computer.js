import { Board } from "../board/board.js";
import { Tile } from "../board/tile.js";
import { Game } from "../game/game.js";
import { Player } from "./player.js"
import { Sim } from "./sim.js";

function game_clone(original_game) {

    function tile_list_clone(list) {
        let copy = []
        for (let e of list) {
            copy.push(new Tile(e.x, e.y, e.playable, e.piece));
        }
        return copy;
    }

    function board_clone() {
        let copy = []
        original_game.board.tab.forEach(e => {
            copy.push(tile_list_clone(e));
        })
        return copy;
    }

    let tab_copy = board_clone()

    let p1_piece_list = tile_list_clone(original_game.actual_player.piece_list)
    let p2_piece_list = tile_list_clone(original_game.actual_player.opponent.piece_list)
    let p1_playable_tile_list = tile_list_clone(original_game.actual_player.playable_tile_list)
    let p2_playable_tile_list = tile_list_clone(original_game.actual_player.opponent.playable_tile_list)


    let p1_copy = new Sim("sim1", original_game.actual_player.color, p1_piece_list, p1_playable_tile_list);
    let p2_copy = new Sim("sim2", original_game.actual_player.opponent.color, p2_piece_list, p2_playable_tile_list);

    p1_copy.opponent = p2_copy;
    p2_copy.opponent = p1_copy;

    let move_id_copy = original_game.move_id

    let board_copy = new Board(tab_copy);

    return new Game(p1_copy, p2_copy, board_copy, move_id_copy);
}

class Computer extends Player {
    constructor(color, depth, strategie, alphabeta_active) {
        super("minimax", color);
        this.depth = depth;
        this.strategie = strategie;
        this.alphabeta_active = alphabeta_active;
        this.nb_noeud = 0;
    }

    game_over(game) {
        if (game.actual_player.playable_tile_list.length != 0) {
            return false
        }
        else {
            game.board.find_playable(game.actual_player.opponent);
            if (game.actual_player.opponent.playable_tile_list.length == 0) {
                return true
            }
            return false
        }
    }


    minimax(original_game, depth, alpha, beta, maximizing_player) {
        let index = 0;
        this.nb_noeud += 1;

        if (depth == 0 || this.game_over(original_game)) {
            switch (this.strategie) {
                case 1:
                    return this.positionelle(original_game);
                case 2:
                    return this.absolu(original_game);
                case 3:
                    return this.mobilite(original_game);
                default:
                    return this.mixte(original_game);
            }
        }

        if (maximizing_player) {
            let max_eval = -Infinity;
            for (let i = 0; i < original_game.actual_player.playable_tile_list.length; i++) {
                let game = game_clone(original_game)
                let tile_test = original_game.actual_player.playable_tile_list[i];
                game.actual_player.move(game, tile_test);
                game.actual_player = game.actual_player.opponent;
                let eval_result = this.minimax(game, depth - 1, alpha, beta, false)
                if (max_eval <= eval_result) {
                    max_eval = eval_result;
                    index = i;
                }
                alpha = Math.max(alpha, eval_result);
                if (this.alphabeta_active && beta <= alpha) break;
            }
            return (depth == this.depth) ? this.playable_tile_list[index] : max_eval;
        }

        else {
            let min_eval = Infinity;
            for (let i = 0; i < original_game.actual_player.playable_tile_list.length; i++) {
                let game = game_clone(original_game)
                let tile_test = original_game.actual_player.playable_tile_list[i];
                game.actual_player.move(game, tile_test);
                game.actual_player = game.actual_player.opponent;
                let eval_result = this.minimax(game, depth - 1, alpha, beta, true)
                if (min_eval >= eval_result) {
                    min_eval = eval_result;
                    index = i;
                }
                beta = Math.min(beta, eval_result);
                if (this.alphabeta_active && beta <= alpha) break;
            }
            return (depth == this.depth) ? this.playable_tile_list[index] : min_eval;
        }


    }

    positionelle(game) {

        let matrice = 
        [
            [500, -150, 30, 10, 10, 30, -150, 500],
            [-150, -250, 0, 0, 0, 0, -250, -150],
            [30, 0, 1, 2, 2, 1, 0, 30],
            [10, 0, 2, 16, 16, 2, 0, 10],
            [10, 0, 2, 16, 16, 2, 0, 10],
            [30, 0, 1, 2, 2, 1, 0, 30],
            [-150, -250, 0, 0, 0, 0, -250, -150],
            [500, -150, 30, 10, 10, 30, -150, 500]
        ];

        function get_score(){
            let score = 0;
            for (let tile of game.actual_player.piece_list){
                score += matrice[tile.x][tile.y];
            }

            return score
        }

        return get_score();
    }

    absolu(game) {
        return game.actual_player.piece_list.length
    }

    mobilite(game) {
        return game.actual_player.playable_tile_list.length
    }

    mixte(game){
        if(game.move_id <= 20) return this.positionelle(game)
        else if(game.move_id <= 44) return this.mobilite(game)
        else return this.absolu(game)
    }


    move(game) {
        let game_copy = game_clone(game);
        let tile = this.minimax(game_copy, this.depth, -Infinity, Infinity, true);
        game.board.add_piece(tile.x, tile.y, this);
        game.board.find_playable(this.opponent);
        game.change_player();

    }

}

export { Computer }