class Game{
    constructor(player_1, player_2, board, piece_list, playable_tile_list, move_list, move_id){
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.board = board;
        this.piece_list = piece_list;
        this.playable_tile_list = playable_tile_list;
        this.move_list = move_list;
        this.move_id = move_id
    }

    move(){
        this.move_id++;
    }
}

function new_game(player_1, player_2){
    return new Game(
        player_1,
        player_2,
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 3, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 3, 0, 0],
            [0, 0, 0, 0, 3, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [[3, 4], [4, 3]],
            [[3, 3], [4, 4]]
        ],
        [
            [[2, 3], [3, 2], [4, 5], [5, 4]],
            []
        ],
        [],
        0
    )
}

export { new_game }