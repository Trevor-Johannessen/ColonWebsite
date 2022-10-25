import './App.css';
import './fonts/MinecraftRegular-Bmg3.otf'
import './components/Terminal/Terminal.css'
import Terminal from './components/Terminal/Terminal.js'

function App() {
  return (
    <div className="App">
      <input
        id="code-input"
        type="text"
      />
      <Terminal/>
    </div>
  );
}

export default App;
