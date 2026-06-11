// --- PRUEBA DE CONEXIÓN ---
alert("¡Hola! El archivo script.js sí se está cargando correctamente.");
console.log("Iniciando script...");

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
        sinopsis: "Mon, una joven recién graduada, empieza a trabajar en la empresa de su ídolo de la infancia, Sam. Sin embargo, al conocerla, descubre que es muy diferente a lo que imaginaba.",
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
        sinopsis: "Soy Phleng. Nací con una vida perfecta, pero todo cambió muy rápidamente después de que mi familia quebró. La vida no era tan mala cuando tenía a mi amiga de la infancia, Wanwiwa, que creció a mi lado. Sin embargo, por alguna desafortunada razón tuve que marcharme. Más de una década después, el destino juega su papel y nos vuelve a unir.",
        capitulos: [
            { nombre: "EP1", url: "https://videa.hu/player?v=EVag5eqDesZPP0LZ" },
            { nombre: "EP2", url: "https://videa.hu/player?v=E2XXTlWOV5JScAdN" },
            { nombre: "EP3", url: "https://videa.hu/player?v=r1agOy5u7W7f2aAO" },
            { nombre: "EP4", url: "https://videa.hu/player?v=0N4FHliz32UbIIbJ" },
            { nombre: "EP5", url: "https://videa.hu/player?v=QYZeapYyAxuwqdrY" },
            { nombre: "EP6", url: "https://videa.hu/player?v=PRxxAkuCpVFzddwz" },
            { nombre: "EP7", url: "https://videa.hu/player?v=BOoFnLRf7dyp1MDu" },
            { nombre: "EP8 Final", url: "https://videa.hu/player?v=JWFzKWK0nJHzz5ym" }
        ] 
    }
];

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const catalogoSection = document.getElementById("catalogoSection");
const playerSection = document.getElementById("playerSection");
const grid = document.getElementById("gridSeries");

if (!grid) {
    console.error("ERROR CRÍTICO: No se encontró el elemento con ID 'gridSeries' en el HTML.");
} else {
    console.log("¡Contenedor gridSeries encontrado con éxito!");
}

// Menú
if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => menu.classList.toggle("mostrar-menu"));
}

// Lógica de Renderizado CON IMÁGENES
function renderizarSeries(lista = series) {
    if (!grid) return;
    grid.innerHTML = "";
    lista.forEach(serie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="${serie.portada}" alt="${serie.titulo}"><h3>${serie.titulo}</h3>`;
        card.addEventListener("click", () => abrirSerie(serie));
        grid.appendChild(card);
    });
    console.log("Series renderizadas en pantalla.");
}

function abrirSerie(serie) {
    catalogoSection.style.display = "none";
    playerSection.style.display = "block";
    
    document.getElementById("tituloSerie").innerHTML = `<button onclick="cerrarSerie()" class="btn-volver">← Volver</button> ${serie.titulo}`;
    
    if (document.getElementById("meta-drama")) {
        document.getElementById("meta-drama").innerText = serie.drama || serie.titulo;
        document.getElementById("meta-pais").innerText = serie.pais || "Tailandia";
        document.getElementById("meta-episodios").innerText = serie.episodios || "?";
        document.getElementById("meta-emision").innerText = serie.emision || "?";
        document.getElementById("meta-cadena").innerText = serie.cadena || "?";
        document.getElementById("sinopsisSerie").innerText = serie.sinopsis || "Sinopsis no disponible en este momento.";
    }

    const vCont = document.getElementById("videoContainer");
    const caps = document.getElementById("capitulos");
    caps.innerHTML = "";
    
    vCont.innerHTML = `<iframe src="${serie.capitulos[0].url}" allowfullscreen></iframe>`;
    
    serie.capitulos.forEach((cap, i) => {
        const btn = document.createElement("button");
        btn.className = `capitulo ${i === 0 ? 'activo' : ''}`;
        btn.innerText = cap.nombre;
        btn.onclick = () => {
            vCont.innerHTML = `<iframe src="${cap.url}" allowfullscreen></iframe>`;
            document.querySelectorAll(".capitulo").forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
        };
        caps.appendChild(btn);
    });
}

function cerrarSerie() {
    playerSection.style.display = "none";
    catalogoSection.style.display = "block";
    document.getElementById("videoContainer").innerHTML = "";
}

// Inicializar el catálogo
renderizarSeries();

// Buscador
const buscador = document.getElementById("buscador");
if (buscador) {
    buscador.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase();
        const filtradas = series.filter(s => s.titulo.toLowerCase().includes(val));
        renderizarSeries(filtradas);
    });
}
