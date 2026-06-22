let series = [];

// Variables
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const catalogoSection = document.getElementById("catalogoSection");
const playerSection = document.getElementById("playerSection");
const grid = document.getElementById("gridSeries");

// Cargar series del servidor
async function cargarSeries() {
    try {
        const response = await fetch('/api/series');
        series = await response.json();
        renderizarSeries();
    } catch (error) {
        console.error('Error cargando series:', error);
    }
}

// Lógica del Menú
if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => menu.classList.toggle("mostrar-menu"));
}

// Lógica de Renderizado del Catálogo
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
}

// Lógica para Abrir una Serie y Ver Capítulos
function abrirSerie(serie) {
    if(catalogoSection) catalogoSection.style.display = "none";
    if(playerSection) playerSection.style.display = "block";
    
    // Título y botón volver
    const titulo = document.getElementById("tituloSerie");
    if(titulo) {
        titulo.innerHTML = `<button onclick="cerrarSerie()" class="btn-volver">← Volver</button> ${serie.titulo}`;
    }
    
    // Rellenar meta-datos
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
    
    if (vCont && caps) {
        caps.innerHTML = "";
        
        // Cargar el primer video automáticamente
        if(serie.capitulos && serie.capitulos.length > 0) {
            vCont.innerHTML = `<iframe src="${serie.capitulos[0].url}" allowfullscreen></iframe>`;
            
            // Crear los botones de los capítulos
            serie.capitulos.forEach((cap, i) => {
                const btn = document.createElement("button");
                btn.className = `capitulo ${i === 0 ? 'activo' : ''}`;
                btn.innerText = cap.nombre;
                btn.onclick = () => {
                    vCont.innerHTML = `<iframe src="${cap.url}" allowfullscreen></iframe>`;
                    document.querySelectorAll(".capitulo").forEach(b => b.classList.remove("activo"));
                    btn.classList.add("activo");
                    vCont.scrollIntoView({ behavior: 'smooth', block: 'center' });
                };
                caps.appendChild(btn);
            });
        } else {
            vCont.innerHTML = "<p>Aún no hay capítulos disponibles.</p>";
        }
    }
}

// Lógica para Cerrar la Serie y volver al Catálogo
function cerrarSerie() {
    if(playerSection) playerSection.style.display = "none";
    if(catalogoSection) catalogoSection.style.display = "block";
    const vCont = document.getElementById("videoContainer");
    if(vCont) vCont.innerHTML = ""; 
}

// Inicializar el catálogo al cargar la página
cargarSeries();

// Lógica del Buscador
const buscador = document.getElementById("buscador");
if (buscador) {
    buscador.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase();
        const filtradas = series.filter(s => s.titulo.toLowerCase().includes(val));
        renderizarSeries(filtradas);
    });
}
