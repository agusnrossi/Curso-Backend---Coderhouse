const Container=require('../../../container/container');
const path = require('path')

const dataPath= path.resolve(__dirname,"./carts.txt")
const container=new Container(dataPath);

class Cart{ 
    constructor(){
        this.carts=(container.data).then(res=>{
            this.carts=res
        });
    }

    static idCount = 0;

    async newCart(){

        const newCart = {
            id: ++Cart.idCount,
            timestamp: Date.now(),
            products: []
        };
        container.writeFile(newCart)
        return {NewCart: `Tu nuevo Carro es el ${newCart.id}`}
    }
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
    async saveItem(idCart, product){
        const carts = await this.carts
        const index = carts.findIndex(cart => cart.id === +idCart)
        carts[index].products.push(product)
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
    }
}
   

module.exports=Cart;