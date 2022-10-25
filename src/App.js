import logo from './logo.svg';
import './App.css';
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
