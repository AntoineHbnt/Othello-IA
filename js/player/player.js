class Player{
    constructor(name, color){
        if(this.constructor === Player){
            throw new TypeError('Abstract class "Player" cannot be instantiated directly');
        }
        this.name = name;
        this.color = color;
        this.move_list = [];
        this.opponent = null;
        this.piece_list = null;
        this.playable_tile_list = null;
    }

    move(){
        throw new Error('You must implement this function')
    }
}

export {Player}