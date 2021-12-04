import { new_game } from "./game/game.js"
import { Human } from "./player/human.js"

let player_1 = new Human("name1");
let player_2 = new Human("name2");

let game = new_game(player_1, player_2);

console.log(game);