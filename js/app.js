import { Game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Computer } from "./player/computer.js"
import { Random } from "./player/random.js";



function training() {
    let game_id = 0;
    let nb_game = document.getElementById("nb_game").value;
    let depth = document.getElementById("depth").value;
    let ia_vic = 0;
    let rand_vic = 0;
    let egalite = 0;

    function score_update(game) {
        let nb_piece_p1 = game.player_1.piece_list.length;
        let nb_piece_p2 = game.player_2.piece_list.length;
        if (nb_piece_p1 > nb_piece_p2) ia_vic += 1;
        else if (nb_piece_p2 > nb_piece_p1) rand_vic += 1;
        else rand_vic += 1;
    }

    function new_game() {
        game_id += 1;

        let player_1 = new Computer("black", depth);
        let player_2 = new Random("white");

        player_1.opponent = player_2;
        player_2.opponent = player_1;

        let game = new Game(player_1, player_2)
        game.play();
        score_update(game);
    }

    while(game_id < nb_game) {
        new_game();
    }
    console.log("IA : " + ia_vic + " rand : " + rand_vic + " egalite : " + egalite);

}


function app() {
    let player_1 = new Human("name1", "black");
    let player_2 = new Computer("white", 3);


    player_1.opponent = player_2;
    player_2.opponent = player_1;

    let game = new Game(player_1, player_2);
    game.play();

}

window.training = training;
window.app = app;