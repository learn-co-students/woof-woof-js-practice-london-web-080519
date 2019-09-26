document.addEventListener("DOMContentLoaded", () => {
  //API

  const get = url => {
    return fetch(url).then(resp => resp.json());
  };

  const patch = (url, id, data) => {
    return fetch(`${url}${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(resp => resp.json());
  };

  API = { get, patch };

  //constants
  const dogDB = "http://localhost:3000/pups/";
  const dogSpan = document.querySelector("#dog-bar");
  const dogInfo = document.querySelector("#dog-info");

  //functions
  const getAndShowAllPups = url => {
    API.get(url).then(dogs => {
        while (dogSpan.hasChildNodes()) {
            dogSpan.removeChild(dogSpan.lastChild);
          }
showAllPups(dogs);
  })}
  ;

  const showAllPups = dogs => {
    dogs.forEach(dog => {
      let newSpan = document.createElement("span");
      newSpan.className = dog.id;
      newSpan.innerText = dog.name;
      newSpan.addEventListener("click", () => {
        showDogInfo(dog);
      });
      dogSpan.appendChild(newSpan);
    });
  };

  const showDogInfo = dog => {
    while (dogInfo.hasChildNodes()) {
      dogInfo.removeChild(dogInfo.lastChild);
    }
    let pupName = document.createElement("h2");
    pupName.innerText = dog.name;
    dogInfo.append(pupName);
    let dogPic = document.createElement("img");
    dogPic.setAttribute("src", `${dog.image}`);
    dogInfo.append(dogPic);
    createDogButton(dog);
  };

  const createDogButton = dog => {
    let dogBtn = document.createElement("button");
    let dogId = dog.id;
    dogBtn.setAttribute("data-id", dogId);
    dogBtn.innerText = setDogText(dog);
    dogInfo.append(dogBtn);
    addButtonListener(dogBtn);
  };

  const setDogText = dog => {
    return dog.isGoodDog ? "Good dog!" : "Bad dog!";
  };

  const addButtonListener = btn => {
    btn.addEventListener("click", event => {
      let id = event.target.dataset.id;
      let data;
      if (btn.innerText == "Good dog!") {
        data = { isGoodDog: false };
      } else {
        data = { isGoodDog: true };
      }
      API.patch(dogDB, id, data).then(dog => {
        event.target.innerText = setDogText(dog);
        getAndShowAllPups(dogDB)
      });
    });
  };

  //client
  getAndShowAllPups(dogDB);
});
