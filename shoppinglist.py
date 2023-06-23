#Flask Klassen importieren
from flask import Flask, render_template,request
from entry import Entry
import json

#instanzieren der Klasse mit argument für Module/Packete, app variable
app = Flask(__name__)

data = {}
# JSON-Datei öffnen und den Inhalt laden
try:
    with open("sample.json", "r") as file:
        data = json.load(file)
except Exception as err:
    print(err)

#welche URL die funktion aufruft, mit / ladet man im root verzeichnis
@app.route("/")
#Funktion
def start_page():
    return render_template('add.html')

@app.route("/add.html")
def add_page():
    return render_template('add.html')

@app.route("/entry_list", methods = ['GET'])
def entry_list():
    return data

@app.route("/add_entry", methods = ['POST'])
def add_entry():
    e=request.json

    entry = Entry()
    entry.article = e['Artikel']
    entry.amount = e['Menge']
    entry.price = e['Preis']
    entry.checked = False

    data[entry.article] = entry.__dict__

    # ein Objekt der Klasse Entry wird erzeugt aus dem Daten des Webbrowsers

    with open("sample.json", "w") as outfile:
        json.dump(data,outfile, indent=2)

    return json.dumps(entry.__dict__)

@app.route("/update", methods = ['POST'])
def update():
    e = request.json

    entry = Entry()
    entry.article = e['Artikel']
    entry.amount = e['Menge']
    entry.price = e['Preis']
    entry.checked = e['Checkbox']

    data[entry.article] = entry.__dict__
    with open("sample.json", "w") as outfile:
        json.dump(data,outfile, indent=2)

    return json.dumps(entry.__dict__)

@app.route("/delete", methods = ['POST'])
def delete():
    e = request.json

    entry = Entry()
    entry.article = e['Artikel']
    entry.amount = e['Menge']
    entry.price = e['Preis']

    # Löschung Inhalt
    if entry.article in data:
        del data[entry.article]

    # Aktualisierte Daten in die JSON-Datei speichern
    with open("sample.json", "w") as outfile:
        json.dump(data,outfile, indent=2)

    return json.dumps(entry.__dict__)

app.run(threaded=True, host='0.0.0.0')
