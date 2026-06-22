// Variable global para guardar los datos cargados y usarlos en el buscador
let listaActual = [];

// Variables de elementos
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const catalogoSection = document.getElementById("catalogoSection");
const playerSection = document.getElementById("playerSection");
const grid = document.getElementById("gridSeries") || document.getElementById("gridPeliculas") || document.getElementById("gridCortos");

// Lógica del Menú
if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => menu.classList.toggle("mostrar-menu"));
}

// NUEVO: Función para cargar los datos desde Flask
async function cargarContenido(categoria) {
    try {
        const response = await fetch(`/api/contenido/${categoria}`);
        const data = await response.json();
        listaActual = data; // Guardamos en la variable global para el buscador
        renderizarSeries(data);
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

// Lógica de Renderizado
function renderizarSeries(lista) {
    if (!grid) return;
    grid.innerHTML = "";
    
    if (lista.length === 0) {
        grid.innerHTML = "<p>No hay contenido disponible en esta categoría.</p>";
        return;
    }

    lista.forEach(serie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="${serie.portada}" alt="${serie.titulo}"><h3>${serie.titulo}</h3>`;
        card.addEventListener("click", () => abrirSerie(serie));
        grid.appendChild(card);
    });
}

// Lógica de búsqueda (ahora usa listaActual)
const buscador = document.getElementById("buscador");
if (buscador) {
    buscador.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase();
        const filtradas = listaActual.filter(s => s.titulo.toLowerCase().includes(val));
        renderizarSeries(filtradas);
    });
}

// Lógica para Abrir Serie (se mantiene igual, funciona con el objeto 'serie' que le pasamos)
function abrirSerie(serie) {
    if(catalogoSection) catalogoSection.style.display = "none";
    if(playerSection) playerSection.style.display = "block";
    
    const titulo = document.getElementById("tituloSerie");
    if(titulo) {
        titulo.innerHTML = `<button onclick="cerrarSerie()" class="btn-volver">← Volver</button> ${serie.titulo}`;
    }
    
    // Rellenar meta-datos
    if (document.getElementById("meta-drama")) {
        document.getElementById("meta-drama").innerText = serie.titulo;
        document.getElementById("meta-pais").innerText = "Tailandia"; // Puedes añadir este campo en el JSON si quieres
        document.getElementById("meta-episodios").innerText = serie.capitulos ? serie.capitulos.length : "0";
        document.getElementById("sinopsisSerie").innerText = serie.descripcion || "Sinopsis no disponible.";
    }

    const vCont = document.getElementById("videoContainer");
    const caps = document.getElementById("capitulos");
    
    if (vCont && caps) {
        caps.innerHTML = "";
        if(serie.capitulos && serie.capitulos.length > 0) {
            vCont.innerHTML = `<iframe src="${serie.capitulos[0].url}" allowfullscreen></iframe>`;
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
        }
    }
}

function cerrarSerie() {
    if(playerSection) playerSection.style.display = "none";
    if(catalogoSection) catalogoSection.style.display = "block";
    const vCont = document.getElementById("videoContainer");
    if(vCont) vCont.innerHTML = ""; 
}

// --- DETECCIÓN AUTOMÁTICA DE PÁGINA ---
// Esto detecta qué página estás viendo y carga la categoría correcta
const path = window.location.pathname;
if (path.includes("peliculas")) {
    cargarContenido("peliculas");
} else if (path.includes("cortos")) {
    cargarContenido("cortos");
} else {
    cargarContenido("series"); // Por defecto o en index
}
