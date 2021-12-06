import { new_game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Board } from "./board/board.js"

function app() {
    let player_1 = new Human("name1", "black");
    let player_2 = new Human("name2", "white");

    player_1.opponent = player_2;
    player_2.opponent = player_1;

    let game = new_game(player_1, player_2);
    game.play();

}

app();