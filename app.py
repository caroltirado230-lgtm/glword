from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os

app = Flask(__name__)
Ruta_JSON = os.path.join(app.static_folder, 'series.json')

def leer_series():
    if not os.path.exists(Ruta_JSON): return []
    with open(Ruta_JSON, 'r', encoding='utf-8') as archivo:
        return json.load(archivo)

def guardar_series(datos):
    with open(Ruta_JSON, 'w', encoding='utf-8') as archivo:
        json.dump(datos, archivo, indent=4, ensure_ascii=False)

# --- Rutas ---
@app.route("/")
def home(): return render_template("index.html")

@app.route("/peliculas")
def peliculas(): return render_template("peliculas.html")

@app.route("/cortos")
def cortos(): return render_template("cortos.html")

@app.route("/admin")
def admin(): return render_template("admin.html")

# --- API para obtener datos por categoría ---
@app.route("/api/contenido/<categoria>")
def obtener_contenido(categoria):
    datos = leer_series()
    # Filtramos los datos que coincidan con la categoría solicitada
    filtrado = [s for s in datos if s.get("categoria") == categoria]
    return jsonify(filtrado)

# --- Lógica para agregar ---
@app.route("/agregar_serie", methods=["POST"])
def agregar_serie():
    titulo = request.form.get("titulo")
    categoria = request.form.get("categoria") # Nueva: 'series', 'peliculas' o 'cortos'
    portada = request.form.get("portada")
    nombre_capitulo = request.form.get("nombre_capitulo")
    url_video = request.form.get("url_video")

    series = leer_series()
    
    # Buscamos si ya existe por TÍTULO
    serie_existente = next((s for s in series if s["titulo"].lower() == titulo.lower()), None)
    nuevo_capitulo = {"nombre": nombre_capitulo, "url": url_video}

    if serie_existente:
        serie_existente["capitulos"].append(nuevo_capitulo)
    else:
        nueva_serie = {
            "titulo": titulo,
            "categoria": categoria, # Guardamos la categoría aquí
            "portada": portada,
            "descripcion": "Contenido GL",
            "capitulos": [nuevo_capitulo]
        }
        series.append(nueva_serie)

    guardar_series(series)
    return redirect(url_for("admin"))

if __name__ == "__main__":
    app.run(debug=True)
