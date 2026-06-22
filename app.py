from flask import Flask, render_template, request, redirect, url_for
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

# La ruta invisible que procesa el formulario
@app.route("/agregar_serie", methods=["POST"])
def agregar_serie():
    titulo = request.form.get("titulo")
    portada = request.form.get("portada")
    nombre_capitulo = request.form.get("nombre_capitulo")
    url_video = request.form.get("url_video")

    series = leer_series()

    # Busca si la serie ya existe (ignorando mayúsculas/minúsculas)
    serie_existente = next((s for s in series if s["titulo"].lower() == titulo.lower()), None)

    nuevo_capitulo = {"nombre": nombre_capitulo, "url": url_video}

    if serie_existente:
        # Si la serie ya existe, solo le agregamos el nuevo capítulo
        serie_existente["capitulos"].append(nuevo_capitulo)
    else:
        # Si es nueva, armamos su ficha completa
        nueva_serie = {
            "titulo": titulo,
            "portada": portada,
            "descripcion": "Serie GL",
            "capitulos": [nuevo_capitulo]
        }
        series.append(nueva_serie)

    # Guardamos los cambios
    guardar_series(series)
    
    # Te devuelve al panel para que puedas seguir subiendo
    return redirect(url_for("admin"))

if __name__ == "__main__":
    app.run(debug=True)
