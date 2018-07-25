"use strict";

// TABLICE.
////////////////////////////////////////////
/* indeks każdej waluty (values) odpowiata indeksowi jej przelicznika na złotówki (count) */
var counts = [1, 3, 4, 6];
var values = ["złoty", "dolar", "euro", "frank"];

// INIT.
////////////////////////////////////////////
/* inicjuje wszystko, co wymaga drzewa DOM */
document.addEventListener("DOMContentLoaded", function init() {
  //elementy HTML kalkulatora
  var inputField = document.querySelector("#input");
  var outputField = document.querySelector("#output");
  var selectGiveInp = document.querySelector("#select1");
  var selectGetInp = document.querySelector("#select2");
  var okBtn = document.querySelector("#ok");
  //elementy HTML formularza
  var alertGreen = document.querySelector("#green");
  var alertRed = document.querySelector("#red");
  var addBtn = document.querySelector("#ok2");
  var valueNewInp = document.querySelector("#newvalue");
  var countNewInp = document.querySelector("#newcount");

  // INICJOWANIE FORMULARZA
  ////////////////////////////////////////////
  /* akcje myszki i entera */

  //na klik
  addBtn.addEventListener("click", newValue);

  //na enter
  countNewInp.addEventListener("keyup", function enter(event) {
    if (event.keyCode === 13) {
      newValue();
    }
  });

  //na enter - przejście z 1 do 2 pola formularza
  valueNewInp.addEventListener("keyup", function enter(event) {
    if (event.keyCode === 13) {
      countNewInp.focus();
      inputAlert(); //czyszczenie zaległych alertów
    }
  });

  // WALIDATOR FORMULARZA
  ////////////////////////////////////////////
  /* sprawdza poparwność wypełnienia pól */
  function newValue() {
    //valueNew i countNew muszą być ustalone po wypełnienieniu pól...
    //a jako zmienne globalne, ustaliłyby się w chwili załadowania DOM.
    let valueNew = document
      .querySelector("#newvalue")
      .value.trim()
      .toLowerCase();
    let countNew = parseFloat(document.querySelector("#newcount").value);

    //Akceptacja każdego niepustego stringa:
    if (valueNew.length > 0) {
      //...w tym akceptacja poprawnego przelicznika:
      if (countNew !== 0 && isNaN(countNew) === false) {
        valueNewInp.value = "";
        countNewInp.value = "";
        countNewInp.blur();
        valueNewInp.blur();
        addValue(valueNew, countNew); //dodanie do kalkulatora
      } else {
        //...w tym wykrycie niepoprawnego przelicznika:
        countNewInp.value = "";
        countNewInp.focus();
        inputAlert(1); //alert
      }
      //Wykrycie pustego stringa:
    } else {
      //...W tym akceptacja poprawnej wartości:
      if (countNew !== 0 && isNaN(countNew) === false) {
        valueNewInp.value = "";
        valueNewInp.focus();
        inputAlert(1); //...alert
      } else {
        //...W tym wykrycie niepoprawnej wartości:
        valueNewInp.value = "";
        countNewInp.value = "";
        valueNewInp.focus();
        inputAlert(2); //alert
      }
    }
  }

  // DODANIE FORMULARZA DO KALKULATORA
  ////////////////////////////////////////////
  /* dodaje wartości formularza do kalkulatora - jeśli przeszły walidację */
  function addValue(valueNew, countNew) {
    //Co 1 obrót pętli, testowana jest 1 kolejna nazwa z tablicy values...
    for (let i = 0; i < values.length; i++) {
      //..i gdy nowa nazwa równa się starej:
      if (valueNew === values[i]) {
        counts[i] = countNew; //zastąpienie przelicznika dla tej nazwy.
        inputAlert(3, valueNew); //alert - potwierdzenie.
        break;
        //..i gdy nowa nazwa nie równa się starej:
      } else {
        //w tym była to ostatnia stara nazwa tablicy:
        if (i === values.length - 1) {
          values.push(valueNew); // dodajemy nową nazwę do tablicy, na koniec.
          counts.push(countNew); // dodajemy nowy przelicznik, też na koniec.
          let opt = document.createElement("option"); //dodajemy nową walutę do interface.
          let opt2 = document.createElement("option");
          selectGiveInp.appendChild(opt);
          selectGetInp.appendChild(opt2);
          opt.value = valueNew;
          opt2.value = valueNew;
          opt.innerText = valueNew;
          opt2.innerText = valueNew;
          inputAlert(4, valueNew); // alert - potwierdzenie.
          break;
        }
      }
    }
  }

  // WYŚWIETLANIE ALERTÓW
  ////////////////////////////////////////////
  /* "alerty" dla walidatora oraz "potwierdzenia" dla funkcji dodającej */
  function inputAlert(x, valueNew) {
    //każda sytuacja odpala funkcję inputAlert z inną wartością "x", by wyświetlić swój komunikat.
    if (x === 1) {
      document.activeElement.style.backgroundColor = "rgba(255, 100, 100, 1)";
      document.activeElement.style.color = "white";
      alertRed.innerText = "Tu jest błąd!";
      alertRed.style.display = "flex";
      alertGreen.style.display = "none";
    } else if (x === 2) {
      countNewInp.style.backgroundColor = "rgba(255, 100, 100, 1)";
      countNewInp.style.color = "white";
      valueNewInp.style.backgroundColor = "rgba(255, 100, 100, 1)";
      valueNewInp.style.color = "white";
      alertRed.innerText = "Masz 2 błędy!";
      alertRed.style.display = "flex";
      alertGreen.style.display = "none";
    } else if (x === 3) {
      countNewInp.style.backgroundColor = "";
      countNewInp.style.color = "";
      valueNewInp.style.backgroundColor = "";
      valueNewInp.style.color = "";
      alertRed.style.display = "none";
      alertGreen.style.display = "flex";
      alertGreen.innerText = "Poprawiłem '" + valueNew + "'!";
    } else if (x === 4) {
      countNewInp.style.backgroundColor = "";
      countNewInp.style.color = "";
      valueNewInp.style.backgroundColor = "";
      valueNewInp.style.color = "";
      alertRed.style.display = "none";
      alertGreen.style.display = "flex";
      alertGreen.innerText = "'" + valueNew + "' - dodałem!";
      //sytuacja specjalna:
    } else if (x === 69) {
      outputField.innerText =
        "HEHE " +
        valueNew +
        " ,ROZUMIECIE LOOLOLOLOLO " +
        valueNew +
        valueNew +
        " xdxXDXD!!!!1!1!!11!";
      //wygaszanie alertów:
    } else {
      countNewInp.style.backgroundColor = "";
      countNewInp.style.color = "";
      valueNewInp.style.backgroundColor = "";
      valueNewInp.style.color = "";
      alertRed.style.display = "none";
      alertGreen.style.display = "none";
    }
  }

  // URUCHAMIANIE KALKULATORA WALUT
  ////////////////////////////////////////////
  /* na click i na enter */

  //click - uruchomienie
  okBtn.addEventListener("click", function click(event) {
    calc();
    inputAlert();
    valueNewInp.value = "";
    countNewInp.value = "";
  });

  //enter - uruchomienie
  inputField.addEventListener("keyup", function enter(event) {
    if (event.keyCode === 13) {
      calc();
    }
  });

  //czyszczenie alertów formulrza, gdy kalkulator skupia uwagę usera
  inputField.addEventListener("focus", function clear(event) {
    inputAlert();
    valueNewInp.value = "";
    countNewInp.value = "";
  });
  selectGiveInp.addEventListener("focus", function clear(event) {
    inputAlert();
    valueNewInp.value = "";
    countNewInp.value = "";
  });
  selectGetInp.addEventListener("focus", function clear(event) {
    inputAlert();
    valueNewInp.value = "";
    countNewInp.value = "";
  });

  // KALKULATOR WALUT
  ////////////////////////////////////////////
  /* działa dla wartości z tablic: values i counts */
  function calc() {
    //te zmienne muszą być ustalone w chwili odpalenia funkcji calc...
    //...bo inaczej ustaliłyby wartość pustych inputów w chwili załadowania DOM
    var inputCash = parseFloat(document.querySelector("#input").value);
    var selectGive = document.querySelector("#select1").value;
    var selectGet = document.querySelector("#select2").value;

    //Pętla biegnie po tablicy walut:
    for (let i = 0; i < values.length; i++) {
      //Gdy znaleziono indeks waluty wejścia...
      if (selectGive === values[i]) {
        //...pętla wewnętrza szuka indeksu waluty wyjścia:
        for (let j = 0; j < values.length; j++) {
          //Gdy znaleziono indeks waluty wyjścia...
          if (selectGet === values[j]) {
            //...podstawiamy pod wzór przeliczniki o znalezionych indeksach:
            let holder = inputCash * (counts[i] / counts[j]);
            //Jeśli wynik większy od zera:
            if (isNaN(holder) === false && holder !== 0) {
              outputField.innerText = holder;
              //Jeśli wynik to zero:
            } else if (isNaN(holder) === false && holder === 0) {
              outputField.innerText =
                "Zero " +
                values[i] +
                " - rozmieniam to na brak " +
                values[j] +
                " i 'nic' dorzucam gratis";
              //Jeśli wynik nie jest liczbą (nie wpisano gotówki):
            } else {
              outputField.innerText = "ale masz jakiś hajz, co?";
            }
          }
        }
      }
    }
  }

  // WYKRYWACZ WULGARYZMÓW
  ////////////////////////////////////////////
  /* "Oszukany walidator". Uruchamia go wpisanie każdej kolejnej litery
  w pole nazwy formularza - nie trzeba zatwierdzać enterem czy klikiem.
  Np. słowo "dupa" uruchomi walidator aż cztery razy, lecz dopiero czwarta
  litera dopełni warunek "if" konieczny do dalszych procesów tej funkcji.
  Gdy w chwili kolejnego uruchomienia, w inpucie będzie wulgaryzm, oszukany wali-
  dator wyczyści oba inputy i wszelkie inne komuniakty (ale wyświetli własny alert).
  Ponieważ wulgaryzmu nie da się zatwierdzić (oszukany walidator czyści 
  inputy na samo pojawienie się wulgaryzmu, zanim może wystąpić event 
  kliknięcia lub klawisza enter) to nigdy nie wchodzi on w konflikt z
  walidatorem właściwym. Ten walidator jest oszukany dlatego, że nie jest
  częścią funkcji walidatora właściwego, i tylko udaje ją wizualnie. */
  valueNewInp.addEventListener("input", function doSomeMess() {
    //zmienna musi być tutaj ponownie zdefiniowana, bo nie jest dostępna globalnie
    let valueNew = document
      .querySelector("#newvalue")
      .value.trim()
      .toLowerCase();
    //gdy wartość inputu to wulgaryzm:
    if (
      valueNew === "dupa" ||
      valueNew === "cipa" ||
      valueNew === "chuj" ||
      valueNew === "cyce" ||
      valueNew === "cycki" ||
      valueNew === "siusiak" ||
      valueNew === "kurwa" ||
      valueNew === "dziwka" ||
      valueNew === "huj" ||
      valueNew === "hui" ||
      valueNew === "chui" ||
      valueNew === "chój" ||
      valueNew === "penis" ||
      valueNew === "seks" ||
      valueNew === "sex" ||
      valueNew === "jebańsko" ||
      valueNew === "ruchanko" ||
      valueNew === "ruchanie" ||
      valueNew === "jebanko" ||
      valueNew === "jebanie" ||
      valueNew === "kurwy" ||
      valueNew === "cyce" ||
      valueNew === "cycki" ||
      valueNew === "kurwo"
    ) {
      inputAlert(69, valueNew); //specjalny alert
      document.body.style.backgroundColor = "black";
      outputField.style.color = "red";
      outputField.style.height = "auto";
      outputField.style.width = "auto";
      outputField.style.maxWidth = "100%";
      outputField.style.fontSize = "3rem";
      outputField.style.overflow = "hidden";
      valueNewInp.value = ""; //czyszczenie obu inputów, by nie dało się uruchomić walidatora właściwego
      countNewInp.value = "";
      valueNewInp.blur(); //pozbawianie obu inputów focusu.
      countNewInp.blur();
      alertGreen.style.display = "none";
      alertRed.style.display = "none";
      countNewInp.style.border = "";
      countNewInp.style.backgroundColor = "";
      countNewInp.style.color = "";
      valueNewInp.style.border = "";
      valueNewInp.style.backgroundColor = "";
      valueNewInp.style.color = "";
      document.addEventListener("click", getBackToWork); //uruchamianie przywracania kalkulatora
      document.addEventListener("keydown", function key(event) {
        if (event.keyCode === 13) {
          getBackToWork();
        }
      });
    }
  });

  //przywrócenie normalnego kalkulatora
  function getBackToWork() {
    document.body.style.backgroundColor = "white";
    outputField.style.color = "";
    outputField.style.height = "";
    outputField.style.width = "";
    outputField.style.maxWidth = "";
    outputField.style.fontSize = "";
    outputField.style.overflow = "";
    outputField.innerText = "tu będzie wynik...";
    document.removeEventListener("click", getBackToWork); //ważne! bez tego każde kliknięcie...
    //...gdziekolwiek na stronie uruchamiałoby "przywracanie kalkulatora" i czyściło inputy,
    // ...nawet gdyby kalkulator był już przywrócony.
  }
}); // init END!