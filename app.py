from flask import Flask, render_template

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def home():
    # Esto obliga a Flask a buscar el index.html dentro de la carpeta templates
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
