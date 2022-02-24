const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];

//-----------Punto A --------------//

const nombre = () => {
  return productos.map((producto) => producto.nombre).join(" , ");
};

nombre();
//-----------Punto B --------------//

const precioTotal = () => {
  return parseFloat(
    productos
      .map((producto) => producto.precio)
      .reduce((acumulador, producto) => acumulador + producto)
  ).toFixed(2);
};

precioTotal();

//-----------Punto C --------------//

const precioPromedio = () => {
  return parseFloat(
    productos.reduce(
      (acumulador, producto) => acumulador + producto.precio,
      0
    ) / productos.length
  ).toFixed(2);
};

precioPromedio();

//-----------Punto D --------------//

const menor = () => {
  return productos.reduce((acumulador, producto) =>
    acumulador.precio < producto.precio ? acumulador : producto
  ).precio;
};

menor();

//-----------Punto E --------------//

const mayor = () => {
  return productos.reduce((acumulador, producto) =>
    acumulador.precio > producto.precio ? acumulador : producto
  ).precio;
};

mayor();

//-----------Punto E --------------//

let productoTotal = {
  nombres: nombre(),
  precioTotal: precioTotal(),
  precioPromedio: precioPromedio(),
  menor: menor(),
  mayor: mayor(),
};

console.log(JSON.stringify(productoTotal, null, 2));
