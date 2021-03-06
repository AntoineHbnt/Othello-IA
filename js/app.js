import { Game } from "./game/game.js"
import { Human } from "./player/human.js"
import { Computer } from "./player/computer.js"
import { Random } from "./player/random.js";

function progress_bar_update(nb_match, match_id) {
    if (document.getElementById("gen")) {
        console.log(match_id);
        let bar = document.getElementById("gen");
        bar.max = nb_match;
        bar.value = match_id;
    }
}

function training() {
    let game_id = 0;
    let nb_game = document.getElementById("nb_game").value;
    let depth = document.getElementById("depth").value;
    let ia_type = document.getElementById("ia_type").value;
    console.log(ia_type);
    let alphabeta_active = document.getElementById("alpha_beta_active").checked
    let ia_vic = 0;
    let rand_vic = 0;
    let egalite = 0;
    let nb_noeud_total = 0;

    let start_time = performance.now()
    let end_time;
    let calcul_time;
    let mean_calcul_time;
    

    function score_update(game) {
        let nb_piece_p1 = game.player_1.piece_list.length;
        let nb_piece_p2 = game.player_2.piece_list.length;
        nb_noeud_total += game.player_1.nb_noeud;
        if (nb_piece_p1 > nb_piece_p2) ia_vic += 1;
        else if (nb_piece_p2 > nb_piece_p1) rand_vic += 1;
        else rand_vic += 1;
    }

    function new_game() {
        game_id += 1;
        progress_bar_update(nb_game, game_id)

        let player_1 = new Computer("black", depth, ia_type, alphabeta_active);
        let player_2 = new Random("white");

        player_1.opponent = player_2;
        player_2.opponent = player_1;

        let game = new Game(player_1, player_2)
        game.play();
        score_update(game);
    }

    while (game_id < nb_game) {

        if (game_id % 10 == 0) {
            end_time = performance.now()
            calcul_time = Math.round(((end_time - start_time) / 1000) * 1000) / 1000
            mean_calcul_time = Math.round((calcul_time / nb_game) * 1000) / 1000
            console.log('\//////////!\\ ('+game_id+') //!\\\\\\\\\\\/');
            console.log("Nombre de victoires :");
            console.log("Ia : " + ia_vic + " ( " + (Math.round(((ia_vic / game_id) * 100) * 100) / 100) + "% ) ");
            console.log("Temp de calcul : " + calcul_time + "s");
            console.log("Nombre de noeud g??n??r?? : "+nb_noeud_total);
        }

        new_game();
    }
    end_time = performance.now()
    calcul_time = Math.round(((end_time - start_time) / 1000) * 1000) / 1000
    mean_calcul_time = Math.round((calcul_time / nb_game) * 1000) / 1000
    console.log('\//////////!\\ ('+game_id+') //!\\\\\\\\\\\/');
            console.log("Nombre de victoires :");
            console.log("Ia : " + ia_vic + " ( " + (Math.round(((ia_vic / game_id) * 100) * 100) / 100) + "% ) ");
            console.log("Temp de calcul : " + calcul_time + "s");
            console.log("Nombre de noeud g??n??r?? : "+nb_noeud_total);

}


function app() {
    let player_1 = new Human("name1", "black");
    let player_2 = new Computer("white", 4);


    player_1.opponent = player_2;
    player_2.opponent = player_1;

    let game = new Game(player_1, player_2);
    game.play();
}

if (document.getElementById("board")) app();

window.training = training;