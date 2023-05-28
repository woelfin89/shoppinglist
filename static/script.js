var saveShoppinglist = JSON.parse(localStorage.getItem('ShoppinglistData')) || [];

window.onload = loadShoppinglist();

function loadShoppinglist(key){
  var list = document.getElementById("shoppinglist");
  console.log(list);
  for (var i = 0, len=saveShoppinglist.length; i<len; i++){
    var key = saveShoppinglist[i];
    
    add(key,i);
  }
}



function checkbox(i){
  var boxstate = document.getElementById("list-checkbox-" + i).checked;
  var boxitem = document.getElementById("list-item-" + i);

  if (boxstate == true){
    boxitem.remove();
    saveShoppinglist.splice(i,1);
    save();
  }
}

function add(value,i){
  shoppinglist.innerHTML +=`
  <li class="mdl-list__item" id="list-item-${i}">
    <span class="mdl-list__item-primary-content">
      <i class="material-icons  mdl-list__item-avatar">label</i>
      ${value} 
    </span>
    <span class="mdl-list__item-secondary-action">
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${i}">
        <input type="checkbox" id="list-checkbox-${i}" class="mdl-checkbox__input" />
      </label>
    </span>
  </li>
`;
}

//Artikel einfügen
function addShoppinglist(){
  //Post-Methode, Daten von Browser zu Server versenden
    fetch("/add_entry", {
        method: "POST",
        body: JSON.stringify({
            Artikel: shoppinglistfield.value
        }),
        headers:{
            "Content-type": "application/json; charset= UTF-8"
        }
    });

    //Textfeld wird geleert
    shoppinglistfield.value ='';
}

function save(){
  localStorage.setItem('ShoppinglistData', //wird im localStorage unter "ShoppinglistData" gespeichert
  JSON.stringify(saveShoppinglist)  //Variable wird in String im JSON-Format umgewandelt
);
}