const moment = require("moment");

let hoy = moment("2022-02-22");
let cumple = moment("1987-12-02");

console.log(`Hoy es ${hoy.format("DD/MMM/YYYY")}`);
console.log(`Cumpleaños es ${cumple.format("DD/MMM/YYYY")}`);

console.log(`Faltan ${hoy.diff(cumple, "days")} dias para tu cumpleaños`);

console.log(
  `desde mi nacimiento han pasado:${cumple.diff(moment(), "years")} años`
);
console.log(
  `desde mi nacmiento han pasado:${cumple.diff(moment(), "days")} dias`
);
