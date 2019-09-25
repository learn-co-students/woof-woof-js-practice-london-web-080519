const bar = document.querySelector("#dog-bar");
const container = document.querySelector("#dog-summary-container");
const info = document.querySelector("#dog-info");
const dogFilterBtn = document.querySelector("#good-dog-filter");
const baseUrl = "http://localhost:3000/pups/";
let dogStatus = true;

//api

API = { get, patch };

function get(url) {
  return fetch(url).then(resp => resp.json());
}

function patch(id, data) {
  return fetch(`${baseUrl}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(resp => resp.json());
}

// functions

document.addEventListener("DOMContentLoaded", () => getDogs());

function getDogs() {
  API.get(baseUrl).then(dogList => dogList.forEach(renderDog));
}

dogFilterBtn.addEventListener("click", () => changeDogStatus());

function changeDogStatus() {
  if (dogStatus == true) {
    dogFilterBtn.innerText = "Filter good dogs: ON";
    dogStatus = false;
    while (bar.hasChildNodes()) {
        bar.removeChild(bar.lastChild);
      }
      getDogs();
  } else {
    dogFilterBtn.innerText = "Filter good dogs: OFF";
    dogStatus = true;
    while (bar.hasChildNodes()) {
      bar.removeChild(bar.lastChild);
    }
    getDogs();
  }
}

function renderDog(dog) {
  if (!dogStatus && dog.isGoodDog === true) {
    span = document.createElement("span");
    span.id = `dog-${dog.id}`;
    span.innerText = dog.name;
    bar.append(span);
    span.addEventListener("click", () => renderDogInfo(dog));
  } else if (dogStatus) {
    span = document.createElement("span");
    span.id = `dog-${dog.id}`;
    span.innerText = dog.name;
    bar.append(span);
    span.addEventListener("click", () => renderDogInfo(dog));
  }
}

function renderDogInfo(dog) {
  while (info.hasChildNodes()) {
    info.removeChild(info.lastChild);
  }
  let image = document.createElement("img");
  let header = document.createElement("h2");
  let dogBtn = document.createElement("button");
  dogBtn.setAttribute("id", `button-dog-${dog.id}`);
  image.src = dog.image;
  header.innerText = dog.name;
  if (dog.isGoodDog == true) {
    dogBtn.innerText = "Good Dog!";
    dogBtn.addEventListener("click", badGoodDog(dog.id, badDog, "Bad Dog!"));
  } else if (dog.isGoodDog == false) {
    dogBtn.innertext = "Bad Dog!";
    dogBtn.addEventListener("click", badGoodDog(dog.id, goodDog, "Good Dog!"));
  }
  info.append(image, header, dogBtn);
}

const goodDog = { isGoodDog: true };
const badDog = { isGoodDog: false };

function badGoodDog(id, boolean, string) {
  API.patch(id, boolean).then(() => {
    changeBtn = document.querySelector(`#button-dog-${id}`);
    changeBtn.innerText = string;
  });
}

//img
//h2
//button that says "Good Dog"
/* <img src=dog_image_url>
 <h2>Mr. Bonkers</h2>
 <button>Good Dog!</button> */
