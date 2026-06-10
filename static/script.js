const series = [
    {
        titulo: "Chasing Love",
        portada: "/static/chasing.jpeg", 
        descripcion: "Serie GL",
        capitulos: [
            { nombre: "Capítulo 1", url: "https://www.bitchute.com/embed/omhOOMuqUsgL" },
            { nombre: "Capítulo 2", url: "https://www.bitchute.com/embed/TakE5P18BWDo" }
        ]
    },
    {
        titulo: "GAP",
        portada: "/static/gap.jpg", 
        descripcion: "Serie GL",
        capitulos: [
            { nombre: "Capítulo 1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ]
    },
    {
        titulo: "Affair",
        portada: "/static/affair.jpg", 
        descripcion: "Serie GL",
        capitulos: [
            { nombre: "Capítulo 1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ]
    }
];

// --- Referencias al DOM ---
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const catalogoSection = document.getElementById("catalogoSection");
const playerSection = document.getElementById("playerSection");
const grid = document.getElementById("gridSeries");

// --- Control del Menú Móvil ---
if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("mostrar-menu"); 
    });
}

// --- Función para incrustar el video ---
function inyectarVideo(url, container) {
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    container.innerHTML = `<iframe src="${embedUrl}" allowfullscreen frameborder="0"></iframe>`;
}

// --- Función para Volver al Catálogo ---
function cerrarSerie() {
    playerSection.style.display = "none";
    catalogoSection.style.display = "block";
    document.getElementById("videoContainer").innerHTML = ""; 
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Función para Abrir la Sección del Reproductor ---
function abrirSerie(serie) {
    if (catalogoSection) catalogoSection.style.display = "none";
    if (playerSection) playerSection.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });

    const tituloElement = document.getElementById("tituloSerie");
    tituloElement.innerHTML = `
        <button onclick="cerrarSerie()" class="btn-volver">
            <i class="fas fa-arrow-left"></i> Volver
        </button> 
        ${serie.titulo}
    `;

    const videoContainer = document.getElementById("videoContainer");
    const capitulos = document.getElementById("capitulos");
    capitulos.innerHTML = "";

    inyectarVideo(serie.capitulos[0].url, videoContainer);

    serie.capitulos.forEach((cap, index) => {
        const btn = document.createElement("button");
        btn.className = "capitulo";
        if (index === 0) btn.classList.add("activo"); 
        btn.innerText = cap.nombre;

        btn.onclick = () => {
            inyectarVideo(cap.url, videoContainer);
            document.querySelectorAll(".capitulo").forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
        };
        capitulos.appendChild(btn);
    });
}

// --- Renderizar la Cuadrícula del Catálogo ---
if (grid) {
    series.forEach(serie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${serie.portada}" alt="Portada de ${serie.titulo}">
            </div>
            <h3>${serie.titulo}</h3>
        `;
        card.addEventListener("click", () => abrirSerie(serie));
        grid.appendChild(card);
    });
}

// --- BUSCADOR INTEGRADO ---
const buscador = document.getElementById("buscador");
if (buscador) {
    buscador.addEventListener("input", function() {
        const textoBusqueda = this.value.toLowerCase();
        const tarjetas = document.querySelectorAll(".card");
        
        tarjetas.forEach(card => {
            const titulo = card.querySelector("h3").textContent.toLowerCase();
            if (titulo.includes(textoBusqueda)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}
