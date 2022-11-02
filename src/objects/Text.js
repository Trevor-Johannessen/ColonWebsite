/*
    TEXT OBJECT:
        Writes a line of text to the screen with a given text color and background color.
    The text starts at args.x, args.y position and when it hits the edge of the screen will wrap
    around to x=0, y=y+1 unless xbounds are specified. 

    Arguments:
        x: The starting x position
        y: The starting y position
        text: The text string to be printed
        color: The color of the characters
        background: The color behind the characters
        xmin: The minimum x bound
        xmax: The maximum x bound
        sticky: Whether the text is affected by scroll

*/

export default class Text{
    constructor(args){
        this.x = args.x-1;
        this.y = args.y-1;
        this.str = args.text.substring(1, args.text.length-1);
        this.color = args.color;
        this.background = args.background;
        this.xmin = args.xmin;
        this.xmac = args.xmax;
        this.sticky = args.sticky;
    }

    draw = (grid, scroll) => {
        let xpos = this.x;
        let ypos = this.y;

        for(let i=0; i<this.str.length; i++){
            if (scroll <= this.y && scroll+19 > this.y && xpos >= 0 && xpos < 51){ // if first row of text is on screen
                grid[ypos][xpos] = {text: this.str[i], color: this.color, background: this.background}
                xpos++;
                if(xpos > 50){
                    xpos = 0;
                    ypos+=1
                }
            }
        }
        return grid;
    }
}
