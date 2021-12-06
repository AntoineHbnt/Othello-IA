import { Board } from "../board/board.js";
import { Tile } from "../board/tile.js"
import { Human } from "../player/human.js";

class Game {
    constructor(player_1, player_2, board, move_id) {

        this.actual_player = player_1;
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.board = board;
        this.move_id = -1;
    }

    play() {
        if (this.actual_player.playable_tile_list.length != 0){
            this.actual_player.move(this);
            this.move_id++;
        }
        else {
            this.board.find_playable(this.actual_player.opponent);
            if (this.actual_player.opponent.playable_tile_list.length == 0) 
                this.end();
            else this.change_player();
        }
    }

    change_player() {
        this.board.load_board()
        this.actual_player = this.actual_player.opponent
        this.play()
    }

    end(){
        console.log("partie terminée");
    }


}

function new_game(player_1, player_2) {

    function new_board() {
        let tab = []

        for (let i = 0; i < 8; i++) {
            tab.push([]);
            for (let j = 0; j < 8; j++) {
                tab[i].push(new Tile(i, j, false))
            }
        }

        tab[3][4].piece = "black";
        tab[4][3].piece = "black";
        tab[3][3].piece = "white";
        tab[4][4].piece = "white";

        tab[2][3].playable = true;
        tab[3][2].playable = true;
        tab[4][5].playable = true;
        tab[5][4].playable = true;

        return new Board(tab);
    }

    let board = new_board();
    board.draw_board();
    board.load_board();1

    player_1.piece_list = [board.tab[3][4], board.tab[4][3]];
    player_1.playable_tile_list = [board.tab[2][3], board.tab[3][2], board.tab[4][5], board.tab[5][4]];

    player_2.piece_list = [board.tab[3][3], board.tab[4][4]];
    player_2.playable_tile_list = []

    return new Game(player_1, player_2, board)
}

export { new_game }