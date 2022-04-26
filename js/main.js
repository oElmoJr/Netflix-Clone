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
    const { poster_path } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("item");

    movieEl.innerHTML = `
    <img class="box-filme" src="${IMG_URL + poster_path}" alt="" />
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
    const { poster_path } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("item");

    movieEl.innerHTML = `
    <img class="box-filme" src="${IMG_URL + poster_path}" alt="" />
    `;

    carroselFilme.appendChild(movieEl);
  });

  owl();

  let desc = data[0].overview;

  bannerContainer.innerHTML = `
    <h3 class="titulo">${data[0].title}</h3>
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
      <button role="button" class="botao">
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
    IMG_URL + data[0].backdrop_path
  }') `;

  document.getElementById("banner").style.backgroundSize = "contain";
  document.getElementById("banner").style.backgroundPosition = "right";

  owl();
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
