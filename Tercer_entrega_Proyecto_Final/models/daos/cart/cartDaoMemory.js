<<<<<<< HEAD
const Contenedor = require('../../container/container.js')
=======
const Container=require('../../../container/container');
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847
const path = require('path')

const dataPath= path.resolve(__dirname,"./carts.txt")
const contenedor = new Contenedor(dataPath)

class CartsApi{
    constructor(){
<<<<<<< HEAD
        this.carts = (contenedor.data).then((res)=> {this.carts = res})
    }
    static idCount = 0
=======
        this.carts=(container.data).then((res)=>{this.carts=res});
    }

    static idCount = 0;

    async newCart(){
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847

    async createCart(){
        const newCart = {
<<<<<<< HEAD
            id: ++CartsApi.idCount,
            timestamp : Date.now(),
            products:[],
        }
        contenedor.writeFile(newCart)

        return {NewCart: `Tu nuevo Carro es el ${newCart.id}`}
=======
            id:  ++Cart.idCount,
            timestamp: Date.now(),
            products: []
        };
        
         container.writeFile(newCart);
        return {NewCart: `Tu nuevo Carro es el ${newCart.id}`};
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847
    }
    async clearDelete(idCart){
        const carts = await this.carts
        
        const index = carts.findIndex(cart => cart.id ===+idCart)
        if (index < 0) return { error: `No se encontró el Carrito con el id: ${idCart}!`};
        const theCart = carts.find(cart => cart.id === +idCart)
        theCart.products = []
        
        carts.splice(index, 1)

<<<<<<< HEAD
        contenedor.writeAllFile(carts)

        return {success:`${theCart.id} fué eliminado.`}
    }
    showItems(idCart){
        const theCart = this.carts.find(cart => cart.id === +idCart)

        return {Productos: theCart.products}
    }
=======
    async clearDelete(idCart){
        const carts = await this.carts
        
        const index = carts.findIndex(cart => cart.id ===+idCart)
        if (index < 0) return { error: `No se encontró el Carrito con el id: ${idCart}!`};
        const theCart = carts.find(cart => cart.id === +idCart)
        theCart.products = []
        
        carts.splice(index, 1)

        container.writeAllFile(carts)

        return {success:`${theCart.id} fué eliminado.`}
    }
    showItems(idCart){
        const theCart = this.carts.find(cart => cart.id === +idCart)

        return {Productos: theCart.products}
    }
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847
    async saveItem(idCart, product){
        const carts = await this.carts
        const index = carts.findIndex(cart => cart.id === +idCart)
        carts[index].products.push(product)
<<<<<<< HEAD
        contenedor.writeAllFile(carts)
        return {message: `${product.name} a sido añadido al Cart`}
=======
        container.writeAllFile(carts)
        return {message: `${product.name} a sido añadido al Cart`}
    }
 
    async deleteItem(idCart, idProduct){
        const carts = await this.carts
        const theCart = carts.find(cart => cart.id === +idCart)
        const actualProducts = theCart.products
        const index = actualProducts.findIndex(product => product.id === +idProduct);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${idProduct}!`};
        const theProductName = actualProducts[index].name
        actualProducts.splice(index, 1)
        container.writeAllFile(carts)
        return {Success: `El producto: ${theProductName} fué eliminado de la lista`} 
>>>>>>> 8031afd8eff374b5f54386c1c8c5b71091384847
    }
    async deleteItem(idCart, idProduct){
        const carts = await this.carts
        const theCart = carts.find(cart => cart.id === +idCart)
        const actualProducts = theCart.products
        const index = actualProducts.findIndex(product => product.id === +idProduct);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${idProduct}!`};
        const theProductName = actualProducts[index].name
        actualProducts.splice(index, 1)
        contenedor.writeAllFile(carts)
        return {Success: `El producto: ${theProductName} fué eliminado de la lista`} 
    }
} 

module.exports = CartsApi