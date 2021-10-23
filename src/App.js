// import logo from './logo.svg';
import './App.css';
// import GameBoard from './components/GameBoard/GameBoard'
import GameBoard from './components/tic-tac-toe/gameBoard'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <GameBoard></GameBoard>

    </div>
  );
}

export default App;
