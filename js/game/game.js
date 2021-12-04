class Game{
    constructor(player_1, player_2, board, piece_list, playable_tile_list, move_list){
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.board = board;
        this.piece_list = piece_list;
        this.playable_tile_list = playable_tile_list;
    }
}

export {Game}