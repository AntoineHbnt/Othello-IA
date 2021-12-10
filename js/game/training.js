/* import { Computer } from '../player/computer.js'
import { Random } from '../player/random.js'
import { Tile } from '../board/tile.js'
import { Board } from '../board/board.js'

class Training {
    constructor(nb_game, depth) {
        this.player_1 = new Computer("black", depth);
        this.player_2 = new Random("white");
        this.actual_player = this.player_1;
        this.player_1.opponent = this.player_2;
        this.player_2.opponent = this.player_1
        this.move_id = 1;
        this.game_id = 1;
        this.nb_game = nb_game;
        this.depth = depth;
        this.board = this.new_board();
        this.ia_vic = 0;
        this.random_vic = 0;
        this.egalite = 0;
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
        this.actual_player = this.actual_player.opponent
        this.play()
    }

    score_update() {
        if (this.player_1.piece_list.length > this.player_2.piece_list.length) {
            this.ia_vic += 1;
        } else if (this.player_1.piece_list.length < this.player_2.piece_list.length) {
            this.random_vic += 1;
        } else this.egalite += 1;
        console.log("IA : " + this.ia_vic + " Random : " + this.random_vic + " Egalite : " + this.egalite);
    }

    end() {
        this.score_update();
        if (this.game_id < this.nb_game) {
            this.game_id += 1;
            console.log(this.game_id);
            this.actual_player = this.player_1;
            this.board = this.new_board()
            this.play();
        } else {
            console.log("Simulation terminé");
        }

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

export { Training } */