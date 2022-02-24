let numeros = [];
let objetoNumeros = [];

const generadorNumeros = () => {
  for (let i = 0; i < 10000; i++) {
    numeros.push(parseInt(Math.random() * (21 - 1) + 1));
    // objetoNumeros.push(numeros);
  }
  console.log(numeros);
  verificarNumeros();
};

const verificarNumeros = () => {
  let contador = 0;
  let indice;
  for (let j = 1; j <= 20; ) {
    indice = numeros.indexOf(j);
    if (indice != -1) {
      contador++;
      numeros.splice(indice, 1);
    } else {
      registrar(j, contador);
      j++;
      contador = 0;
    }
  }
  console.log(String(objetoNumeros));
};

const registrar = (clave, contador) => {
  let nuevoRegistro = `{${clave},${contador}}`;
  objetoNumeros.push(nuevoRegistro);
};

generadorNumeros();
