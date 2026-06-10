/* --- Estilos Generales --- */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
}

body{
    background: #0f0f12;
    color: white;
}

/* --- Encabezado / Menú --- */
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #15151a;
    border-bottom: 2px solid #e91e63;
    position: relative; /* Para que el menú flotante se alinee bien */
}

.logo{
    color: #e91e63;
    font-size: 28px;
    font-weight: bold;
}

#menuBtn{
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
}

/* --- Menú Desplegable Flotante --- */
nav{
    display: none; /* Oculto por defecto */
    position: absolute;
    top: 75px;
    right: 20px;
    background: #15151a; 
    padding: 10px;
    border-radius: 8px;
    border: 2px solid #e91e63; 
    box-shadow: 0px 4px 20px rgba(233, 30, 99, 0.3); 
    z-index: 100; 
    min-width: 180px;
}

/* Esta clase es la que activa el JS para mostrar el menú */
nav.mostrar-menu {
    display: block;
}

nav a{
    display: block;
    color: white;
    text-decoration: none;
    padding: 12px 15px;
    margin: 5px 0;
    font-weight: 600;
    font-size: 0.95rem;
    border-radius: 6px;
    transition: all 0.3s ease;
}

nav a:hover{
    background: #e91e63;
    color: white;
    transform: translateX(-5px); 
}

/* --- Banner de Bienvenida --- */
.banner{
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 20px; 
}

.banner h1{
    color: #e91e63;
    margin-bottom: 10px;
}

/* --- Catálogo de Tarjetas --- */
.catalogo{
    padding: 20px; /* Un poco menos de padding para móviles */
}

.catalogo h2 {
    margin-bottom: 20px;
}

/* Adaptación Mobile-First de la cuadrícula */
.grid{
    display: grid;
    /* En celulares: columnas de mínimo 140px (entran 2 por pantalla) */
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
}

/* En tablets y PC: volvemos a tu tamaño original */
@media (min-width: 768px) {
    .grid{
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;
        padding: 30px;
    }
}

.card{
    background: #18181d;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform .3s ease, box-shadow .3s ease;
}

.card:hover{
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(233, 30, 99, 0.2); 
}

.card img{
    width: 100%;
    /* Altura más pequeña en celulares para que no se vea estirado */
    height: 220px; 
    object-fit: cover;
}

@media (min-width: 768px) {
    .card img{
        height: 320px; /* Tu altura original para PC */
    }
}

.card h3{
    padding: 15px;
    font-size: 1rem;
    text-align: center;
}

/* --- Sección del Reproductor --- */
.player-section{
    padding: 40px 20px;
    background: #131318; 
    border-top: 2px solid #e91e63;
    text-align: center;
    /* La margen superior se elimina porque ahora reemplaza al catálogo visualmente */
}

/* Título y Botón de volver alineados */
#tituloSerie {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap; /* Por si el título es muy largo en celular */
}

/* Nuevo estilo para el botón de Volver */
.btn-volver {
    background: transparent;
    color: white;
    border: 1px solid white;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: 0.3s;
}

.btn-volver:hover {
    background: white;
    color: #131318;
}

/* Contenedor inteligente del Video */
#videoContainer {
    max-width: 850px;
    margin: 0 auto 25px auto;
    aspect-ratio: 16 / 9; 
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 25px rgba(233, 30, 99, 0.25); 
    background: #000; /* Fondo negro por si el video tarda en cargar */
}

#videoContainer iframe{
    width: 100%;
    height: 100%;
    border: none;
}

#capitulos {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap; 
    max-width: 850px;
    margin: 0 auto 30px auto;
}

/* --- Botones de Capítulos --- */
.capitulo{
    background: transparent;
    border: 2px solid #e91e63;
    color: #e91e63;
    padding: 10px 22px;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    border-radius: 25px; 
    transition: all .3s ease;
}

.capitulo:hover, .capitulo.activo {
    background: #e91e63;
    color: white;
    box-shadow: 0px 0px 12px #e91e63;
    transform: scale(1.05);
}

/* --- Footer de Comunidad --- */
.footer-comunidad {
    text-align: center;
    padding: 50px 20px;
    background: #15151a;
    border-top: 2px solid #e91e63;
    margin-top: 40px;
}

.footer-comunidad h2 {
    margin-bottom: 10px;
    color: white;
}

.footer-comunidad p {
    margin-bottom: 25px;
    color: #bbb;
}

.botones-comunidad {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 30px;
}

.botones-comunidad a.btn-comunidad {
    display: inline-flex !important;
    align-items: center;
    gap: 10px;
    text-decoration: none !important; 
    color: white !important; 
    padding: 12px 25px;
    font-weight: bold;
    border-radius: 30px; 
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.botones-comunidad a.telegram { background-color: #229ED9 !important; }
.botones-comunidad a.telegram:hover { background-color: #1a7fb0 !important; }

.botones-comunidad a.donacion { background-color: #e91e63 !important; }
.botones-comunidad a.donacion:hover { background-color: #c2185b !important; }

.credits {
    font-size: 0.85rem;
    color: #777 !important;
}
