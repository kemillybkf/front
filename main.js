const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById('campoPesquisa');
const botaoPesquisa = document.getElementById('botaoPesquisa');
const filmesGrid = document.getElementById('filmesGrid');
const inicio = document.getElementById('inicio');
const filmes = document.getElementById('filmes');
const series = document.getElementById('series');


async function requisicaoURL(url) {
    try {
        filmesGrid.classList.add("fade-out")
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição:");
        }
        const data = await response.json();
        setTimeout(() => {
            renderizarMidia(data.results);
            filmesGrid.classList.remove("fade-out");
            filmesGrid.classList.add("fade-in");
            setTimeout(() => {
                filmesGrid.classList.remove("fade-in");             
            }, 300);
        }, 200);
    } catch (error) {
        console.error("Erro", error);
        filmesGrid.innerHTML = "<p>Erro ao carregar os filmes.</p>";
    }
}
function renderizarMidia(filmes) {
    filmesGrid.innerHTML = "";
    if (!filmes || filmes.length === 0){
        filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }
    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.classList.add("card");
        const image = filme.poster_path
        ? IMAGE_URL + filme.poster_path
        : "";

    let media_type = "";
    if(filme.title){
        card.innerHTML = `
            <img src="${image}" alt="${filme.title}">
            <h3>${filme.title}</h3>
        `;
        media_type = "movie"
    }else{
         card.innerHTML = `
            <img src="${image}" alt="${filme.name}">
            <h3>${filme.name}</h3>

        `;
         media_type = "tv"
}
        card.addEventListener("click", () => { 
            window.location.href = `pages/detalhe.html?id=${filme.id}&type=${filme.media_type}`;
        })
        filmesGrid.appendChild(card);
    });
    }
function pesquisaGeral() {
    const informacao = campoPesquisa.value.trim();
    if (informacao === '') {
        carregarTendenciasGeral();
        return;
    }
    console.log('Buscando por:', informacao);
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-BR;`
    requisicaoURL(url);
    console.log('URL de busca:', url);
    campoPesquisa.value = "";
}
botaoPesquisa.addEventListener('click', pesquisaGeral);
campoPesquisa.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        pesquisaGeral();
    }
});
function buscaFilme(){
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}
function buscaSerie(){
    const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}
document.addEventListener("DOMContentLoaded", carregarTendenciasGeral);
inicio.addEventListener('click', carregarTendenciasGeral);
filmes.addEventListener('click', buscaFilme);
series.addEventListener('click', buscaSerie);
function carregarTendenciasGeral(){
    const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}
window.addEventListener("load", function (){
    const loader = this.document.getElementById("loader");
    if (loader){
        loader.style.transition = "opacity 0.5 ease";
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo === "filme") {
        buscaFilme();
    } else if (tipo === "serie") {
        buscaSerie();
    } else {
        carregarTendenciasGeral();
    }
    carregarGeneros();
    document.getElementById("filtroGenero").addEventListener("change", filtrarPorGenero);
});
async function carregarGeneros(tipo = "movie"){
    const response = await fetch(
        `${BASE_URL}/genre/${tipo}/list?api_key=${API_KEY}&language=pt-BR`
    );
    const data = await response.json();
    const select = document.getElementById("filtroGenero");
    select.innerHTML = `<option value="">Todos</option>`;
    data.genres.forEach(genero => {
        const opition = document.createElement("option");
        option.value = genero.id;
        opition.textContent = genero.name;
        select.appendChild(option);
    });
function filtrarPorGenero(){
    if (!generoid){
        carregarTendenciasGeral();
        return;
    }
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${generoid}language=pt-BR`;
}}