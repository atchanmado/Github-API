const barreRech = document.getElementById("barre-rech");
const btnSend = document.getElementById("btn-send");
const searchResult = document.getElementById("search-result");
btnSend.addEventListener("click", lancerSearch);

function lancerSearch(event) {
  event.preventDefault();
  let nombre = 0;
  let adresse = "";
  let repo = "";
  const objetRecher = barreRech.value;
  const turl = `https://api.github.com/users/${objetRecher}/repos?type=owner`;
  fetch(turl)
    .then((result) => result.json())
    .then((result) => {
      nombre = result.length;
      adresse = result;
      adresse.forEach((element) => {
        repo += `<li><a class="dropdown-item" target="_blank" href="${element.html_url}">${element.name}</a></li>`;
      });

      const url = `https://api.github.com/users/${objetRecher}`;
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          searchResult.innerHTML += `       <div class="col-12 d-flex my-2 ">
                <img src="${response.avatar_url}" alt="" />
                <div class="col-8 gauche">
                  <p>Nom : ${response.login}</p>
                  <p>GitHub : <a target="_blank" href="${response.html_url}"class="bg-info p-2 text-white lien" >Profile</a></p>
                  <p >Public Repos : <span class="bg-success text-white p-2">${nombre}</span> </p>
                </div>
          <div class="dropdown lescroll mt-3 ">
            <button
              class="btn lebutt dropdown-toggle btn btn-danger"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Repository
            </button>
            <ul
              class="dropdown-menu dropdown-menu-warning lescroll"
              aria-labelledby="dropdownMenuButton2"
            >
            ${repo}
            </ul>
          </div>
              </div>`;
        });
    });
  barreRech.value = "";
}
