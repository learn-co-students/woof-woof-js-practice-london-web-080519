// API ---
const BASE_URL = "http://localhost:3000/pups/"

function get(url) {
    return fetch(url).then(resp => resp.json())
}

function patch(url, id, data) {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data)
    }
    return fetch(url+id, configObj).then(resp => resp.json())
}

API = {
    get,
    patch
}

// Variables ---
const dogBar = document.querySelector("div#dog-bar")
const dogSummaryContainer = document.querySelector("div#dog-summary-container")
const dogInfo = document.querySelector("div#dog-info")
const goodDogFilterBtn = document.querySelector("button#good-dog-filter")

// Main Functions ---

// render dog buttons on load

function renderDogsInDogBar() {
    API.get(BASE_URL).then(appendDogBtnsToDogBar)
}

function appendDogBtnsToDogBar(dogs) {
    while (dogBar.firstChild) dogBar.removeChild(dogBar.firstChild)
    dogs.forEach(createAndAppendDogBtn)
}

function createAndAppendDogBtn(dog) {
    let dogBtn = document.createElement('span')
    dogBtn.innerText = dog.name

    dogBtn.addEventListener("click", e => {
        createAndDisplayDogInfo(dog)
    })
    
    dogBar.append(dogBtn)
}


// Show info for dog on dog bar btn click
function createAndDisplayDogInfo(dog) {

    let dogImg = document.createElement('img')
    dogImg.src = dog.image

    let dogName = document.createElement('h2')
    dogName.innerText = dog.name

    let goodOrBadDogBtn = document.createElement('button')
    goodOrBadDogBtn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    goodOrBadDogBtn.addEventListener('click', e => toggleGoodOrBadDogStatus(dog))


    while (dogInfo.firstChild) dogInfo.removeChild(dogInfo.firstChild)

    dogInfo.append(dogImg, dogName, goodOrBadDogBtn)
}

// Toggle good and bad dog status
function toggleGoodOrBadDogStatus(dog) {
    let data = {
        isGoodDog: dog.isGoodDog ? false : true
    }
    patch(BASE_URL, dog.id, data).then(dog => {
        createAndDisplayDogInfo(dog)
        if (goodDogFilterBtn.innerText === "Filter good dogs: ON") {
            getAndRenderGoodDogs()
        }
    })
    
}

// Good Dog Filter
function toggleGoodDogFilter(e) {
    if (e.target.innerText === "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON"
        getAndRenderGoodDogs()
    } else {
        e.target.innerText = "Filter good dogs: OFF"
        renderDogsInDogBar()
    }
}

function getAndRenderGoodDogs() {
    get(BASE_URL).then(filterToGoodDogsAndAppend)
}

function filterToGoodDogsAndAppend(dogs) {
    let goodDogs = dogs.filter(dog => dog.isGoodDog)
    appendDogBtnsToDogBar(goodDogs)
}

// event listeners ---

document.addEventListener("DOMContentLoaded", () => {
    renderDogsInDogBar()
    goodDogFilterBtn.addEventListener('click', toggleGoodDogFilter)
})
