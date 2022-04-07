const colorAleatorioR= ()=>{
    return Math.floor(Math.random() * 256);
}

const colorAleatorioG= ()=> Math.floor(Math.random() * 256)

const colorAleatorioB= ()=> {
    return Math.floor(Math.random() * 256);
}

let colorAleatorioRGB = () => {
    console.log(`RGB(${colorAleatorioR()}, ${colorAleatorioG()}, ${colorAleatorioB()})`);
}
colorAleatorioRGB();