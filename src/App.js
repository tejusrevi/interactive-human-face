import React from 'react';
import logo from './logo.svg';
import './App.css';
import Head from './components/Head'


function App() {
  
  return (
    <div className="App">
      <div id="alpha"/>
      <code id="screenCoords">
      </code>
      <code id="screenPercent">
      </code>
          <Head id={1}/>
          
    </div>
  );
}

export default App;
