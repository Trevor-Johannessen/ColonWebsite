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
      instructions: ""
    }
  }


  sendCode = () => {
    let code = document.getElementById("code-input").value;
    console.log('sending code')
    this.setState(prevState => ({
        instructions: code
      })
    );
    localStorage.setItem('code', code)
  }

  render() {
    return (
      <div className="App">
        <div id="left-column">
          <textarea id="code-input">
            {localStorage.getItem('code')}
          </textarea>
          <button id="submit-button" onClick={this.sendCode}>Submit</button>
        </div>
        <LocalStorageDirectory/>
        <Terminal instructions={this.state.instructions}/>
        <Dictionary/>
      </div>
    ); 
  }
}
export default App;
