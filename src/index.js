// API
API_URL = "http://localhost:3000/pups"

function get(url) {
    return fetch(url).then(response => response.json())
}

function patch(url, id, data) {
    return fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response=>response.json())
}

const API = { get, patch }

// CONSTANTS
const goodDogFilter = document.querySelector("button#good-dog-filter")
    //   goodDogFilter.setAttribute("data-filtered-dogs", "false")
    //   goodDogFilter.addEventListener("click", toggleGoodDogs)
const dogBar = document.querySelector("div#dog-bar")
const dogInfo = document.querySelector("div#dog-info")

// FUNCTIONS

// SAVE THE BELOW FOR LATER
// function toggleGoodDogs(event)  {
//     event.target.dataset.filteredDogs = !event.target.dataset.filteredDogs
//     if (!!event.target.dataset.filteredDogs) {
//         event.target.innerText = "Filter good dogs: ON"
//     } else {
//         event.target.innerText = "Filter good dogs: OFF"
//     }
// }

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
    
    let h2 = document.createElement("h2")
    h2.innerText = puptoSee.name

    let button = document.createElement("button")
    button.setAttribute("id", "toggleGoodness")

    dogInfo.append( img, h2, button )
    goodDogButton(puptoSee)    
    button.addEventListener("click", () => changeDogStatus(puptoSee))

}

goodDogButton = (doggo) => {
    //yay abstraction
    let button = document.querySelector("button#toggleGoodness")
    if (doggo.isGoodDog === false) {
        button.innerText = "Dog is bad. Make this a good dog!"
    } else {
        button.innerText = "Dog is good. Make this a bad dog!"
    }
    return button
}

changeDogStatus = (dogToUpdate) => { 
    if ( dogToUpdate.isGoodDog === false ) {
        dogToUpdate.isGoodDog = true
    } else {
        dogToUpdate.isGoodDog = false
    }  
    sendPatchRequest( dogToUpdate )
}

sendPatchRequest = (dog) => {
    API.patch(API_URL, dog.id, dog ).then(dog => goodDogButton(dog))
}


//start up
//window.addEventListener('DOMContentLoaded', () => loadPups);
//window.onload = loadPups
//window.addEventListener('load', loadPups)
document.body.onload = loadPups
