import { new_game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Board } from "./board/board.js"

function app(){
    let player_1 = new Human("name1");
    let player_2 = new Human("name2");
    let game = new_game(player_1, player_2);
    let game_limit = 3;
    
    game.board.draw_board(document);   
    game.board.load_board(game.board);

    
    
    console.log(game);
}

app();