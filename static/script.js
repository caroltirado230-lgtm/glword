const series = [
    { 
        titulo: "Chasing Love", 
        portada: "/static/chasing.jpeg", 
        drama: "Chasing Love",
        pais: "Tailandia",
        episodios: "8",
        emision: "2026",
        cadena: "netflix",
        sinopsis: "Dos jóvenes se encuentran en un laboratorio y una historia de amor inesperada comienza a surgir entre ellas...",
        capitulos: [
            { nombre: "Capítulo 1", url: "https://www.bitchute.com/embed/omhOOMuqUsgL" }, 
            { nombre: "Capítulo 2", url: "https://www.bitchute.com/embed/TakE5P18BWDo" }
        ] 
    },
    { 
        titulo: "GAP", 
        portada: "/static/gap.jpg",
        drama: "GAP The Series",
        pais: "Tailandia",
        episodios: "12",
        emision: "Nov 2022 - Feb 2023",
        cadena: "Channel 3, iQiyi",
        sinopsis: "Mon, una joven recién graduada, empieza a trabajar en la empresa de su ídolo de la infancia, Sam.",
        capitulos: [
            { nombre: "Capítulo 1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ] 
    },
    { 
        titulo: "Affair", 
        portada: "/static/affair.jpg", 
        drama: "Affair",
        pais: "Tailandia",
        episodios: "8",
        emision: "ago 30, 2024 - ?",
        cadena: "iQiyi, One 31",
        sinopsis: "Soy Phleng. Nací con una vida perfecta, pero todo cambió muy rápidamente después de que mi familia quebró.",
        capitulos: [
            { nombre: "EP1", url: "https://videa.hu/player?v=EVag5eqDesZPP0LZ" },
            { nombre: "EP2", url: "https://videa.hu/player?v=E2XXTlWOV5JScAdN" }
        ] 
    }
];

const grid = document.getElementById("gridSeries");

function renderizarSeries() {
    if (!grid) return;
    grid.innerHTML = "";
    series.forEach(serie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="${serie.portada}" alt="${serie.titulo}"><h3>${serie.titulo}</h3>`;
        grid.appendChild(card);
    });
}

renderizarSeries();
