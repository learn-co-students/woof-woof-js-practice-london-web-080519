// API

get = url => fetch(url).then(resp => resp.json());

patch = (url, id, data) => {
  return fetch(`${url}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(resp => resp.json());
};

const API = { get, patch };

// CONSTANTS
const dogUrl = "http://localhost:3000/pups/";
const dogBarDiv = document.querySelector("div#dog-bar");
const dogInfoDiv = document.querySelector("div#dog-info");
const filterButton = document.querySelector("button#good-dog-filter");
let dogStatus = "";

// FUNCTIONS

getButtonText = dog => {
  let dogButton = dogInfoDiv.querySelector("button");

  if (dog.isGoodDog) {
    dogButton.innerText = "Good Dog!";
  } else {
    dogButton.innerText = "Bad Dog!";
  }
};

handleDogButton = dog => {
  dogStatus = !dog.isGoodDog;
  API.patch(dogUrl, dog.id, { isGoodDog: dogStatus }).then(dog => {
    handleSpanClick(dog);
    getAllDogs();
  });
};

handleSpanClick = dog => {
  while (dogInfoDiv.firstChild) {
    dogInfoDiv.firstChild.remove();
  }

  let dogImg = document.createElement("img");
  dogImg.src = dog.image;

  let dogH2 = document.createElement("h2");
  dogH2.innerText = dog.name;

  let dogButton = document.createElement("button");
  dogInfoDiv.append(dogImg, dogH2, dogButton);
  getButtonText(dog);

  dogButton.addEventListener("click", event => {
    handleDogButton(dog);
  });
};

appendDog = dog => {
  let dogSpan = document.createElement("span");
  dogSpan.setAttribute("id", dog.id);
  dogSpan.innerText = dog.name;

  dogBarDiv.appendChild(dogSpan);
  dogSpan.addEventListener("click", event => {
    handleSpanClick(dog);
  });
};

renderDogs = dogs => {
  while (dogBarDiv.firstChild) {
    dogBarDiv.firstChild.remove();
  }
  dogs.forEach(appendDog);

  filterButton.addEventListener("click", event => {
    if (filterButton.innerText === "Filter good dogs: OFF") {
      while (dogBarDiv.firstChild) {
        dogBarDiv.firstChild.remove();
      }
      goodDogs = dogs.filter(dog => dog.isGoodDog === true);
      goodDogs.forEach(appendDog);
      filterButton.innerText = "Filter good dogs: ON";
    } else {
      while (dogBarDiv.firstChild) {
        dogBarDiv.firstChild.remove();
      }
      dogs.forEach(appendDog)
      filterButton.innerText = "Filter good dogs: OFF";
    }
  });
};

getAllDogs = () => {
  API.get(dogUrl).then(renderDogs);
};

// EVENT LISTENERS

document.body.onload = getAllDogs;
