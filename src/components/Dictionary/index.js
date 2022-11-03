import React from 'react';
import './Dictionary.css';

const pages = [
    ['Text',( // Text Wiki
        <div id="text-wiki">
            <h1>TEXT OBJECT:</h1>
            <h3>Description:</h3>
            <p>Writes a line of text to the screen with a given text color and background color.
                The text starts at args.x, args.y position and when it hits the edge of the screen will wrap
                around to x=0, y=y+1 unless xbounds are specified.</p>

            <h3>Arguments:</h3>
            <ul>
                <li>x: The starting x position</li>
                <li>y: The starting y position</li>
                <li>text: The text string to be printed</li>
                <li>color: The color of the characters</li>
                <li>background: The color behind the characters</li>
                <li>xmin: The minimum x bound</li>
                <li>xmax: The maximum x bound</li>
                <li>sticky: Whether the text is affected by scroll</li>
            </ul>
            <h3>Examples:</h3>
            <ul className='Example-List'>
                <li className="Example-Text">text: text="Hello World!", x=1, y=1</li>
                <li className="Example-Text">text: x=1, y=1, text="Hello World!", color=blue, background=yellow</li>
            </ul>
        </div>
        )
    ],
    ['Scroll', (
        <div id="scroll-wiki">
            <h1>SCROLL OBJECT:</h1>
            <h3>Description:</h3>
            <p>Writes a line of text to the screen with a given text color and background color. This
                text will scroll horizontally at a given speed. The text starts at args.x, args.y position 
                and when it hits the edge of the screen will wrap around to x=0, y=y+1 unless xbounds are specified. </p>

            <h3>Arguments:</h3>
            <ul>
                <li>x: The starting x position</li>
                <li>y: The starting y position</li>
                <li>text: The text string to be printed</li>
                <li>color: The color of the characters</li>
                <li>background: The color behind the characters</li>
                <li>xmin: The minimum x bound</li>
                <li>xmax: The maximum x bound</li>
                <li>sticky: Whether the text is affected by scroll</li>
                <li>speed: speed that the text scrolls</li>
                <li>position: position that the text starts at (initalized at 0)</li>
                <li>dynamic: flag that the text is to be updated on event loop</li>
            </ul>
            <h3>Examples:</h3>
            <ul className='Example-List'>
                <li className="Example-Text">scroll: x=1, y=1, text="Hello World!", speed=5, color=black, background=red</li>
            </ul>
        </div>
    )],
    ['. . .', (<h1>More Enteries Here!</h1>)],
    ['Examples', (
        <div>
            <h1>Examples:</h1>
            <h3>Some example pages to help you get started!</h3>
            <h3>Example 1:</h3>
            <p className='Example-Text'>
                text: x=20, y=9, text="SUPPORT", color=white, background=blue<br/>
                scroll: x=20, y=10, text="UKRAINE", speed=5, color=blue, background=yellow
            </p>
        </div>
    )]
]

export default class Dictionary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: 0
        }

        this.scrollbar = (
            pages.map((info, index) => (
                <div className='Dictionary-Card' onClick={() => this.setPage(index)}>{info[0]}</div>
            ))
        )
    }

    setPage(key){
        this.setState(prevState => ({
            currentPage: key
        }))
    }

    

    render(){
        return(
            <div
            id="Dictionary"
            key="Dictionary"
            >
                <div id='Dictionary-Scroll'>
                    {this.scrollbar}
                </div>
                <div id='Dictionary-Content'>{pages[this.state.currentPage][1]}</div>
            </div>
        )
    }
}