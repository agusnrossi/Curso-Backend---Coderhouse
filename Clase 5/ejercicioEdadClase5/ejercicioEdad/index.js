const moment = require("moment");

let hoy = moment("2022-02-22");
let cumple = moment("1987-12-02");

console.log(`Hoy es ${hoy.format("DD/MMM/YYYY")}`);
console.log(`Cumpleaños es ${cumple.format("DD/MMM/YYYY")}`);

console.log(
  `Desde mi nacimiento han pasado la cantidad de: ${hoy.diff(
    cumple,
    "years"
  )} años`
);
console.log(`Desde mi nacmiento han pasado: ${hoy.diff(cumple, "days")} dias`);
