from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os

app = Flask(__name__)

# Ruta donde se guardarán los datos de tus series
Ruta_JSON = os.path.join(app.static_folder, 'series.json')

# --- Funciones de ayuda para leer y guardar ---
def leer_series():
    if not os.path.exists(Ruta_JSON):
        return []
    with open(Ruta_JSON, 'r', encoding='utf-8') as archivo:
        return json.load(archivo)

def guardar_series(datos):
    with open(Ruta_JSON, 'w', encoding='utf-8') as archivo:
        json.dump(datos, archivo, indent=4, ensure_ascii=False)

# --- Rutas de tu página ---

@app.route("/")
def home():
    return render_template("index.html")

# Tu nueva ruta secreta para administrar
@app.route("/admin")
def admin():
    return render_template("admin.html")

# API para obtener todas las series
@app.route("/api/series")
def get_series():
    return jsonify(leer_series())

# La ruta mejorada que procesa el formulario
@app.route("/agregar_contenido", methods=["POST"])
def agregar_contenido():
    tipo = request.form.get("tipo")
    titulo = request.form.get("titulo")
    portada = request.form.get("portada")
    nombre_capitulo = request.form.get("nombre_capitulo")
    url_video = request.form.get("url_video")

    contenidos = leer_series()

    # Busca si el contenido ya existe (ignorando mayúsculas/minúsculas)
    contenido_existente = next((c for c in contenidos if c["titulo"].lower() == titulo.lower()), None)

    nuevo_capitulo = {"nombre": nombre_capitulo, "url": url_video}

    if contenido_existente:
        # Si ya existe, solo le agregamos el nuevo capítulo/película
        contenido_existente["capitulos"].append(nuevo_capitulo)
    else:
        # Si es nuevo, armamos su ficha completa
        nuevo_contenido = {
            "tipo": tipo,
            "titulo": titulo,
            "portada": portada,
            "descripcion": "Película GL" if tipo == "pelicula" else "Serie GL",
            "drama": titulo,
            "pais": "Tailandia",
            "episodios": "1" if tipo == "pelicula" else "?",
            "emision": "2026",
            "cadena": "Glword",
            "sinopsis": "Contenido GL",
            "capitulos": [nuevo_capitulo]
        }
        contenidos.append(nuevo_contenido)

    # Guardamos los cambios
    guardar_series(contenidos)
    
    # Te devuelve al panel para que puedas seguir subiendo
    return redirect(url_for("admin"))

if __name__ == "__main__":
    app.run(debug=True)
