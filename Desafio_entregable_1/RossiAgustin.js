/*----------DECLARACION DE CLASE--------------*/

class Usuario {
  constructor(nombre, apellido, mascotas = [], libros = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = mascotas;
    this.libros = libros;
  }

  getFullName() {
    console.log(`Usuario: ${this.nombre} ${this.apellido}`);
  }

  addMascota(pet) {
    return this.mascotas.push(pet);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(libro, autor) {
    return this.libros.push({ libro: libro, autor: autor });
  }

  getBookName() {
    const nombreLibro = this.libros.map((libros) => libros.libro);
    return nombreLibro;
  }
}

/*-----------------------------------------------*/

let mascotas = ["perro", " gato"];
let libros = [
  {
    libro: "el señor de los anillos",
    autor: "Tolkien",
  },
  {
    libro: " el hobbit",
    autor: "j.r. tolkien",
  },
];
let usuario = new Usuario("agustin", "rossi", mascotas, libros);

/*-----------------------------------------------*/

usuario.getFullName();
usuario.addMascota("conejo");
usuario.countMascotas(console.log("mascotas: " + usuario.countMascotas()));
usuario.addBook("El simaleon", "J.R. Tolkein");
console.log(usuario.getBookName());
