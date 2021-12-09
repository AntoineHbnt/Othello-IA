import { Game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Computer } from "./player/computer.js"
import { Random }  from "./player/random.js";

function app() {
    let player_1 = new Human("name1", "black");
    let player_2 = new Computer("white", 3);

    player_1.opponent = player_2;
    player_2.opponent = player_1;

    let game = new Game(player_1, player_2);
    game.play();

}

app();