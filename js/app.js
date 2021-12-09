import { Game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Computer } from "./player/computer.js"
import { Random }  from "./player/random.js";
import { Training } from './game/training.js'



function training(){
    let nb_game = document.getElementById("nb_game").value;
    let depth = document.getElementById("depth").value;

    let test = new Training(nb_game, depth)
    test.play()
}


function app() {
    let player_1 = new Human("name1", "black");
    let player_2 = new Computer("white", 3);

    player_1.opponent = player_2;
    player_2.opponent = player_1;

    let game = new Training();
    game.play();

}

document.getElementById("validate").onclick = training()
window.training = training;