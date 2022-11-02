/*
    SCROLL OBJECT:
        Writes a line of text to the screen with a given text color and background color. This
    text will scroll horizontally at a given speed. The text starts at args.x, args.y position 
    and when it hits the edge of the screen will wrap around to x=0, y=y+1 unless xbounds are specified. 

    Arguments:
        x: The starting x position
        y: The starting y position
        text: The text string to be printed
        color: The color of the characters
        background: The color behind the characters
        xmin: The minimum x bound
        xmax: The maximum x bound
        sticky: Whether the text is affected by scroll
        speed: speed that the text scrolls
        position: position that the text starts at (initalized at 0)
        dynamic: flag that the text is to be updated on event loop
*/

export default class Scroll{
    constructor(args){
        this.x = args.x-1;
        this.y = args.y-1;
        this.str = args.text.substring(1, args.text.length-1);
        this.color = args.color;
        this.background = args.background;
        this.xmin = args.xmin;
        this.xmac = args.xmax;
        this.sticky = args.sticky;
        this.speed = args.speed;
        this.position = 0;
        this.dynamic=true;
    }

    draw = (grid, scroll, time) => {
        console.log(`Scroll time = ${time}`)
        if(!(time % this.speed == 0)) return grid;
        let xpos = this.x;
        let ypos = this.y;
        if(!time){time=0};

        let textToPrint = this.str.substring(this.position) + this.str.substring(0, this.position);
        for(let i=0; i<textToPrint.length; i++){
            if (scroll <= this.y && scroll+19 > this.y && xpos >= 0 && xpos < 51){ // if first row of text is on screen
                grid[ypos][xpos] = {text: textToPrint[i], color: this.color, background: this.background}
                xpos++;
                if(xpos > 50){
                    xpos = 0;
                    ypos+=1
                }
            }
        }
        this.position++
        if(this.position === this.str.length) this.position=0;
        return grid;
    }
}
