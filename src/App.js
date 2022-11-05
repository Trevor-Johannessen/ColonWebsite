import './App.css';
import './fonts/MinecraftRegular-Bmg3.otf'
import Terminal from './components/Terminal/index.js'
import Dictionary from './components/Dictionary';
import LocalStorageDirectory from './components/LocalStorageDirectory';
import React from 'react';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      instructions: "",
      images: this.loadCookies()
    }
  }

  loadImages = () => {
    this.setState(prevState => ({
        instructions: prevState.instructions,
        images: this.loadCookies()
    }));
  }

  loadCookies = () => {
    return document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...value] = current.split('=');
      prev[name] = value.join('=');
      return prev;
    }, {});
  }

  sendCode = () => {
    let code = document.getElementById("code-input").value;
    console.log('sending code')
    this.setState(prevState => ({
        instructions: code,
        images: prevState.images
      })
    );
    localStorage.setItem('colon-code', code)
  }

  render() {
    return (
      <div className="App">
        <div id="left-column">
          <textarea id="code-input">
            {localStorage.getItem('colon-code')}
          </textarea>
          <button id="submit-button" onClick={this.sendCode}>Submit</button>
        </div>
        <LocalStorageDirectory
          images={this.state.images}
          reloadImages={this.loadImages}
        />
        <Terminal instructions={this.state.instructions}/>
        <Dictionary/>
      </div>
    ); 
  }
}
export default App;
