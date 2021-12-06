import { Player } from "./player.js"

class Human extends Player {
    constructor(name, color) {
        super(name, color);
    }

    //Ajoute les evennement de click sur les cases jouable
    add_tile_event(game) {

        let board = game.board;
        
        //Sélection de la div board
        const board_div = document.getElementById("board");
        //Sélection des cases jouables
        const tiles = document.getElementsByClassName("clickable");
        
        function clickEvent(e, player) {
            const X = Math.floor((e.y - board_div.getBoundingClientRect().top) / (board_div.clientWidth / 8));
            const Y = Math.floor((e.x - board_div.getBoundingClientRect().left) / (board_div.clientWidth / 8));

            board.add_piece(X, Y, player);
            board.find_playable(player.opponent);
            game.change_player();
        }

        Array.from(tiles).forEach(tile => {
            //Ajout d'un évennement de 'click' sur les cases jouable
            tile.addEventListener('click', (e) => clickEvent(e, this));
        });
    }

    move(game) {
        this.add_tile_event(game);
    }

}

export { Human }