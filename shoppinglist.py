#Flask Klassen importieren
from flask import Flask, render_template,request
from entry import Entry
import json

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
@app.route("/entry_list", methods = ['GET'])
def entry_list():
    data = {}

    try:
        with open ("sample.json", "r") as file:
            data = json.load(file)
    except Exception as err:
        print(err)

    return data
@app.route("/add_entry", methods = ['POST'])
def add_entry():
    e=request.json

    entry = Entry()
    entry.article = e['Artikel']
    entry.amount = e['Menge']
    entry.price = e['Preis']
    entry.checked = False

    data = {}
    #json file wird geladen
    try:
        with open ("sample.json", "r") as file:
            data = json.load(file)
    except Exception as err:
        print(err)
    data[entry.article] = entry.__dict__

    # ein Objekt der Klasse Entry wird erzeugt aus dem Daten des Webbrowsers

    print(entry.article,entry.amount,entry.price)

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

    data = {}
    # json file wird geladen
    try:
        with open("sample.json", "r") as file:
            data = json.load(file)
    except Exception as err:
        print(err)
    data[entry.article] = entry.__dict__
    with open("sample.json", "w") as outfile:
        json.dump(data,outfile, indent=2)

    return json.dumps(entry.__dict__)

app.run(threaded=True, host='0.0.0.0')
