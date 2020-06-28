import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Head from './components/Head'

function App() {
  
  window.onload = function() {
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
    document.getElementById('menu').classList.toggle("light");
    var btn = document.getElementsByClassName('btn');
    for (var i = 0; i < btn.length; i++) 
    {
      btn[i].classList.toggle("light")
      console.log(btn[i])
    }

    document.getElementById('root').classList.toggle("light");
    document.getElementById('link').classList.toggle("light");
    document.getElementById('social').classList.toggle("light");

    if(mode == 2) document.body.style.backgroundColor = "#131c25"
    else if(mode == 1) document.body.style.backgroundColor = "#ffffff"
  }

  function handleColorChange(ev){
    console.log(ev.target.id)
    if(ev.target.id === "linkedin-image")
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #283e4b, #283e4b)';
    else if(ev.target.id === "github-image")
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #882792, #462574)';
    else if(ev.target.id === "instagram-image")
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #bc0097, #e7b53e)';
    else if(ev.target.id === "facebook-image")
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #16a4fa, #0262e2)';
  }

  function handleReset(ev){
    
    if(mode == 1){
      console.log("resetting"+mode)
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #3c6591, #3c6591)';
    }else if (mode == 2){
      console.log("resetting"+mode)
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #636363, #636363)';
    }
  }

  return (
    <div>
      <div id="menu">
        <div id="btn-container">
        <button className="btn" id="projects">
          PROJECTS
        </button>
        <button className="btn"id="projects">
          ARTWORK
        </button>
        <button className="btn"id="projects">
          CONTACT
        </button>
        </div>
        

      </div>
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
          <h1>
            Hello, My name is Tejus Revi
          </h1>
          <h3>
            I'm an Artist and a Programmer
          </h3>
          <div id="social">
            <a id="linkedin" target="_blank" href="https://www.linkedin.com/in/tejusrevi/">
              <div id="linkedin-image" className="social-icon" onMouseOver={handleColorChange.bind(this)} onMouseOut={handleReset.bind(this)}/>
            </a>

            <a id="github" target="_blank" href="https://github.com/tejusrevi">
              <div id="github-image" className="social-icon" onMouseOver={handleColorChange.bind(this)} onMouseOut={handleReset.bind(this)}/>
            </a>

            <a id="instagram" target="_blank" href="https://www.instagram.com/tejx.r/">
              <div id="instagram-image" className="social-icon" onMouseOver={handleColorChange.bind(this)} onMouseOut={handleReset.bind(this)}/> 
            </a>

            <a id="facebook" target="_blank" href="https://www.facebook.com/Tejus.Revi/">
              <div id="facebook-image" className="social-icon" onMouseOver={handleColorChange.bind(this)} onMouseOut={handleReset.bind(this)}/>
            </a>
            
          </div>
        </div>
        
        </div>
        <a id="link" target="_blank" href="https://github.com/tejusrevi/InteractiveHumanFace">View this website on my Github ♥</a>
      </div>
    </div>
  );
  
}

export default App;
