const series = [
    {
        titulo: "Chasing Love",
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

// --- Referencias al DOM ---
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const catalogoSection = document.getElementById("catalogoSection");
const playerSection = document.getElementById("playerSection");
const grid = document.getElementById("gridSeries");

// --- Control del Menú Móvil ---
menuBtn.addEventListener("click", () => {
    // Usamos toggle con una clase CSS para poder animarlo luego
    menu.classList.toggle("mostrar-menu"); 
});

// --- Función para incrustar el video ---
function inyectarVideo(url, container) {
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    
    // Metemos el iframe
    container.innerHTML = `<iframe src="${embedUrl}" allowfullscreen frameborder="0"></iframe>`;
}

// --- Función para Volver al Catálogo ---
function cerrarSerie() {
    playerSection.style.display = "none";
    catalogoSection.style.display = "block";
    
    // Detiene el video al salir para que no siga sonando de fondo
    document.getElementById("videoContainer").innerHTML = ""; 
    
    // Sube la pantalla suavemente al inicio del catálogo
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Función para Abrir la Sección del Reproductor ---
function abrirSerie(serie) {
    // Ocultar catálogo y mostrar reproductor
    if (catalogoSection) catalogoSection.style.display = "none";
    if (playerSection) playerSection.style.display = "block";
    
    // Subir al inicio de la pantalla (muy importante en celulares)
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Configurar el título y agregar el botón de volver
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

    // Carga el primer video automáticamente
    inyectarVideo(serie.capitulos[0].url, videoContainer);

    // Genera los botones de los capítulos
    serie.capitulos.forEach((cap, index) => {
        const btn = document.createElement("button");
        btn.className = "capitulo";
        // Al abrir, el primer capítulo aparece como activo
        if (index === 0) btn.classList.add("activo"); 
        
        btn.innerText = cap.nombre;

        btn.onclick = () => {
            inyectarVideo(cap.url, videoContainer);
            
            // Quitar clase activo de todos los botones y ponérsela solo al que se hizo clic
            document.querySelectorAll(".capitulo").forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
        };

        capitulos.appendChild(btn);
    });

    // Actualizar Disqus dinámicamente (si lo instalas más adelante)
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = serie.titulo.replace(/\s+/g, '-').toLowerCase();
                this.page.url = window.location.origin + "/#" + this.page.identifier;
            }
        });
    }
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

        card.addEventListener("click", () => {
            abrirSerie(serie);
        });

        grid.appendChild(card);
    });
}