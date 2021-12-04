/*******************************************************
 * Copyright (C) 2021-2022 HUBINET Antoine <ahub.job@outlook.fr>
 * 
 * This file is part of 'OTHELLO IA'.
 * 
 * 'OTHELLO IA' can not be copied and/or distributed without the express
 * permission of HUBINET Antoine
 *******************************************************/

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

    //Ajoute les evennement de click sur les cases jouable
    add_tile_event() {
        //Sélection de la div board
        const board_div = document.getElementById("board");
        //Sélection des cases jouables
        const tiles = document.getElementsByClassName("clickable");

        function clickEvent(e) {
            const X = Math.floor((e.y - board_div.getBoundingClientRect().top) / (board_div.clientWidth / 8));
            const Y = Math.floor((e.x - board_div.getBoundingClientRect().left) / (board_div.clientWidth / 8));

            move(X, Y, board);
        }

        Array.from(tiles).forEach(tile => {
            //Ajout d'un évennement de 'click' sur les cases jouable
            tile.addEventListener('click', (e) => clickEvent(e));
        });
    }
}

export { Board }