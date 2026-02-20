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
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição:");
        }
        const data = await response.json();
        renderizarMidia(data.results);
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
    if(filme.title){
        card.innerHTML = `
            <img src="${image}" alt="${filme.title}">
            <h3>${filme.title}</h3>
            <p>${filme.overview}</p>
        `;
    }else{
         card.innerHTML = `
            <img src="${image}" alt="${filme.name}">
            <h3>${filme.name}</h3>
            <p>${filme.overview}</p>
        `;}
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