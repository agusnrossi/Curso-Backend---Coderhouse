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
