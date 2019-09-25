window.addEventListener("DOMContentLoaded", event => populateDoggoBar());

// API
API = { get, patch };

function get(url) {
	return fetch(url).then(response => response.json());
}

function patch(url, id, data) {
	return fetch(`${url}${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
}

// CONSTANTS
const BASE_URL = "http://localhost:3000/pups/";
const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const filterBtn = document.querySelector("#good-dog-filter");
filter = false;

// FUNCTIONS
function populateDoggoBar(parameter) {
	dogBar.innerHTML = "";
	if (!!parameter) {
		API.get(BASE_URL).then(dogs =>
			dogs
				.filter(dog => dog.isGoodDog == true)
				.forEach(dog => dogBar.appendChild(createSpan(dog))),
		);
	} else {
		API.get(BASE_URL).then(dogs =>
			dogs.forEach(dog => dogBar.appendChild(createSpan(dog))),
		);
	}
}

function createSpan(dog) {
	let dogSpan = document.createElement("span");
	dogSpan.innerText = dog.name;
	dogSpan.addEventListener("click", event => showDogClick(dog));
	return dogSpan;
}

function showDogClick(dog) {
	dogInfo.innerHTML = "";

	let name = document.createElement("h2");
	name.innerText = dog.name;

	let imageUrl = document.createElement("img");
	imageUrl.src = dog.image;

	let button = document.createElement("button");
	dog.isGoodDog
		? (button.innerText = "Good Dog!")
		: (button.innerText = "Bad Dog!");
	button.addEventListener("click", event => toggleBehaviour(dog));

	dogInfo.append(name, imageUrl, button);
}

function toggleBehaviour(dog) {
	dog.isGoodDog = !dog.isGoodDog;
	API.patch(BASE_URL, dog.id, dog)
		.then(response => showDogClick(response))
		.then(event => {
			if (filter) {
				populateDoggoBar(filter);
			}
		});
}

function toggleDogs() {
	if (filter) {
		filterBtn.innerHTML = "Filter good dogs: OFF";
		filter = !filter;
		populateDoggoBar(filter);
	} else {
		filterBtn.innerHTML = "Filter good dogs: ON";
		filter = !filter;
		populateDoggoBar(filter);
	}
	return;
}

// EVENT LISTENERS
filterBtn.addEventListener("click", toggleDogs);
