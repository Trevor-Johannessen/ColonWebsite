//import '../../fonts/MinecraftRegular-Bmg3.otf'

function Terminal(props){
    let cursor = [1,1];
    let grid = [...Array(19)].map(_=>Array(51).fill({text: "", color: "", background: ""}));
    let textColor = 'white'
    let backgroundColor = 'black'
    let colorConvert = {
            '0': 'white',
            '1': 'orange',
            '2': 'magenta',
            '3': 'lightblue',
            '4': 'yellow',
            '5': 'lime',
            '6': 'pink',
            '7': 'grey',
            '8': 'lightgrey',
            '9': 'cyan',
            'a': 'purple',
            'b': 'blue',
            'c': 'brown',
            'd': 'green',
            'e': 'red',
            'f': 'black',
            'white': '0',
            'orange': '1',
            'magenta': '2',
            'lightblue': '3',
            'yellow': '4',
            'lime': '5',
            'pink': '6',
            'grey': '7',
            'lightgrey': '8',
            'cyan': '9',
            'purple': 'a',
            'blue': 'b',
            'brown': 'c',
            'green': 'd',
            'red': 'e',
            'black': 'f'

        }
    
    /*  Writes formatted text to the terminal starting at cursor position

        Arguments:
            text: text to write to screen
            color: string of colors to use for each character, formatted using hex characters
            background: string of colors for each background, formatted using hex characters

            NOTE: ALL ARGUMENTS MUST BE THE SAME LENGTH!
    */
    function blit(text, color, background){
        if(!(text.length === color.length && color.length === background.length)) throw "Exception: All strings must be of same size";
        let length = text.length
        text = {...text};
        color = {...color};
        background = {...background}
        let xpos = cursor[0];
        let ypos = cursor[1];
        for(let i=0; i<length; i++){
            grid[ypos][xpos] = {text: text[i], color: colorConvert[color[i]], background: colorConvert[background[i]]}
            if(++xpos == 51) {xpos = 0; ypos++;}
        }
    }

    /*    Create a pixel array to initalize the terminal.
    */
    let createPixels = () => {
        let pixels = []
        for(let i=0; i<19; i++){
            let row = []
            for(let j=0; j<51; j++){
                let style = {
                    color: grid[i][j].color,
                    backgroundColor: grid[i][j].background
                }
                row.push(
                    <div 
                        id={`pixel-${j}-${i}`} 
                        key={`pixel-${j}-${i}`} 
                        className='pixel'
                        style={style}
                    >{grid[i][j].text}</div>)
            }
            pixels.push(
                <div
                    className='row'
                    key={`row-${i}`}
                    id={`row-${i}`}>
                    {row}
                </div>
            )
        }
        return pixels
    }
    return(
        <div 
            id="Terminal"
            key="Terminal"
            >
            {createPixels()}
        </div>

    )
}

export default Terminal;