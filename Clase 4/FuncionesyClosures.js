//------------------Ejerciocio 1------------------//

function mostrarLista(miLista) {
  if (miLista.length === 0) {
    console.log("lista vacia");
  } else {
    console.log(miLista);
  }
}

mostrarLista("casa");
mostrarLista(["casa", "coche", "moto"]);

//------------------Ejerciocio 2------------------//

(function (miLista) {
  if (miLista.length === 0) {
    console.log("lista vacia");
  } else {
    console.log(miLista);
  }
})([3, 4, 5]);

//------------------Ejerciocio 3------------------//

function crearMultiplicador(a) {
  return (function (b) {
    console.log(a * b);
  })(3);
}

crearMultiplicador(5);

let miCalculadora = function (a) {
  function duplicar() {
    console.log(a * 2);
  }
  function triplicar() {
    console.log(a * 3);
  }
  function multiplicador(b) {
    console.log(a * b);
  }
  return { duplicar, triplicar, multiplicador };
};

miCalculadora(8).duplicar();
miCalculadora(8).triplicar();
miCalculadora(8).multiplicador(9);
