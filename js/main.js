const API_KEY = "api_key=98e41bd4379f1435ff4533b935367e7d";
const BASE_URL = "https://api.themoviedb.org/4";
const MOVIE_API_URL =
  BASE_URL +
  "/discover/movie?sort_by=popularity.desc&" +
  API_KEY +
  "&language=pt-BR";

const TV_API_URL =
  BASE_URL +
  "/discover/tv?sort_by=vote_count.desc&" +
  API_KEY +
  "&language=pt-BR";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

const carroselFilme = document.getElementById("carroselFilme");
const carroselSeries = document.getElementById("carroselSeries");
const bannerContainer = document.getElementById("bannerContainer");

getTV(TV_API_URL);
getMovies(MOVIE_API_URL);

function getTV(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showTV(data.results);
    });
}

function showTV(data) {
  carroselSeries.innerHTML = "";

  data.forEach((movie) => {
    let desc = movie.overview;
    newDesc = desc.replace(/"/g, "");

    const movieEl = document.createElement("div");
    movieEl.classList.add("item");

    movieEl.innerHTML = `
    <img class="box-filme" src="${IMG_URL + movie.poster_path}" alt="" onclick="maisInformacoes('${IMG_URL + movie.backdrop_path}', '${movie.name}', '${newDesc}', '${movie.vote_average}', '${movie.first_air_date}')" />
    `;

    carroselSeries.appendChild(movieEl);
  });
}

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results);
    });
}

function showMovies(data) {

  
  carroselFilme.innerHTML = "";

  data.forEach((movie) => {
    let desc = movie.overview;
    newDesc = desc.replace(/"/g, "");

    const movieEl = document.createElement("div");
    movieEl.classList.add("item");

    movieEl.innerHTML = `
    <img class="box-filme" src="${IMG_URL + movie.poster_path}" alt="" onclick="maisInformacoes('${IMG_URL + movie.backdrop_path}', '${movie.title}', '${newDesc}', '${movie.vote_average}', '${movie.release_date}')" />
    `;

    carroselFilme.appendChild(movieEl);
  });

  owl();

 let indice = parseInt(Math.random() * 20) 
console.log(indice)

  let desc = data[indice].overview;
  newDesc = desc.replace(/"/g, "");

  bannerContainer.innerHTML = `
    <h3 class="titulo">${data[indice].title}</h3>
    <p class="descricao">
      ${desc.substring(0, 149)}...
    </p>
    <div>
      <button role="button" class="botao">
        <span class="icon">
          <i class="fa-solid fa-play"></i>
        </span>
        ASSISTIR AGORA
      </button>
      <button role="button" class="botao" onclick="maisInformacoes('${
        IMG_URL + data[indice].backdrop_path
      }', '${data[indice].title}', '${newDesc}', '${data[indice].vote_average}', '${
    data[indice].release_date
  }')">
        <span class="icon">
          <i class="fa-solid fa-circle-info"></i>
        </span>
        MAIS INFORMAÇÔES
      </button>
    </div>
  `;

  document.getElementById(
    "banner"
  ).style.background = `linear-gradient(to right,rgba(0, 0, 0), rgba(0, 0, 0, 0.850), rgba(0, 0, 0, 0) 130%), url('${
    IMG_URL + data[indice].backdrop_path
  }') `;

  document.getElementById("banner").style.backgroundSize = "contain";
  document.getElementById("banner").style.backgroundPosition = "right";

  owl();
}

function toggleScroll() {
  document.body.classList.toggle("noScroll");
}


function fecharInfo() {
  cardSection = document.getElementById("cardSection");
  cardSection.innerHTML = ""
  toggleScroll();
}

function maisInformacoes(cartaz, titulo, descricao, nota, data) {
  
  cardSection = document.getElementById("cardSection");

  window.scrollTo(0, 0);

  toggleScroll();

  cardSection.innerHTML = `
  <div id="cardContainer" class="cardContainer" >
  <button class="botao-close" onclick="fecharInfo()">
    <span class="icon">
    <i class="fa-solid fa-xmark"></i>
    </span>
  </button>
  <div class="card" id="card" >
    <img class="cartaz" src="${cartaz}" alt="">
    <div class="cardInfos">
    
      <h2 class="titulo">${titulo}</h2>
      <div>
        <button class="botao">
          <span class="icon">
            <i class="fa-solid fa-play"></i>
          </span>
          Assistir</button>

        <button class="botao-circle">
          <span class="icon">
            <i class="fa-solid fa-plus"></i>
          </span>
          </button>
        <button class="botao-circle">
          <span class="icon">
            <i class="fa-solid fa-thumbs-up"></i>
          </span>
          </button>
      </div>
      <p class="infos"><span class="nota">Nota: ${nota}</span>
       ${data.substring(0, 4)}
       </p>
      <p class="descricao">${descricao}</p>
    
    </div>
  </div>
</div>
  `;
}

function owl() {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 8,
      },
    },
  });
}
