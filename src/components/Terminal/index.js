import {parser} from './Interpreter';
import React from "react";
import './Terminal.css'

export default class Terminal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cursor: [1,1],
            grid: [...Array(19)].map(_=>Array(51).fill({text: "", color: "", background: ""})),
            textColor: 'white',
            backgroundColor: 'black',
            instructions: parser(this.props.instructions),
            scroll_position: 1,
            anchor: 19
        }
        this.time = 0;
    }

    /*    Create a pixel array to initalize the terminal.
    */
    createPixels = () => {
        let pixels = []
        for(let i=0; i<19; i++){
            let row = []
            for(let j=0; j<51; j++){
                let style = {
                    color: this.state.grid[i][j].color,
                    backgroundColor: this.state.grid[i][j].background
                }
                row.push(
                    <div 
                        id={`pixel-${j}-${i}`} 
                        key={`pixel-${j}-${i}`} 
                        className='pixel'
                        style={style}
                    >{this.state.grid[i][j].text}</div>)
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

    nextFrame(grid){
        //console.log(`Instructions = ${this.state.instructions}`)
        if(this.state.instructions){
            for(let i in this.state.instructions){
                //console.log(`Executing ${JSON.stringify(this.state.instructions[i])}`)
                if(this.state.instructions[i].dynamic){
                    //console.log(`Scroll = ${this.state.scroll_position}`)
                    this.state.instructions[i].draw(grid, this.state.scroll_position, this.time);
                }
            }
        }
        this.time++;
        return grid;
    }

    redraw(instructions, scroll_position){
        let grid = [...Array(19)].map(_=>Array(51).fill({text: "", color: "", background: ""}))
        for(let index in instructions){
            grid = instructions[index].draw(grid, scroll_position, 0)
        }
        return grid;
    }

    

    scroll = (event) => {
        this.setState(prevState => {
            //console.log(`DeltaY = ${event.deltaY}`)
            //console.log(`PrevState = ${prevState.scroll_position}`)
            let newScrollPos = prevState.scroll_position + event.deltaY <= 0 ? 0: prevState.scroll_position + event.deltaY
            newScrollPos = newScrollPos+19 > this.state.anchor ? this.state.anchor-19 : newScrollPos;


            return ({
            grid: this.redraw(prevState.instructions, newScrollPos),
            textColor: prevState.textColor,
            backgroundColor: prevState.backgroundColor,
            cursor: prevState.cursor,
            time: prevState.time,
            instructions: prevState.instructions,
            scroll_position: newScrollPos,
            anchor: prevState.anchor
        })});
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.instructions !==this.props.instructions){
            this.time = 0;
            let parsed_instructions = parser(this.props.instructions);

            let maximum = 19;
            for(let index in parsed_instructions){
                console.log(`instruction = ${parsed_instructions[index]}`)
                console.log(`Comparing ${maximum} to new value ${parsed_instructions[index].y}`)
                if(parsed_instructions[index].y && maximum < parsed_instructions[index].y)
                    maximum = parsed_instructions[index].y+1;
            }
            console.log(`maximum = ${maximum}`)

            this.setState(prevState => ({
                grid: this.redraw(parsed_instructions, 0),
                textColor: prevState.textColor,
                backgroundColor: prevState.backgroundColor,
                cursor: prevState.cursor,
                instructions: parsed_instructions,
                scroll_position: 0,
                anchor: maximum
            }))
        }
        console.log(`Anchor = ${this.state.anchor}`)
        
    }

    componentDidMount(){
        this.myInterval = setInterval(() => {

            this.setState(prevState => ({
                grid: this.nextFrame(prevState.grid),
                textColor: prevState.textColor,
                backgroundColor: prevState.backgroundColor,
                cursor: prevState.cursor,
                instructions: prevState.instructions,
                scroll_position: prevState.scroll_position
            })
        )}, 50
        )
    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    render(){
        return(
            <div
            id="Terminal"
            key="Terminal"
            onWheel={this.scroll}
            >
            {this.createPixels()}
            
            </div>
        )
    }
}
