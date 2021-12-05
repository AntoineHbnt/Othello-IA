import { new_game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Board } from "./board/board.js"

function app() {
    let player_1 = new Human("name1", "black");
    let player_2 = new Human("name2", "white");
    new_game(player_1, player_2);
}

app();