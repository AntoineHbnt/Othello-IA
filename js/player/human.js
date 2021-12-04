import { Player } from "./player.js"

class Human extends Player {
    constructor(name, color){
        super(name,color);
    }

    move(x,y,board){
        console.log(board);
        board.add_piece(x,y,this.color);
    }
}

export { Human }