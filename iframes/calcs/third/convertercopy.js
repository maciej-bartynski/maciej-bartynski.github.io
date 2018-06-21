"use strict";

//WARTOŚCI DOSTEPNE W KONWERTERZE NA START
let calc = {
  basic: function() {
    return 1;
  },

  howMuch: function(num, input, output) {
    return num * (this[input]() / this[output]());
  }
};
//KONIEC

//Sekcje layoutu kalkulatora:
var branches; //przyciski z "rodzinami danych"
var upper; //formularz dodawania "rodzin danych"
var main; //część główna
var below; //formularz uzupełniający

var holder; //id bieżącego guzika
var btnIds = []; //wszystkie "id" guzików
var optValues = []; //wszystkie "value" options
var appear; //zmienna dla funkcji "layout"
document.addEventListener("DOMContentLoaded", init);

//INIT
function init() {
  //Ustalanie zmiennych dla layoutu:
  branches = document.getElementById("branches");
  upper = document.getElementById("hidden");
  main = document.getElementById("main");
  below = document.getElementById("below");
  //Kreowanie początkowych danych kalkulatora:
  createBtns(makeValid("długość", 1));
  optCreator(makeValid("metr", 2));
  optCreator(makeValid("kilometr", 2), 1000, makeValid("metr", 2)[1]);
  createBtns(makeValid("waluta", 1));
  optCreator(makeValid("złoty", 2));
  optCreator(makeValid("dolar", 2), 4, makeValid("złoty", 2)[1]);
  //Właczenie sekcji dodawania guzików (nowych "rodzin danych")
  document.getElementById("nowy").addEventListener("click", function() {
    layout(1);
    title("nowy");
    isClicked("nowy");
    document.getElementById("hidden_input").focus();
    removeAlert(document.getElementById("hidden_input"));
    removeAlert(document.getElementById("hidden_input-B"));
    removeAlert(document.getElementById("newcount"));
    removeAlert(document.getElementById("newvalue"));
    removeAlert(document.getElementById("newbtnalert"));
    removeAlert(document.getElementById("newoptalert"));
  });
  //Włączanie sekcji dodawania opcji do istniejących guzików (opcji do "rodzin danych")
  document.getElementById("okB").addEventListener("click", confirmNewOpt);
  //Nasłuchiwanie potwierdzenia dodania guzika (click lub enter)
  document.getElementById("hidden_ok").addEventListener("click", confirmNewBtn);
  //usuwanie alertu dla każdego klikniętego inputu:
  for (let i = 0; i < document.querySelectorAll("input").length; i++) {
    let inputs = [];
    inputs.push(document.querySelectorAll("input")[i]);
    inputs.forEach(function(inp) {
      inp.addEventListener("focus", function() {
        removeAlert(inp);
      });
    });
  }
   //Layout na przywitanie
   layout(0);
} //INIT KONIEC

//TYTUŁ
function title (id) {
  if (id==="nowy"){
    document.getElementById("actualid").innerText="";
  }else{
    document.getElementById("actualid").innerText=id;
  }
}

//PRZEŁĄCZANIE LAYOUTU
function layout(stage) {
  if (stage === 0) {
    upper.classList.add("none");
    main.classList.add("none");
    below.classList.add("none");

  } else if (stage === 1) {
    upper.classList.add("flexbox");
    upper.classList.remove("none");
    main.classList.add("none");
    main.classList.remove("flexbox");
    below.classList.add("none");
    below.classList.remove("flexbox");

  } else {
    upper.classList.remove("flexbox");
    upper.classList.add("none");
    main.classList.add("flexbox");
    main.classList.remove("none");
    below.classList.add("flexbox");
    below.classList.remove("none");

  }
} //KONIEC

//UTWORZENIE GUZIKÓW
function createBtns(variable) {
  let name = variable[0];
  let id = variable[1];
  let occupied = variable[2];
  //Id do głównej kolekcji:
  btnIds.push(id);
  //Przełączenie layoutu
  layout(2);
  //Nowy guzik - utworzenie
  let newBtn = document.createElement("div");
  newBtn.classList.add("branch");
  newBtn.classList.add("ok");
  newBtn.classList.add("center-items");
  newBtn.classList.add("row-4");
  newBtn.innerText = name;
  //Poprawność ID guzika
  newBtn.setAttribute("id", id);
  //Guzik dodany = guzik kliknięty:
  branches.insertBefore(newBtn, document.querySelectorAll(".branch")[0]);
  newBtn.addEventListener("click", function() {
    holder = id;
    onClick();
    title(name);
    isClicked(id);
  });
  falseEvent(newBtn);
  //Utworzenie i rozmieszczenie trzech select-list:
  for (let i = 0; i < 3; i++) {
    //box dla select listy (dla safari)
    let box = document.createElement("div");
    box.classList.add(id);
    box.classList.add("center-items");
    box.classList.add("box");
    //selec-lista:
    let newSelect = document.createElement("select");
    newSelect.classList.add("select" + (i + 1));
    newSelect.classList.add("list");
    newSelect.classList.add(id);
    //lista do pudełka:
    box.appendChild(newSelect);
    //rozmieszczenie pudełek:
    if (i === 0) {
      document
        .querySelector("#sel-box-A")
        .insertBefore(box, document.getElementById("for"));
    } else if (i === 1) {
      document.querySelector("#sel-box-A").appendChild(box);
    } else {
      document.querySelector("#sel-box-B").appendChild(box);
    }
  } //koniec pętli
} //KONIEC - TWORZENIE GUZIKÓW

//SEKCJA NOWYCH GUZIKÓW - ZATWIERDZANIE DANYCH
function confirmNewBtn() {
  //Pobranie danych z formularza
  let name = document.getElementById("hidden_input").value.trim();
  let basic = document.getElementById("hidden_input-B").value.trim();
  //Kreowanie guzika:
  let keyA = makeValid(name, 1);
  let keyB = makeValid(basic, 2);
  //Kreowanie guzika z opcją, kolidującą opcją, lub odrzucenie guzika.
  if (keyA[2] === true) {
    console.log("nazwa jest zajeta");
    alerts(
      "Nazwa \""+keyA[0]+"\" jest zajęta",
      document.getElementById("hidden_input"),
      document.getElementById("newbtnalert"),
      "red"
    );
  } else if (keyB[2] === true) {
    createBtns(makeValid(name, 1));
    optCreator(makeValid(basic + "-kopia", 2));
    console.log("nazwa opcji była na innej liscie");
    alerts(
      'Nazwa "' +
        keyB[0] +
        '" jest już zajęta. Zmieniono na: ' +
        keyB[0] +
        "-kopia.",
      document.getElementById("hidden_input-B"),
      document.getElementById("newoptalert"),
      "green"
    );
  } else {
    createBtns(makeValid(name, 1));
    optCreator(makeValid(basic, 2));
    console.log("przekazano");
  }
} //KONIEC CONFIRM

//KLIKNIĘCIE GUZIKA - NOWOUTWORZONY AUTOMATYCZNIE KLIKNIĘTY
function falseEvent(newBtn) {
  var event = document.createEvent("Event");
  event.initEvent("click", false, false);
  newBtn.dispatchEvent(event);
} //KONIEC

//PODKREŚLENIE KLIKNIĘTEGO GUZIKA:
function isClicked (btn) {
    for(let i=0; i<document.querySelectorAll(".branch").length; i++){
          document.querySelectorAll(".branch")[i].classList.remove("clicked"); 
    }
    document.getElementById(btn).classList.add("clicked") 
}

//SEKCJA NOWYCH OPCJI LISTY - ZATWIERDZANIE DANYCH
function confirmNewOpt() {
  //Pobranie danych z formularza
  let name = document.getElementById("newvalue").value.trim();
  let count = parseFloat(document.getElementById("newcount").value);

  let countFor = document.querySelectorAll(("select." + holder).toString())[2]
    .value;

  if (
    count === 0 ||
    isNaN(count) === true ||
    count.toString().trim().length === 0
  ) {
    count = 1;
  }
  optCreator(makeValid(name, 2), count, countFor);
}

//ALERTY FORMULARZY
function alerts(string, input, board, color) {
  if (color === "red") {
    if (input !== false) {
      input.classList.add("red-alert");
      input.blur();
      input.value = "";
    }
    board.classList.add("board");
    board.classList.add("red-alert");
  } else {
    board.classList.add("board");
    board.classList.add("green-alert");
  }
  board.innerText = string;
}

function removeAlert(node) {
  node.classList.remove("green-alert");
  node.classList.remove("red-alert");
  node.classList.remove("board");
  node.innerText = "";
  node.value = "";
}

//WALIDATOR NAZW GUZIKÓW I OPCJI Z SELECT LISTY
function makeValid(word, typeOf) {
  word = word.toLowerCase();
  if (word.trim().length === 0) {
    word = "beznazwy";
  }
  let valid = word;
  let forbidden = [
    "ą",
    "ę",
    "ć",
    "ź",
    "ż",
    "ó",
    "ł",
    "ś",
    "ń",
    " ",
    ".",
    "/",
    "<",
    ">",
    "?",
    ";",
    "'",
    ":",
    '"',
    "[",
    "]",
    "{",
    "}",
    "`",
    "~",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "=",
    "+",
    "\\",
    "|"
  ];
  let allow = [
    "aa",
    "ee",
    "cc",
    "zz",
    "zzz",
    "oo",
    "ll",
    "ss",
    "nn",
    "x",
    "do",
    "re",
    "mi",
    "fa",
    "sol",
    "la",
    "si",
    "do",
    "sool",
    "doo",
    "uno",
    "dos",
    "tres",
    "quatro",
    "alla",
    "qumula",
    "monekyia",
    "makarena",
    "hosabela",
    "hay",
    "glilmlmlel",
    "shzhyheh",
    "ocb",
    "wtf",
    "xxx",
    "xxxx",
    "xxxxx",
    "xxxxxx",
    "smammbma",
    "rmummbma"
  ];
  forbidden.forEach(function(character) {
    for (let i = 0; i < valid.length; i++) {
      if (valid.charAt(i) === character) {
        valid = valid.replace(character, allow[forbidden.indexOf(character)]);
      }
    }
  });
  let occupied;
  if (typeOf === 1) {
    if (btnIds.indexOf(valid) !== -1) {
      occupied = true;
    }
  } else {
    if (optValues.indexOf(valid) !== -1) {
      occupied = true;
    }
  }
  let pack = [word, valid, occupied];
  return pack;
}

//KLIKNIĘCIE GUZIKA ("rodziny danych")
function onClick() {
  //Przełączenie layoutu
  layout(2);
  removeAlert(document.getElementById("hidden_input"));
  removeAlert(document.getElementById("hidden_input-B"));
  removeAlert(document.getElementById("newcount"));
  removeAlert(document.getElementById("newvalue"));
  removeAlert(document.getElementById("newbtnalert"));
  removeAlert(document.getElementById("newoptalert"));
  //Włączenie list wg. klucza guzika
  let lists = document.querySelectorAll(".box");
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].classList.contains(holder)) {
      lists[i].classList.add("flexbox");
      lists[i].classList.remove("none");
    } else {
      lists[i].classList.add("none");
      lists[i].classList.remove("flexbox");
    }
  }
} //KONIEC KLIKNIĘCIA

//DODAWANIE OPCJI DO LIST
function optCreator(variables, num, countFor) {
  let name = variables[0];
  let value = variables[1];
  let occupied = variables[2];
  if (countFor === undefined && num === undefined) {
    countFor = "basic";
    num = 1;
  }
  let nameFor;
  for(let k=0; k<(document.querySelectorAll("option")).length;k++){
    if ( (document.querySelectorAll("option"))[k].value === countFor){
      nameFor=" razy "+((document.querySelectorAll("option"))[k].innerText);
    } else if (countFor==="basic"){
      nameFor=" (miara podstawowa)"
    }
  }
  //Nadpisanie opcji:
  if (occupied === true) {
    let list = document.querySelectorAll(
      ("select." + holder + " option").toString()
    );
    let key;
    for (let j = 0; j < list.length; j++) {
      if (list[j].value === value) {
        key = 1;
      }
    }
    if (countFor === value) {
      console.log("ignotum per ignotum");
      alerts(
        ("Jednostka \""+name+"\" nie może odnosić do siebie"),
        document.getElementById("newvalue"),
        document.getElementById("newoptalert"),
        "red"
      );
    } else if (key === 1) {
      actualize();
      console.log("poprawiono");
      alerts(
        ("Poprawiono istniejącą jednostkę \""+name+"\" na "+num+nameFor),
        false,
        document.getElementById("newoptalert"),
        "green"
      );
    } else {
      console.log("taka zmienna jest na innej liście");
      alerts(
        ("Jednostka \""+name+"\" istnieje na innej liście"),
        document.getElementById("newvalue"),
        document.getElementById("newoptalert"),
        "red"
      );
    }
    //Dodanie opcji;
  } else {
    let slctNdes = document.querySelectorAll(("select." + holder).toString());
    for (let i = 0; i < slctNdes.length; i++) {
      let option = document.createElement("option");
      option.value = value;
      option.innerText = name;
      slctNdes[i].appendChild(option);
    }
    optValues.push(value);
    actualize();
    console.log("dodano opcję");
    alerts(
      ("Dodano opcję \""+name+"\"\: "+num+nameFor),
      false,
      document.getElementById("newoptalert"),
      "green"
    );
  }
  function actualize() {
    calc[value] = function() {
      return num * calc[countFor]();
    };
  }
} //NEWOPTIONS KONIEC

//koniec obsługi layoutu, start obsługi kalkulatora:

document.addEventListener("DOMContentLoaded", initConv);

function initConv() {
  document.getElementById("ok").addEventListener("click", fire);
}

function fire() {
  let num = document.getElementById("input").value;
  let number = parseFloat(num);
  let input;
  let output;
  let outtxt = "";
  let intxt = "";

  let lstArray = [];
  let nodes = document.querySelectorAll(".list");
  for (let i = 0; i < nodes.length; i++) {
    lstArray.push(nodes[i]);
  }

  lstArray.forEach(function(ls) {
    if (ls.classList.contains(holder) && ls.classList.contains("select1")) {
      input = ls.value;
      //pozyskiwanie textu opcji do wyświetlenia:
      let opts = document.querySelectorAll(
        ("select." + holder + " option").toString()
      );
      for (let op = 0; op < opts.length; op++) {
        if (opts[op].value === ls.value) {
          intxt = opts[op].innerText;
        }
      }
    } else if (
      ls.classList.contains(holder) &&
      ls.classList.contains("select2")
    ) {
      output = ls.value;
      //pozyskiwanie textu opcji do wyświetlenia:
      let opts = document.querySelectorAll(
        ("select." + holder + " option").toString()
      );
      for (let op = 0; op < opts.length; op++) {
        if (opts[op].value === ls.value) {
          outtxt = opts[op].innerText;
        }
      }
    }
    return intxt;
  });
  if (num.toString().trim().length === 0) {
    document.getElementById("output").innerText =
      "Wpisz liczbę. Nie używaj spacji ani liter.";
  } else if (number === 0) {
    document.getElementById("output").innerText = "nie przeliczam zera!";
  } else {
    document.getElementById("output").innerText =
      number +
      ' jednostki "' +
      intxt +
      '" to: ' +
      calc.howMuch(num, input, output) +
      " jednostek: " +
      outtxt;
  }
}
