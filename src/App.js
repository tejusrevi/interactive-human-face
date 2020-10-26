import React,{useState} from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import Head from './components/Head'
import {projects} from './components/projects';
import {artworks} from './components/artworks';

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
    document.getElementById('menu').classList.toggle("light");
    var btn = document.getElementsByClassName('btn');
    for (var i = 0; i < btn.length; i++) 
    {
      btn[i].classList.toggle("light")
      console.log(btn[i])
    }

    document.getElementById('root').classList.toggle("light");
    document.getElementById('link').classList.toggle("light");
    document.getElementById('threejs').classList.toggle("light");
    if(document.getElementById('social') != null)
      document.getElementById('social').classList.toggle("light");

    if(mode === 2) document.body.style.backgroundColor = "#131c25"
    else if(mode === 1) document.body.style.backgroundColor = "#ffffff"

    if(document.getElementById('project-bar') != null)
      document.getElementById('project-bar').classList.toggle("light");
    if(document.getElementById('artwork-bar') != null)
      document.getElementById('artwork-bar').classList.toggle("light");
    
    var card = document.getElementsByClassName('card');
    for (i = 0; i < card.length; i++) 
    {
      card[i].classList.toggle("light");
    }

    var projectLink = document.getElementsByClassName('project-link');
    for ( i = 0; i < projectLink.length; i++) 
    {
      projectLink[i].classList.toggle("light");
    }
    
    if(document.getElementById('project-link') != null)
      document.getElementById('project-link').classList.toggle("light");
    
  }

  function handleColorChange(ev){
    if(document.getElementById('social') === null) return;
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
    
    if(mode === 1){
      console.log("resetting"+mode)
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #3c6591, #3c6591)';
    }else if (mode === 2){
      console.log("resetting"+mode)
      document.getElementById("social").style.backgroundImage = 'linear-gradient(90deg, #636363, #636363)';
    }
  }

  function handleProjectClick(e){
      ReactDOM.render(projects,document.getElementById('mid'))
      document.getElementById("mid").scrollIntoView();
      if (document.getElementById("project-bar") === null) return;
      if (mode === 2) {
        document.getElementById("project-bar").classList.add('light');
        var card = document.getElementsByClassName("card");
        for(var i=0;i<card.length;i++){
          card[i].classList.add("light")
        }
        var projectLink = document.getElementsByClassName("project-link");
        for(var i=0;i<projectLink.length;i++){
          projectLink[i].classList.add("light")
        }

      }
      document.getElementById("project-bar").scrollIntoView();
    
  }

  function handleArtworkClick(e){
    ReactDOM.render(artworks,document.getElementById('mid'))
    document.getElementById("mid").scrollIntoView();
    if (document.getElementById("artwork-bar") === null) return;
    if (mode === 2) {
       document.getElementById("artwork-bar").classList.add('light');
    }
    
    
  }

  function handleContactClick(e){
    window.open('mailto:tejusrevi@gmail.com');
  }

  return (
    <div>
      <div id="menu">
        <div id="btn-container">
        <button className="btn" id="projects" onClick={handleProjectClick.bind(this)}>
          PROJECTS
        </button>
        <button className="btn" id="artworks" onClick={handleArtworkClick.bind(this)}>
          SKETCH BOOK
        </button>
        <button className="btn"id="contact" onClick={handleContactClick.bind(this)}>
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
            Hello, My name is Tejus Revi.
          </h1>
          <h3>
            I'm a Software Developer.
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
        <div id="mid"></div>

        <div id="threejs" className="fadeforever">Handcrafted using ThreeJS & React</div>
        <a id="link" className="fadeforever" target="_blank" href="https://github.com/tejusrevi/InteractiveHumanFace">View this website on my Github ♥</a>
        
      </div>
    </div>
  );
  
}

export default App;
