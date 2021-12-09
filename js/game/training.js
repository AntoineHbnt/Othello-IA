import { Computer } from '../player/computer'
import { Random } from '../player/random'

class Training {
    constructor(nb_game){
        this.actual_player = player_1;
        this.player_1 = new Computer;
        this.player_2 = new Random;
        this.board = new_board();
        this.nb_game = nb_game;
    }

    play(){
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
        this.actual_player = this.actual_player.opponent
        this.play()
    }

    end() {
        console.log("partie terminée");
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

        board.draw_board();
        board.load_board();

        this.player_tab_init(board);

        return board;
    }
}