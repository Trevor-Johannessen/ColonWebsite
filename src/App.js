import './App.css';
import './fonts/MinecraftRegular-Bmg3.otf'
import './components/Terminal/Terminal.css'
import Terminal from './components/Terminal/Terminal.js'
import api from './api'

let sendCode = () => {
  let code = document.getElementById("code-input").value;
  api.postText(code)
  console.log(`Sending ${code}`)
}



function App() {
  return (
    <div className="App">
      <div id="left-column">
        <textarea
          id="code-input"
        />
        <button id="submit-button" onClick={sendCode}>Submit</button>
      </div>
      <Terminal/>
    </div>
  );
}

export default App;
