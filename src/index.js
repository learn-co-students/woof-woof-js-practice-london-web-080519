// API
API_URL = "http://localhost:3000/pups"

function get(url) {
    return fetch(url).then(response => response.json())
}

function patch(url, id) {
    return fetch(`${url}/${id}`).then(response=>response.json())
}

const API = { get, patch }

// CONSTANTS
const goodDogFilter = document.querySelector("button#good-dog-filter")
const dogBar = document.querySelector("div#dog-bar")
const dogInfo = document.querySelector("div#dog-info")

// FUNCTIONS

function loadPups() {
    // get all pups 
    API.get(API_URL).then(doggos => doggos.forEach(renderPups))
}

function renderPups(dog) {
    // put all pups in span
    let span = document.createElement("span")
    span.dataset.id = dog.id
    span.innerText = dog.name
    span.addEventListener("click", () => openPup(dog))
    dogBar.append ( span )
}


function openPup(puptoSee) {
    dogInfo.innerHTML = ""
    
    let img = document.createElement("img")
    img.setAttribute("src", puptoSee.image)
    
    let h2 = document.createElement("h1")
    h2.innerText = puptoSee.name

    dogInfo.append( img, h2, goodDogButton(puptoSee) )
}

goodDogButton = (doggo) => {
    //yay abstraction
    let button = document.createElement("button")
    if (!doggo.isGoodDog) {
        button.innerText = "Bad Dog!"
    } else {
        button.innerText = "Good Dog!"
    }
    button.addEventListener("click", changeDogStatus)
    return button
}

changeDogStatus = () => {
    console.log()
}

//start up
//window.addEventListener('DOMContentLoaded', () => loadPups);
//window.onload = loadPups
//window.addEventListener('load', loadPups)
document.body.onload = loadPups
