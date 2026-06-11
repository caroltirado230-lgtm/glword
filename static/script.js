const series = [
    { titulo: "Chasing Love", portada: "/static/chasing.jpeg", capitulos: [{ nombre: "Capítulo 1", url: "https://www.bitchute.com/embed/omhOOMuqUsgL" }, { nombre: "Capítulo 2", url: "https://www.bitchute.com/embed/TakE5P18BWDo" }] },
    { titulo: "GAP", portada: "/static/gap.jpg", capitulos: [{ nombre: "Capítulo 1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }] },
    { titulo: "Affair", portada: "/static/affair.jpg", capitulos: [{ nombre: "Capítulo 1", url: "https://videa.hu/player?v=EVag5eqDesZPP0LZ" }] }, [{ nombre: "Capítulo 2", url: "https://videa.hu/player?v=E2XXTlWOV5JScAdN" }] }
];

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const catalogoSection = document.getElementById("catalogoSection");
const playerSection = document.getElementById("playerSection");
const grid = document.getElementById("gridSeries");

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
}

function abrirSerie(serie) {
    catalogoSection.style.display = "none";
    playerSection.style.display = "block";
    document.getElementById("tituloSerie").innerHTML = `<button onclick="cerrarSerie()" class="btn-volver">← Volver</button> ${serie.titulo}`;
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

// Inicializar
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
