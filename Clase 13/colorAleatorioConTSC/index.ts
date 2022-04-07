function  colorAleatorio(string: string) {
    var x:number = Math.floor(Math.random() * 256);
}

console.log(`RGB(${colorAleatorio()}, ${colorAleatorio()}, ${colorAleatorio()})`);