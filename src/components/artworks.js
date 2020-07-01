import React from 'react';

var images = [  {id:"harry", footer:"Daniel Radcliffe - Harry Potter"},
                {id:"wonder", footer:"Gal Gadot - Wonder Woman"},
                {id:"alexandra" , footer:"Alexandra Daddario"},
                {id:"emilia" , footer:"Emilia Clarke - GOT"},
                {id:"lion" , footer:"Simbha - Lion King"},
                {id:"ironman" , footer:"Robert Downey Jr. - Ironman"},
                {id:"adele" , footer:"Adele - Hello"},
                {id:"katy" , footer:"Katy Perry - Uncondionally"},
                {id:"pursuit" , footer:"Will and Jaden Smith - Pursuit of Happyness"},
                {id:"joker" , footer:"Joaquin Pheonix - Joker"}];
var index = -1;
function handleExtremes(){
    if (index<0) {
        document.getElementsByClassName("card-image")[0].id = "page";
        document.getElementById("previous").disabled = true;
    }
    else if (index > images.length-2 || index < 0) {
        document.getElementById("next").disabled = true;
    }else{
        document.getElementById("book-footer").innerHTML = images[index].footer;
        document.getElementById("next").disabled = false;
        document.getElementById("previous").disabled = false;
    }
}
function handleNext(){
    if(images[index+1] === undefined) index = -1;
    document.getElementsByClassName("card-image")[0].id = images[++index].id;
    handleExtremes();
}

function handlePrevious(){
    if (index <= 0) {
        document.getElementsByClassName("card-image")[0].id = "page";
        document.getElementById("previous").disabled = true;
        index = -1;
        return;
    }

    document.getElementsByClassName("card-image")[0].id = images[--index].id;
    handleExtremes();
    
}
const artworks =
        <div id="artwork-bar">
            <button className="page-move" id="previous" onClick={handlePrevious.bind(this)}>

            </button>
            <div className="card art">
            <div className="card-image art" id="page">
                </div>
                <div id="book-footer">Welcome to my Drawing Book</div>
            </div>

            <button className="page-move" id="next" onClick={handleNext.bind(this)}>

            </button>
        </div>
    

export {artworks}