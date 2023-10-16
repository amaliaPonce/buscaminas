import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1> Buscaminas 💥</h1>
      <Board rows={6} cols={8} mines={10} />
    </div>
  );
}

export default App;
