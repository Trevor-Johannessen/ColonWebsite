import React from 'react';
import './Directory.css';



export default class LocalStorageDirectory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: this.getImages()
        }    
    }

    getImages(){
        let data = document.cookie.split('; ');
        console.log(data)
    }

    addImage(name, image){
        document.cookie(name, image)
    }

    render(){
        return(
            <div
            id="Directory"
            key="Dir"
            >
            </div>
        )
    }
}