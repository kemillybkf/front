document.addEventListener("DOMContentLoaded", function () {
    const inicio = document.getElementById('inicio');
    const filmes = document.getElementById('filmes');
    const series = document.getElementById('series');
    inicio.addEventListener("click", function (e){
        window.location.href = "/index.html";
    });
    filmes.addEventListener("click", function (e){
        window.location.href = "/index.html?tipo=filme";
    });
    series.addEventListener("click", function (e){
        window.location.href = "/index.html?tipo=series";
    });
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
        document.body.classList.add("tema-claro");
    }
});
const botaoTema = document.getElementById("botaoTema");
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");
    const temaAtual = document.body.classList.contains
    ("tema-claro")
            ? "claro"
            : "escuro";
        localStorage.setItem("tema", temaAtual);
});