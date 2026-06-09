const series = [
    {
        titulo: "Chasing Love",
        // Ajustado a .jpeg para que coincida exactamente con tu archivo real
        portada: "/static/img/chasing.jpeg", 
        descripcion: "Serie GL",
        capitulos: [
            {
                nombre: "Capítulo 1",
                url: "https://www.bitchute.com/embed/omhOOMuqUsgL"
            },
            {
                nombre: "Capítulo 2",
                url: "https://www.bitchute.com/embed/TakE5P18BWDo"
            }
        ]
    },
    {
        titulo: "GAP",
        portada: "/static/img/gap.jpg", 
        descripcion: "Serie GL",
        capitulos: [
            {
                nombre: "Capítulo 1",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ]
    },
    {
        titulo: "Affair",
        portada: "/static/img/affair.jpg", 
        descripcion: "Serie GL",
        capitulos: [
            {
                nombre: "Capítulo 1",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ]
    }
];

// --- Control del Menú ---
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// --- Función que te faltaba para incrustar el video ---
function inyectarVideo(url, container) {
    // Truco para transformar un link normal de YouTube a formato "embed" para iframe
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    
    const embedUrl = videoId
  ? `https://www.youtube.com/embed/${videoId}`
  : url;
    
    // Metemos el iframe dentro del contenedor de tu CSS
    container.innerHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;
}

// --- Función para Abrir la Sección del Reproductor ---
function abrirSerie(serie) {
    // Si tu reproductor está oculto al inicio, puedes mostrarlo así:
    const playerSection = document.getElementById("playerSection");
    if (playerSection) playerSection.style.display = "block";

    document.getElementById("tituloSerie").innerText = serie.titulo;
    const videoContainer = document.getElementById("videoContainer");
    const capitulos = document.getElementById("capitulos");

    capitulos.innerHTML = "";

    // Carga el primer video automáticamente
    inyectarVideo(serie.capitulos[0].url, videoContainer);

    // Genera los botones de los capítulos
    serie.capitulos.forEach(cap => {
        const btn = document.createElement("button");
        btn.className = "capitulo";
        btn.innerText = cap.nombre;

        btn.onclick = () => {
            inyectarVideo(cap.url, videoContainer);
        };

        capitulos.appendChild(btn);
    });

    // Desplazamiento suave al reproductor
    if (playerSection) playerSection.scrollIntoView({ behavior: "smooth" });
}

// --- Renderizar la Cuadrícula del Catálogo ---
const grid = document.getElementById("gridSeries");

if (grid) {
    series.forEach(serie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${serie.portada}">
            <h3>${serie.titulo}</h3>
        `;

        card.addEventListener("click", () => {
            abrirSerie(serie);
        });

        grid.appendChild(card);
    });
}
