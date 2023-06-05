
window.onload = loadShoppinglist();

function loadShoppinglist(key){
    fetch("/entry_list", {
        method: "GET",
        headers:{
            "Accept": "application/json; charset= UTF-8"
        }
        })
    //response nimmt Werte des zurückgegebenen Objekts an und json() konvertiert dieses dann in JSON-Daten
    .then(response => response.json())
    .then((data) =>{
        var entrys = data;
        const map = new Map(Object.entries(entrys))
        map.forEach(function(value,key){
            add(value, key);
        })
    });

  //var list = document.getElementById("shoppinglist");
  //console.log(list);
  //for (var i = 0, len=saveShoppinglist.length; i<len; i++){
  //  var key = saveShoppinglist[i];
    
  //  add(key,i);
  //}
  localStorage.clear()
}



function checkbox(key, boxinhalt){
    console.log(key)
  var boxstate = document.getElementById(key).checked;
  var boxitem = document.getElementById(key);
  var inhalt = document.getElementById(boxinhalt)

  console.log(boxstate)
  console.log(inhalt)

    inhalt.classList.add("boxChecked");
    fetch("/update", {
        method: "POST",
        body: JSON.stringify({
            Artikel: shoppinglistfield.value,
            Menge: amount_field.value,
            Preis: price_field.value,
            Checkbox: boxstate
        }),
        headers:{
            "Content-type": "application/json; charset= UTF-8",
        }
    })
}

//Liste Browser erzeugen
function add(value,key){
  //console.log(value)
  var listenItem =document.getElementById("list-item-" + key)
  if (listenItem != null){
    listenItem.remove();
  }
  shoppinglist.innerHTML +=`
  <li class="mdl-list__item" id="list-item-${key}">
    <span class="mdl-list__item-primary-content">
      <i class="material-icons  mdl-list__item-avatar">label</i>
      ${value.article}
      <span class="mdl-list__item-primary-content">
    </span>
    <span class="mdl-list__item-primary-content">
      ${value.amount}
    </span>
        <span class="mdl-list__item-primary-content">
      ${value.price}
    </span>
    <span class="mdl-list__item-secondary-action">
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${key}">
        <input type="checkbox" id="list-checkbox-${key}" class="mdl-checkbox__input" onclick="checkbox('list-checkbox-${key}','list-item-${key}')"/>
      </label>
    </span>
  </li>
`;

console.log(document.getElementById("list-item-" + key))
}

//Artikel einfügen
function addShoppinglist(){
  //Post-Methode, Daten von Browser zu Server versenden
    fetch("/add_entry", {
        method: "POST",
        body: JSON.stringify({
            Artikel: shoppinglistfield.value,
            Menge: amount_field.value,
            Preis: price_field.value
        }),
        headers:{
            "Content-type": "application/json; charset= UTF-8",
            "Accept": "application/json; charset= UTF-8"
        }
    })
    .then(response => response.json())
    .then((data) =>{
        var entrys = data;
            add(entrys,entrys.article);
    });
    //Textfeld wird geleert
    shoppinglistfield.value =''
    amount_field.value =''
    price_field.value ='';
}

/*function save(){
  localStorage.setItem('ShoppinglistData', //wird im localStorage unter "ShoppinglistData" gespeichert
  JSON.stringify(saveShoppinglist)  //Variable wird in String im JSON-Format umgewandelt
);
}*/