//import '../../fonts/MinecraftRegular-Bmg3.otf'

function Terminal(props){
    let cursor = [1,1];
    let grid = [...Array(19)].map(_=>Array(51).fill({text: "", color: "", background: ""}));
    
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