import React from 'react';
import logo from './logo.svg';
import './App.css';

const App=({Logout})=> {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Logged In User
                    <button onClick={e=>Logout()}>Log Out</button>

        </p>
      </header>
    </div>
  );
}

export default App;
