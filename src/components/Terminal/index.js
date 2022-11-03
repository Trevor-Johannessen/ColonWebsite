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
            instructions: parser(this.props.instructions)
        }
        this.time = 0;
        this.scroll_position = 0;
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
        console.log(`Instructions = ${this.state.instructions}`)
        if(this.state.instructions){
            for(let i in this.state.instructions){
                console.log(`Executing ${JSON.stringify(this.state.instructions[i])}`)
                if(this.state.instructions[i].dynamic){
                    this.state.instructions[i].draw(grid, this.scroll_position, this.time);
                }
            }
        }
        this.time++;
        return grid;
    }

    redrawGrid(instructions, grid){
        for(let index in instructions){
            console.log("Redrawing" + JSON.stringify(instructions[index]))
            grid = instructions[index].draw(grid, this.scroll_position)
        }
        return grid;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.instructions !==this.props.instructions){
            this.time = 0;
            let parsed_instructions = parser(this.props.instructions);
            this.setState(prevState => ({
                grid: this.redrawGrid(parsed_instructions, [...Array(19)].map(_=>Array(51).fill({text: "", color: "", background: ""}))),
                textColor: prevState.textColor,
                backgroundColor: prevState.backgroundColor,
                cursor: prevState.cursor,
                instructions: parsed_instructions
            }))
        }
        
    }

    componentDidMount(){
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                grid: this.nextFrame(prevState.grid),
                textColor: prevState.textColor,
                backgroundColor: prevState.backgroundColor,
                cursor: prevState.cursor,
                time: prevState.time,
                instructions: prevState.instructions
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
            >
            {this.createPixels()}
            
            </div>
        )
    }
}
