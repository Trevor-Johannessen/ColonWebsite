import React from 'react';
import './Directory.css';



export default class LocalStorageDirectory extends React.Component{
    constructor(props){
        super(props);
    }

    

    addImage(name, image){
        document.cookie(name, image)
    }

    assembleKeys(images){
        return [(<div className='Directory-Card'>TEST</div>)].concat((images[""] != "") ? Object.keys(images).reduce((a, b) => [(<div className='Directory-Card'>{images[b]}</div>), ...a], []) : [])
    }

    render(){
        return(
            <div
            id="Directory"
            key="Dir"
            >
                {this.assembleKeys(this.props.images)}
            </div>
        )
    }
}