const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById('campoPesquisa');
const botaoPesquisa = document.getElementById('botaoPesquisa');
const filmesGrid = document.getElementById('filmesGrid');

async function requisacaoFilmes(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição:");
        }
        const data = await response.json();
        renderizarFilmes(data.results);
    } catch (error) {
        console.error("Erro", error);
        filmesGrid.innerHTML = "<p>Erro ao carregar os filmes.</p>";
    }
}
function renderizarFilmes(filmes) {
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
        card.innerHTML = `
            <img src="${image}" alt="${filme.title}">
            <h3>${filme.title}</h3>
            <p>${filme.vote_average}
            ${filme.overview}
            ${filme.genre_ids}
            $filme.release_date}</p>
        `;
        filmesGrid.appendChild(card);
    });
    }
function buscaFilme() {
    const informacao = campoPesquisa.value.trim();
    if (informacao === '') {
        window.location.reload();
        return;
    }
    console.log('Buscando por:', informacao);
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-BR;`
    requisacaoFilmes(url);
    console.log('URL de busca:', url);
    campoPesquisa.value = "";
}
botaoPesquisa.addEventListener('click', buscaFilme);
campoPesquisa.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        buscaFilme();
    }
});