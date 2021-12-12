/*******************************************************
 * Copyright (C) 2021-2022 HUBINET Antoine <ahub.job@outlook.fr>
 * 
 * This file is part of 'OTHELLO IA'.
 * 
 * 'OTHELLO IA' can not be copied and/or distributed without the express
 * permission of HUBINET Antoine
 *******************************************************/

 function containsTile(obj, list) {
    var i;
    for (let e of list) {
        if (obj.x == e.x && obj.y == e.y) {
            return true;
        }
    }

    return false;
}

class Board {
    constructor(tab) {
        this.tab = tab;
        this.width = 800;
        this.square_size = this.width / 8;
    }

    //Dessine le plateau de jeu au début de la partie
    draw_board() {
        const boardDiv = document.querySelector("#board");

        boardDiv.innerHTML += '<canvas width=' + this.width + ' height=' + this.width + ' class="canvas""></canvas>';
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ctx.fillStyle = ((i + j) % 2) ? "#76993E" : "#B7CC94";
                ctx.fillRect(i * this.square_size, j * this.square_size, this.square_size, this.square_size);
            }
        }
    }

    //charge le plateau de jeu
    load_board() {
        const tiles_div = document.querySelector("#tiles-container");
        tiles_div.innerHTML = "";

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                tiles_div.innerHTML += '<div id="square-' + i + '' + j + '" class="tile"></div>'
                const tile_div = document.querySelector('#square-' + i + '' + j + '');
                switch (this.tab[i][j].piece) {
                    case "white":
                        tile_div.innerHTML += '<div class="piece white" ></div>';
                        break;
                    case "black":
                        tile_div.innerHTML += '<div class="piece black" ></div>';
                        break;

                    default:
                        if (this.tab[i][j].playable) {
                            tile_div.innerHTML += '<div class="playable"></div>';
                            tile_div.classList.add("clickable");
                        }
                        break;
                }
            }
        }
    }

    //ajoute une piece sur le plateau
    add_piece(x, y, player) {
        let tile = this.tab[x][y];

        function update_piece_list() {
            player.piece_list.push(tile);

            player.playable_tile_list.forEach((t) => {
                t.playable = false;
            });

            player.playable_tile_list = [];
        }

        player.move_list.push([x, y]);
        tile.playable = false;
        tile.piece = player.color;

        update_piece_list();
        this.update_piece(x, y, player);
    }

    //Met a jour les éléments du plateau suite a l'ajout d'une piece
    update_piece(x, y, player) {
        let board = this;

        function direction_search(tile_x, tile_y, i, j) {
            let temp = [];
            while (true) {
                if(!containsTile(board.tab[tile_x][tile_y], temp)) temp.push(board.tab[tile_x][tile_y]);
                tile_x += i;
                tile_y += j;
                if ((tile_x < 8) && (tile_x >= 0) && (tile_y < 8) && (tile_y >= 0)) {
                    let tile_test = board.tab[tile_x][tile_y];
                    if(tile_test.piece == board.tab[x][y].piece){
                        return temp;
                    }
                    else if(tile_test.piece == null) return [];
                } else {
                    return [];
                }
            }
        }

        function switch_piece(tile_list) {
            tile_list.forEach((t) => {
                t.piece = player.color;
                player.piece_list.push(t);
                let index = player.opponent.piece_list.indexOf(t)
                if (index > -1) {
                    player.opponent.piece_list.splice(index, 1);
                }
            });
        }

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((x + i < 8) && (x + i >= 0) && (y + j < 8) && (y + j >= 0)) {
                    let tile_test = this.tab[x + i][y + j];
                    if (tile_test.piece != this.tab[x][y].piece && tile_test.piece != null && !(i==0 && j==0)) {
                        switch_piece(direction_search(tile_test.x, tile_test.y, i, j));
                    }
                }
            }
        }
    }

    find_playable(player) {
        let board = this;

        function direction_search(player_color, tile_x, tile_y, i, j) {
            while (true) {
                tile_x += i;
                tile_y += j;
                if ((tile_x < 8) && (tile_x >= 0) && (tile_y < 8) && (tile_y >= 0)) {
                    let tile_test = board.tab[tile_x][tile_y];
                    if(tile_test.piece == null){
                        tile_test.playable = true;
                        if(!containsTile(tile_test, player.playable_tile_list)) player.playable_tile_list.push(tile_test);
                        return tile_test;
                    }
                    else if(tile_test.piece == player_color) return [];
                } else {
                    return [];
                }
            }
        }
        for (let tile of player.piece_list) {
            let x = tile.x;
            let y = tile.y;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if ((x + i < 8) && (x + i >= 0) && (y + j < 8) && (y + j >= 0)) {
                        let tile_test = this.tab[x + i][y + j];
                        if (tile_test.piece != tile.piece && tile_test.piece != null && !(i==0 && j==0)) {
                            direction_search(tile.piece, tile.x+i, tile.y+j, i, j);
                        }
                    }
                }
            }
        }

    }
}

export { Board }