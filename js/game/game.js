import { Board } from '../board/board.js'
import { Tile } from '../board/tile.js'
import { Sim } from '../player/sim.js'

class Game {
    constructor(player_1, player_2, board, move_id, actual_player) {

        this.actual_player = (actual_player != null)? actual_player: player_1;
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.board = (board != null)? board: this.new_board();
        this.move_id = (move_id != null)? move_id : 0;
    }

    play() {
        if (this.actual_player.playable_tile_list.length != 0) {
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
        //if (!(this.actual_player instanceof Sim)) this.board.load_board()
        this.actual_player = this.actual_player.opponent
        this.play()
    }

    end() {
        //console.log("partie terminée");
    }

    player_tab_init(board) {


        this.player_1.piece_list = [board.tab[3][4], board.tab[4][3]];
        this.player_1.playable_tile_list = [board.tab[2][3], board.tab[3][2], board.tab[4][5], board.tab[5][4]];

        this.player_2.piece_list = [board.tab[3][3], board.tab[4][4]];
        this.player_2.playable_tile_list = []


    }

    new_board() {
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

        let board = new Board(tab);

        this.player_tab_init(board);

        return board;
    }
}

export { Game }