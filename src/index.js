// API Functions

function get(url) {
    return fetch(url).then(response => response.json())
}
  
function patch(url, id, objectData) {
    return fetch(`${url}${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(objectData)
    }).then(response => response.json())
}
  
API = {get, patch}

const baseURL = "http://localhost:3000/pups/"
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

function dogName(dog) {

    let span = document.createElement("span")
    span.innerText = `${dog.name}`
    span.id = (`span-${dog.id}`)
    dogBar.append(span)

    let selectSpan = document.querySelector(`#span-${dog.id}`)
    selectSpan.addEventListener("click", () => {
        dogDetails(dog)
    })
}

function dogDetails(dog) {
    while (dogInfo.firstChild) dogInfo.removeChild(dogInfo.firstChild)
    let img = document.createElement("img")
    img.src = `${dog.image}`
    let h2 = document.createElement("h2")
    h2.innerText = `${dog.name}`
    let button = document.createElement("button")
    button.id = "button"
    button.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog"
    dogInfo.append(img, h2, button)

    button.addEventListener("click", () => {

        if  (button.innerText === "Good Dog"){
            button.innerText = "Bad Dog"
            API.patch(baseURL, dog.id, {isGoodDog: false})
          }
        else if (button.innerText === "Bad Dog"){
          button.innerText = "Good Dog"
          API.patch(baseURL, dog.id, {isGoodDog: true})
        }
    })
}










function getAndRenderNames (){
    API.get(baseURL).then(dogObject => dogObject.forEach(dogName))
}

getAndRenderNames()

