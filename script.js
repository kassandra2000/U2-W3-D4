//costanti
const row = document.getElementById("row");
const btnLoadImages = document.getElementById("loadImages");
const btnloadSecondImages = document.getElementById("loadSecondImages");
const inputSearch = document.querySelector(".search");
const buttonSearch = document.querySelector(".searchBtn");

//funzione per il caricamento delle immagini
const removeCard = (e) => {
  const card = e.target.parentNode.parentNode.parentNode.parentNode;
  card.remove();
};

const goToDetails = (id) => {
  console.log("ciao");
  window.location.assign("./details.html?id=" + id);
};
const funcForImage = (URL) => {
  //   console.log(e.target); //bottone blu load image
  fetch(URL, {
    method: "GET",
    // body: JSON.stringify(),//serve solo post e put
    headers: {
    //   "Content-Type": "application/json",//quando invio body
      Authorization: "PEvDd8ZITfGARBaUC6i181BDkU3FUcAAC1LkNUnGuhCmPFHlpgizWYtU",
    }, //chiave
  })
    .then((response) => {
      if (response.ok) {
        // console.log(response);
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data); //oggetto

      data.photos.forEach((obj) => {
        const img = obj.src.medium;
        const title = obj.photographer;
        const description = obj.alt;
        const id = obj.id;
        // console.log(obj);
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = ` <div class="card mb-4 shadow-sm">
          <img
            src="${img}"
            class="bd-placeholder-img card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
              ${description}
            </p>
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <div class="btn-group">
                <button
                  type="button"
                  onclick="goToDetails(${id})"
                  class="btn btn-sm btnView btn-outline-secondary"
                >
                  View
                </button>
                <button
                  type="button"
                  onclick="removeCard(event)"
                  class="btn btnHide btn-sm  btn-outline-secondary"
                >
                  Hide
                </button>
              </div>
              <small class="text-muted">${id}</small>
            </div>
          </div>
        </div>`;
        row.appendChild(div);
      });
    });
};

//gestendo bottoni
window.onload = () => {
  btnLoadImages.addEventListener("click", (URL) => {
    funcForImage("https://api.pexels.com/v1/search?query=animal");
  });
  btnloadSecondImages.addEventListener("click", (URL) => {
    funcForImage("https://api.pexels.com/v1/search?query=car");
  });
  buttonSearch.addEventListener("click", () => {
    console.log(inputSearch.value);
    funcForImage(`https://api.pexels.com/v1/search?query=${inputSearch.value}`);
  });
};
