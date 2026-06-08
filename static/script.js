// Base de datos local unificada: todas las series usan formato de capítulos
const listaSeries = [
  {
    titulo: "Chasing Love",
    portada: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500", 
    descripcion: "No te pierdas los episodios de Chasing Love. Traducción exclusiva al español traída por el equipo.",
    capitulos: [
      {
        nombre: "Capítulo 1",
        videoUrl: '<iframe allowfullscreen style="border: none; width:100%; aspect-ratio:16 / 9;" scrolling="no" src="https://ok.ru/videoembed/7135338000000"></iframe>'
      },
      {
        nombre: "Capítulo 2",
        videoUrl: '<iframe width="100%" height="100%" src="https://www.bitchute.com/embed/TakE5P18BWDo/" frameborder="0" allow="fullscreen"></iframe>'
      }
    ]
  },
  {
    titulo: "GAP: The Series",
    portada: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500",
    descripcion: "Mon, una estudiante recién graduada de la universidad, comienza a trabajar en una gran empresa porque admira a Sam.",
    capitulos: [
      {
        nombre: "Capítulo 1",
        videoUrl: "https://ok.ru/videoembed/7135338000000"
      }
    ]
  },
  {
    titulo: "Affair",
    portada: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500",
    descripcion: "La historia sigue la vida de dos personas cuyo vínculo cambia profundamente a lo largo del tiempo.",
    capitulos: [
      {
        nombre: "Capítulo 1",
        videoUrl: "https://ok.ru/videoembed/7135338000000"
      }
    ]
  }
];

// Función para pintar las tarjetas en el catálogo principal
function renderizarCatalogo() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;
  grid.innerHTML = "";

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
  
  playerContainer.innerHTML = "";
  
  // Manejo del contenedor de botones
  let zonaCapitulos = document.getElementById('zonaCapitulos');
  if (!zonaCapitulos) {
    zonaCapitulos = document.createElement('div');
    zonaCapitulos.id = 'zonaCapitulos';
    zonaCapitulos.style.margin = "20px 0";
    zonaCapitulos.style.display = "flex";
    zonaCapitulos.style.gap = "10px";
    zonaCapitulos.style.flexWrap = "wrap";
    document.getElementById('serieDescription').after(zonaCapitulos);
  }
  
  zonaCapitulos.innerHTML = "";
  
  // Como ahora todas tienen capítulos, los dibujamos directo
  if (serie.capitulos && serie.capitulos.length > 0) {
    serie.capitulos.forEach(cap => {
      const btnCap = document.createElement('button');
      btnCap.textContent = cap.nombre;
      btnCap.style.padding = "10px 20px";
      btnCap.style.background = "#e91e63"; // Rosa Glword
      btnCap.style.color = "white";
      btnCap.style.border = "none";
      btnCap.style.borderRadius = "5px";
      btnCap.style.cursor = "pointer";
      btnCap.style.fontWeight = "bold";
      
      btnCap.addEventListener('click', () => {
        inyectarVideo(cap.videoUrl, playerContainer);
      });
      
      zonaCapitulos.appendChild(btnCap);
    });
    
    // Carga el primer capítulo automáticamente al entrar
    inyectarVideo(serie.capitulos[0].videoUrl, playerContainer);
  }
  
  catalogView.style.display = 'none';
  detailsView.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función auxiliar para incrustar los videos
function inyectarVideo(videoUrl, container) {
  if (videoUrl.trim().startsWith('<iframe')) {
    container.innerHTML = videoUrl;
  } else {
    container.innerHTML = `
      <iframe src="${videoUrl}" allow="autoplay; encrypted-media" allowfullscreen style="border: none; width:100%; aspect-ratio:16 / 9;"></iframe>
    `;
  }
}

// Manejo de eventos del DOM
document.addEventListener('DOMContentLoaded', () => {
  renderizarCatalogo();
  
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('catalogView').style.display = 'block';
      document.getElementById('detailsView').style.display = 'none';
    });
  }
});
