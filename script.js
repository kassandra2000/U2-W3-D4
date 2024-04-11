//costanti
const row = document.getElementById("row");
const btnLoadImages = document.getElementById("loadImages");
const btnloadSecondImages = document.getElementById("loadSecondImages");

//funzione per il caricamento delle immagini
const funcForImage = (URL) => {
//   console.log(e.target); //bottone blu load image
  fetch(URL, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
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
        console.log(obj);
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
                  class="btn btn-sm btn-outline-secondary"
                >
                  View
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
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
const loadImage = () => {
  btnLoadImages.addEventListener("click", (URL) => {
    funcForImage("https://api.pexels.com/v1/search?query=animal")
  });
  btnloadSecondImages.addEventListener("click", (URL) => {
    funcForImage("https://api.pexels.com/v1/search?query=car")
  });
};
loadImage();
