"use strict";

starter();

function starter() {
  document.addEventListener("DOMContentLoaded", initBtn);
}

function initBtn() {
  document.querySelector("#fah").addEventListener("click", howMuchIsIt); //uprościć za pomocą forEach
  document.querySelector("#cel").addEventListener("click", howMuchIsIt);

  document.querySelector("#fah").addEventListener("click", toggleClass); //uprościć za pomocą forEach
  document.querySelector("#cel").addEventListener("click", toggleClass);
}

function howMuchIsIt(event) {
  let degree = document.querySelector("#deg").value; //wartość pobrana z pola wpisowego
  let si = event.currentTarget.textContent; //jednostka pobrana z guzika

  const termometer = (degree, si) => {
    //testowanie czy degree jest a) odpowiednią b) liczbą, przypisywanie algorytmu odpowiedniego do jednostki.

    if (isNaN(parseFloat(degree)) === true) {
      //rozróżnia pusty string od stringa!

      if (degree.length === 0) {
        document.querySelector("#output").innerText = "najpierw cos wpisz!";
        document.querySelector("#info1").innerText = " ";
        document.querySelector("#info2").innerText = " ";
        document.querySelector("#info1").className = "wid1";
        document.querySelector("#info2").className = "wid1";
      } else {
        document.querySelector("#output").innerText = "to nie liczba...";
        document.querySelector("#info1").innerText = " ";
        document.querySelector("#info2").innerText = " ";
        document.querySelector("#info1").className = "wid1";
        document.querySelector("#info2").className = "wid1";
      }
    } else {
      //przypisuje algorytm i wykonuje go

      if (si === "fahrenheit") {
        //podano fahrenheita. Poprawny format?

        if (isNaN(degree - 1) === false) {
          //poprawny format. Za mała?

          if (degree >= -459) {
            //poprawna
            document.querySelector("#output").innerText = (degree - 32) * 5 / 9;
            document.querySelector("#info1").innerText = "Dla Fahrenheita:";
            document.querySelector("#info2").innerText = "Wynik w Celsjuszach";
            document.querySelector("#info1").className = "accept";
            document.querySelector("#info2").className = "accept";
          } else {
            //za mała
            document.querySelector("#output").innerText =
              "Najmniejszy Fah to -459!";
            document.querySelector("#info1").innerText = "!";
            document.querySelector("#info2").innerText = " ";
            document.querySelector("#info1").className = "left";
            document.querySelector("#info2").className = "wid1";
          }
        } else {
          //niepoprawny format
          if (parseFloat(degree) >= -459) {
            //poprawna
            document.querySelector("#output").innerText =
              "Literówka? Obliczam dla: " +
              parseFloat(degree) +
              ". Wynik: " +
              (parseFloat(degree) - 32) * 5 / 9;
            document.querySelector("#info1").innerText = "Dla Fahrenheita:";
            document.querySelector("#info2").innerText = "Wynik w Celsjuszach";
            document.querySelector("#info1").className = "accept";
            document.querySelector("#info2").className = "accept";
          } else {
            //zamała
            document.querySelector("#output").innerText =
              "Literówka? Chcę liczyć dla: " +
              parseFloat(degree) +
              ", ale najmniejszy Fah to -459!";
            document.querySelector("#info1").innerText = "!";
            document.querySelector("#info2").innerText = " ";
            document.querySelector("#info1").className = "left";
            document.querySelector("#info2").className = "wid1";
          }
        }
      } else {
        //podano celsiusa!

        if (isNaN(degree - 1) === false) {
          //poprawny format. Za mała?

          if (degree >= -273) {
            //poprawna
            document.querySelector("#output").innerText = degree * 9 / 5 + 32;
            document.querySelector("#info1").innerText = "Dla Celsjusza:";
            document.querySelector("#info2").innerText =
              "Wynik w Fahrenheitach:";
            document.querySelector("#info1").className = "accept";
            document.querySelector("#info2").className = "accept";
          } else {
            //za mała
            document.querySelector("#output").innerText =
              "Najmniejszy Cel to -273!";
            document.querySelector("#info1").innerText = "!";
            document.querySelector("#info2").innerText = " ";
            document.querySelector("#info1").className = "left";
            document.querySelector("#info2").className = "wid1";
          }
        } else {
          //niepoprawny format
          if (parseFloat(degree) >= -273) {
            //poprawna
            document.querySelector("#output").innerText =
              "Literówka? Obliczam dla: " +
              parseFloat(degree) +
              ". Wynik: " +
              parseFloat(degree) * 9 / 5 +
              32;
            document.querySelector("#info1").innerText = "Dla Celsjusza:";
            document.querySelector("#info2").innerText =
              "Wynik w Fahrenheitach:";
            document.querySelector("#info1").className = "accept";
            document.querySelector("#info2").className = "accept";
          } else {
            //zamała
            document.querySelector("#output").innerText =
              "Literówka? Chcę liczyć dla: " +
              parseFloat(degree) +
              ", ale najmniejszy Cel to -273!";
            document.querySelector("#info1").innerText = "!";
            document.querySelector("#info2").innerText = " ";
            document.querySelector("#info1").className = "left";
            document.querySelector("#info2").className = "wid1";
          }
        }
      }
    }
  };
  termometer(degree, si);
}

function toggleClass(event) {
  // if (//input )
  // document.querySelector("#info1").className="left";
}
