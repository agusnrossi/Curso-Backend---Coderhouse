//-------------------EJERCICIO 1 -------------------------//
let nombre = "Agustin";

let edad = 34;

let price = 99.9;

let seriesFavoritas = [
  "Game of thrones",
  "Casa de Papel",
  "Breaking bad",
  "Peaky blinders",
];

let peliculasFavoritas = [
  {
    nombre: "El señor de los anillos",
    genero: "fantasia",
    protagonistas: ["a", "c", "f", "r", "w"],
  },
  { nombre: "El hobbit", genero: "fantasia" },
  {
    nombre: "El señor de los anillos 2",
    genero: "fantasia",
    protagonistas: ["a", "b", "g", "j", "w"],
  },
];

//-------------------EJERCICIO 2 -------------------------//

console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años`);

console.log(`Mi precio es ${price}`);

console.log(`Mis series favoritas son: ${seriesFavoritas}`);

//let pelisFavoritas = toString(peliculasFavoritas);

console.log(
  `Mis peliculas favoritas son: ${JSON.stringify(peliculasFavoritas, null, 2)}`
);

//-------------------EJERCICIO 3 -------------------------//

let incrementarEdad = (edad) => edad + 1;

console.log(incrementarEdad(edad));

//-------------------EJERCICIO 4 -------------------------//

let seriea = "loki";

seriesFavoritas = [...seriesFavoritas, seriea];

console.log(`Mis series favoritas son: ${seriesFavoritas}`);
