
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
}


//Checkbox updatet daten von Server
function processCheckbox(checkboxID, listItemID){
    console.log(checkboxID)
    console.log(listItemID)
  var boxstate = document.getElementById(checkboxID).checked;
  var checkbox = document.getElementById(checkboxID);
  var listItem = document.getElementById(listItemID)

  var valuePrice = listItem.childNodes[5].innerText;
  var valueArticle = listItem.childNodes[1].innerText;
  var valueAmount = listItem.childNodes[3].innerText;

    fetch("/update", {
        method: "POST",
        body: JSON.stringify({
            Artikel: valueArticle,
            Menge: valueAmount,
            Preis: valuePrice,
            Checkbox: boxstate
        }),
        headers:{
            "Content-type": "application/json; charset= UTF-8",
        }
    })
   if(boxstate == true)
   {
        listItem.style.textDecoration = 'line-through';
   }
   else
   {
        listItem.style.textDecoration = 'none';
   }
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
    <span class="mdl-textfield mdl-textfield--align-left" >
       ${value.article}
    </span>
    <span class="mdl-textfield mdl-textfield--align-right">
      ${value.amount}
    </span>
    <span class="mdl-textfield mdl-textfield--align-right">
      ${value.price}
    </span>
    <span class="mdl-list__item-secondary-action">
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${key}">
        <input type="checkbox" id="list-checkbox-${key}" class="mdl-checkbox__input" onclick="processCheckbox('list-checkbox-${key}','list-item-${key}')"/>
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

function deletefunction(){
    var shoppinglist = document.getElementById("shoppinglist")
        //console.log(shoppinglist)

    var checkedBoxes = shoppinglist.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach(function(checkbox) {
        var parentElement = checkbox.parentNode;
        //parentElement.parentNode.removeChild(parentElement);

        var listItem = parentElement.parentNode.parentNode;
        var valuePrice = listItem.childNodes[5].innerText;
        var valueArticle = listItem.childNodes[1].innerText;
        var valueAmount = listItem.childNodes[3].innerText;

        fetch("/delete", {
            method: "POST",
            body: JSON.stringify({
                Artikel: valueArticle,
                Menge: valueAmount,
                Preis: valuePrice,
               }),
            headers:{
                "Content-type": "application/json; charset= UTF-8",
            }
        })
        .then(response => response.json())
        .then((data) =>{
            listItem.remove();

        });
    });

    /*remainingItems.forEach(function(item) {
        console.log(item);
    // Weitere Aktionen mit den verbleibenden Kindelementen durchführen
    });*/
    // update db server

}