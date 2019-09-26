document.addEventListener("DOMContentLoaded", function(e) { 
// ---- API functions --- //
const API = {get, patch}

function get(url){
    return fetch(url).then(response => response.json())
}

function patch(url, id, objData) {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(objData)
    }
    return fetch(`${url}${id}`, configObj).then(response => response.json())
}

// ------ constants -------- //
const baseUrl = "http://localhost:3000/pups/"

const pupBar = document.querySelector('div#dog-bar')
let pupSummaryBox = document.createElement('div')
pupSummaryBox.setAttribute('id', 'dog-info')

const pupSummaryContainer = document.querySelector('#dog-summary-container')

const filterBtn = document.querySelector('#good-dog-filter')

// ------ functions -------- //
// ------ show all pups -------- //
function getPups(){
    API.get(baseUrl).then(pupList => pupList.forEach(renderPups))
}

function renderPups(pup){
    let pupSpan = document.createElement('span')
    pupSpan.setAttribute('id', `pup-${pup.id}`)
    pup.isGoodDog === "true" ? pupSpan.className = "visible" : pupSpan.className = "hidden"

    let p = document.createElement('p')
    p.innerText = pup.name
    pupSpan.addEventListener('click', () => expandPup(pup))
    // append
    pupSpan.append(p)
    pupBar.append(pupSpan)
}
    
// ------ expand pups -------- //

function expandPup(pup) {
    
    while (pupSummaryBox.firstChild) {
        pupSummaryBox.removeChild(pupSummaryBox.firstChild) 
    }
    pupSummaryBox.innerText = pup.name
    let dogImage = document.createElement('img')
    dogImage.src = pup.image
    //button
    let dogBtn = document.createElement('button')
    dogBtn.id = `pup-gb-${pup.id}`
    pup.isGoodDog === "true" ? dogBtn.innerText = "Good Dog!" : dogBtn.innerText = "Bad Dog!"
    dogBtn.addEventListener('click', () => goodOrBadPup(pup))
    //append
    pupSummaryBox.append(dogImage, dogBtn)
    pupSummaryContainer.append(pupSummaryBox)
}

// ----- good or bad pup ---- //
function goodOrBadPup(pup){
    pup.isGoodDog === "true" ? pup.isGoodDog = "false" : pup.isGoodDog = "true"
    API.patch(baseUrl, `${pup.id}`, pup).then(changeStatusOnClient)
}

function changeStatusOnClient(pup){
    let thisDogBtn = document.querySelector(`#pup-gb-${pup.id}`)
    let thisDogSpan = document.querySelector(`.pup-${pup.id}`)
    if (thisDogBtn.innerText === "Good Dog!"){
        thisDogBtn.innerText = "Bad Dog!"
        thisDogSpan.className = "hidden"
    }
    else {
        thisDogBtn.innerText = "Good Dog!"
        thisDogSpan.className = "visible"
    }
}

// ---- filter dogs ---- //
function filterDogsFetch(){
    if (filterBtn.innerText === "Filter good dogs: OFF") {
        API.get(baseUrl).then(pupList => pupList.forEach(filterGoodDogs))
        filterBtn.innerText = "Filter good dogs: ON"
    }
    else {
        API.get(baseUrl).then(pupList => pupList.forEach(showAllPups)) 
        filterBtn.innerText = "Filter good dogs: OFF"
    }
}

function filterGoodDogs(pup){
    let pupSpan = document.querySelector(`#pup-${pup.id}`)
    if (pup.isGoodDog === "false"){
        pupSpan.className = 'hidden'
    }
}

function showAllPups(pup){
    let pupSpan = document.querySelector(`#pup-${pup.id}`)
    if (pup.isGoodDog === "false"){
        pupSpan.className = ''
    }
}

filterBtn.addEventListener('click', filterDogsFetch) 

// ----- ON LOAD---- //
// document.addEventListener("DOMContentLoaded", getPups);
// document.body.onload = getPups;
getPups()
})