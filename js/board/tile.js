class Tile{
    constructor(x,y,playable, piece){
        this.x = x;
        this.y = y;
        this.playable = playable;
        this.piece = (piece != null)? piece : null;
    }
}

export { Tile }