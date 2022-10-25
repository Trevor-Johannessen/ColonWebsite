function Terminal(props){

    let pixels = []
    for(let i=0; i<19; i++){
        let row = []
        for(let j=0; j<51; j++)
            row.push(
                <div 
                    id={`pixel-${j}-${i}`} 
                    key={`pixel-${j}-${i}`} 
                    className='pixel'
                />)
        pixels.push(
            <div
                className='row'
                key={`row-${i}`}
                id={`row-${i}`}>{row}
            </div>
        )
    }

            


    return(
        <div 
            id="Terminal"
            key="Terminal"
            >
            {pixels}
        </div>

    )
}

export default Terminal;