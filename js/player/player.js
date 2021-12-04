class Player{
    constructor(name){
        if(this.constructor === Player){
            throw new TypeError('Abstract class "Player" cannot be instantiated directly');
        }
        this.name = name;
        this.piece_list = null;
        this.playable_tile_list = null;
    }

    move(){
        throw new Error('You must implement this function')
    }
}

export {Player}