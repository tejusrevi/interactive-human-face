import React from 'react';

var images = ["harry","wonder","alexandra","emilia","lion","ironman","adele","katy","pursuit","joker"];
var index = -1;
function handleExtremes(){
    if (index<0) {
        document.getElementsByClassName("card-image")[0].id = "page";
        document.getElementById("previous").disabled = true;
    }
    else if (index > images.length-2 || index < 0) {
        document.getElementById("next").disabled = true;
    }else{
        document.getElementById("next").disabled = false;
        document.getElementById("previous").disabled = false;
    }
}
function handleNext(){
    document.getElementsByClassName("card-image")[0].id = images[++index];
    handleExtremes();
    console.log(index)
}

function handlePrevious(){
    console.log(index)
    
    document.getElementsByClassName("card-image")[0].id = images[--index]
    handleExtremes();
    
}
const artworks =
        <div id="artwork-bar">
            <button className="page-move" id="previous" onClick={handlePrevious.bind(this)}>

            </button>
            <div className="card art">
            <div className="card-image art" id="page">
                </div>
                
            </div>

            <button className="page-move" id="next" onClick={handleNext.bind(this)}>

            </button>
        </div>
    

export {artworks}