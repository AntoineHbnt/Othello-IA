class Tile{
    constructor(x,y,playable){
        this.x = x;
        this.y = y;
        this.playable = playable;
        this.piece = null;
    }
}

export { Tile }