// Base de datos local: las portadas cargan directo desde tu propia carpeta
const listaSeries = [
    {
        titulo: "Chasing Love - Capitulo 1",
        videoUrl: '<iframe allowfullscreen style="border: none; width:100%; aspect-ratio:16 / 9;" scrolling="no" frameborder="0" src="https://www.bitchute.com/embed/omhOOMuqUsgL"></iframe>', 
        // Imagen alternativa optimizada para Chasing Love
        portada: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500",
        descripcion: "La historia sigue a Song, una investigadora gastronómica que, tras una aventura de una noche, descubre que su ligue es Piangrawin, la hija del presidente de su empresa."
    },
    {
    titulo: "Chasing Love - Capítulo 2",
    videoUrl: '<iframe width="100%" height="100%" src="https://www.bitchute.com/embed/TakE5P18BWDo/" frameborder="0" allow="fullscreen"></iframe>', 
    portada: "https://i.postimg.cc/mD36K87P/chasing-love.jpg",
    descripcion: "Disfruta del segundo episodio de Chasing Love. Traducción exclusiva al español por Glword."
  },
    {
        titulo: "GAP: The Series",
        videoUrl: "https://ok.ru/videoembed/7135338000000", 
        // Imagen alternativa optimizada para GAP
        portada: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500", 
        descripcion: "Mon, una estudiante recién graduada de la universidad, comienza a trabajar en una gran empresa porque admira a Sam, la jefa de sangre azul. Sin embargo, al conocerla en persona, descubre que la realidad es muy diferente a la imagen que los medios muestran de ella."
    },
    {
        titulo: "Affair",
        videoUrl: "https://ok.ru/videoembed/7135338000000", 
        // Imagen alternativa optimizada para Affair
        portada: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500", 
        descripcion: "Una historia de amor profundo, superación y las complejidades de las relaciones humanas en un entorno moderno."
    }
];

// Dibuja la cuadrícula de portadas
function renderizarCatalogo() {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;

    grid.innerHTML = '';

    listaSeries.forEach(serie => {
        const card = document.createElement('div');
        card.className = 'serie-card';
        card.innerHTML = `
            <div class="poster-container">
                <img src="${serie.portada}" alt="${serie.titulo}">
            </div>
            <div class="serie-info">
                <h4>${serie.titulo}</h4>
            </div>
        `;

        card.addEventListener('click', () => {
            mostrarDetalles(serie);
        });

        grid.appendChild(card);
    });
}

// Inyecta el reproductor dinámico y cambia la pantalla
function mostrarDetalles(serie) {
    const catalogView = document.getElementById('catalogView');
    const detailsView = document.getElementById('detailsView');
    const playerContainer = document.getElementById('okRuPlayerContainer');
    
    document.getElementById('serieTitle').textContent = serie.titulo;
    document.getElementById('serieDescription').textContent = serie.descripcion;

    // Detecta si es un código iframe completo o solo una URL de video
    if (serie.videoUrl.trim().startsWith('<iframe')) {
        playerContainer.innerHTML = serie.videoUrl;
    } else {
        playerContainer.innerHTML = `
            <iframe 
                src="${serie.videoUrl}" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
        `;
    }

    catalogView.style.display = 'none';
    detailsView.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Manejo de eventos del DOM
document.addEventListener('DOMContentLoaded', () => {
    renderizarCatalogo();

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const catalogView = document.getElementById('catalogView');
            const detailsView = document.getElementById('detailsView');
            const playerContainer = document.getElementById('okRuPlayerContainer');

            // Limpiamos el reproductor para destruir el video de inmediato al salir
            playerContainer.innerHTML = ''; 

            detailsView.style.display = 'none';
            catalogView.style.display = 'block';
        });
    }
});
