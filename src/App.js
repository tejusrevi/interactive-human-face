import React,{useState} from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import Head from './components/Head'


function App() {
  
  window.onload = function() {
    if(document.getElementById("intro-container") === null) return;
    document.getElementById("intro-container").style.top = document.getElementById("canvas").style.height.replace("px","")/1.6 + "px";
  };

  window.onresize = function() {
    document.getElementById("intro-container").style.top = document.getElementById("canvas").style.height.replace("px","")/1.6 + "px";
  };
  
  const [mode,setMode] = useState(1); //dark mode
  
  function handleClick(cb) {
    console.log(cb.target.checked)
    if(cb.target.checked){
      setMode(2)
    }else{
      setMode(1)
      
    }

    document.getElementById('root').classList.toggle("light");

    document.getElementById('threejs').classList.toggle("light");

    if(mode === 2) document.body.style.backgroundColor = "#131c25"
    else if(mode === 1) document.body.style.backgroundColor = "#ffffff"
  }

  function handleReset(ev){
    
    if(mode === 1){
      console.log("resetting"+mode)
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #3c6591, #3c6591)';
    }else if (mode === 2){
      console.log("resetting"+mode)
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #636363, #636363)';
    }
  }

  return (
    <div>

      <div id="switch-container">
        <label className="switch" >
        <input type="checkbox" onClick={handleClick.bind(this)}/>
        <span className="slider"></span>
        </label>
        </div>
      <Head mode={mode}/>

      <div id="content">
        <div id="intro-container">
        <div id="intro" className="typewriter">

        </div>
        </div>
        <div id="mid"></div>

        <div id="threejs" className="fadeforever">Handcrafted using ThreeJS & React</div>
        <a id="link" className="fadeforever" target="_blank" href="https://github.com/tejusrevi/InteractiveHumanFace">View this website on my Github ♥</a>
        
      </div>
    </div>
  );
  
}

export default App;
