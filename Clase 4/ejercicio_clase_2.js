/*function mostrarLista(miLista) {
  if (miLista.length === 0) {
    console.log("lista vacia");
  } else {
    console.log(miLista);
  }
}

mostrarLista("casa");
*/

/*
(function (miLista) {
  if (miLista.length === 0) {
    console.log("lista vacia");
  } else {
    console.log(miLista);
  }
})([]);
*/

/* function crearMultiplicador(a) {
  return (function (b) {
    console.log(a * b);
  })(3);
}

crearMultiplicador(5); */
/* 
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
 */

//-------------------CLASES -----------------------------------//
/* 
class Vendedor {
  contVentas = 0;
  static ventasGral = 0;
  constructor(nombre) {
    this.nombre = nombre;
  }

  devolverResponsable() {
    return this.nombre;
  }
  obtenerContadorIndividual() {
    return this.contVentas;
  }

  obtenerContadorGeneral() {
    return Vendedor.ventasGral;
  }

  vender() {
    this.contVentas++;
    Vendedor.ventasGral++;
  }
}

const a = new Vendedor("pepe");
const b = new Vendedor("juan");
const c = new Vendedor("claudia");

a.vender();
a.vender();
a.vender();
a.vender();

b.vender();

c.vender();
c.vender();
c.vender();

console.log("pepe vendio: " + a.obtenerContadorIndividual());
console.log("juan vendio: " + b.obtenerContadorIndividual());
console.log("claudia vendio: " + c.obtenerContadorIndividual());
console.log("ventas generales : " + a.obtenerContadorGeneral());
 */
