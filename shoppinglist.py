#Flask Klassen importieren
from flask import Flask, render_template

#instanzieren der Klasse mit argument für Module/Packete, app variable
app = Flask(__name__)
#welche URL die funktion aufruft, mit / ladet man im root verzeichnis
@app.route("/")
#Funktion
def start_page():
    return render_template('index.html')

@app.route("/add.html")
def add_page():
    return render_template('add.html')