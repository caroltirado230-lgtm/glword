const series = [
    {
        titulo: "Chasing Love",
        portada: "/static/chasing.jpeg", 
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
        portada: "/static/gap.jpg", 
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
        portada: "/static/affair.jpg", 
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

/* --- Importación de Tipografía Premium --- */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap');

/* --- Estilos Generales --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif !important;
}

body {
    background: radial-gradient(circle at top right, #2d1b28, #0f0f12, #0f0f12);
    color: white;
    min-height: 100vh;
}

/* --- Encabezado / Menú --- */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background: rgba(21, 21, 26, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(233, 30, 99, 0.3);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    color: #e91e63;
    font-size: 28px;
    font-weight: bold;
}

#menuBtn {
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
}

/* --- Menú Desplegable --- */
nav {
    display: none;
    position: absolute;
    top: 75px;
    right: 20px;
    background: #15151a;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #e91e63;
    box-shadow: 0px 4px 20px rgba(233, 30, 99, 0.3);
    z-index: 100;
    min-width: 180px;
}

nav.mostrar-menu { display: block; }

nav a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 12px 15px;
    margin: 5px 0;
    font-weight: 600;
    border-radius: 6px;
    transition: all 0.3s ease;
}

nav a:hover {
    background: #e91e63;
    transform: translateX(-5px);
}

/* --- Banner --- */
.banner {
    text-align: center;
    padding: 60px 20px;
}

.banner h1 {
    color: #e91e63;
    font-size: 3rem;
    margin-bottom: 10px;
}

/* --- Barra de Búsqueda --- */
.search-bar {
    width: 90%;
    max-width: 400px;
    margin: 20px auto;
    padding: 12px;
    background: #15151a;
    border: 2px solid #e91e63;
    color: white;
    border-radius: 8px;
    display: block;
    text-align: center;
    font-size: 1rem;
}

.search-bar:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(233, 30, 99, 0.5);
}

/* --- Catálogo (Grid Profesional) --- */
.catalogo { padding: 20px; }

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 30px;
        padding: 30px;
    }
}

/* --- Tarjetas (Glassmorphism) --- */
.card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(233, 30, 99, 0.2);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: #e91e63;
    box-shadow: 0 10px 30px rgba(233, 30, 99, 0.3);
}

.card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
}

@media (min-width: 768px) {
    .card img { height: 320px; }
}

.card h3 { padding: 15px; font-size: 1rem; text-align: center; }

/* --- Reproductor --- */
.player-section { padding: 40px 20px; background: #131318; border-top: 1px solid #e91e63; text-align: center; }

#tituloSerie {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 30px;
    background: linear-gradient(to right, #fff, #e91e63);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.btn-volver {
    background: transparent;
    color: white;
    border: 1px solid white;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-volver:hover { background: white; color: #131318; }

#videoContainer {
    max-width: 850px;
    margin: 0 auto 25px auto;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0px 4px 25px rgba(233, 30, 99, 0.25);
    background: #000;
}

#videoContainer iframe { width: 100%; height: 100%; border: none; }

/* --- Botones Capítulos --- */
.capitulo {
    background: transparent;
    border: 2px solid #e91e63;
    color: #e91e63;
    padding: 10px 22px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 25px;
    transition: all .3s ease;
}

.capitulo:hover, .capitulo.activo {
    background: #e91e63;
    color: white;
    box-shadow: 0px 0px 15px #e91e63;
}

/* --- Footer --- */
.footer-comunidad { text-align: center; padding: 50px 20px; background: #15151a; border-top: 1px solid #e91e63; }
.botones-comunidad a.donacion { background-color: #e91e63 !important; }
