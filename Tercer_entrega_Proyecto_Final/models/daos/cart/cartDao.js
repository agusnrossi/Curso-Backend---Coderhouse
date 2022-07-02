const Container=require('../../container/container');
const path = require('path')

const dataPath= path.resolve(__dirname,"./carts.txt")
const container=new Container(dataPath);

class Cart{ 
    constructor(){
        this.carts=(container.data).then(res=>{
            this.carts=res
        });
    }
    async newCart(){

        const newCart = {
            id: this.carts.length + 1,
            timestamp: Date.now(),
            products: []
        };
        this.carts.push(newCart);
        await container.writeAllFile(this.carts);
        return newCart;
    }

    async addToCart(product){
        const newList = [...this.carts]
        const index = this.carts.findIndex(cart => cart.id === +product.cartId);
        if (index < 0) return { error: `No se encontró un producto con el id: ${product.cartId}!`};
        newList[index].products.push(product);
        await container.writeAllFile(newList)
        this.carts = (container.data).then((res)=> {this.carts = res})
        return newList[index]
    }

    async removeFromCart(idCart){
        const newList = [...this.carts]
        const index = this.carts.findIndex(cart => cart.id === +idCart);
        if (index < 0) return { error: `No se encontró un producto con el id: ${idCart}!`};
        newList.splice(index, 1);
        await container.writeAllFile(newList)
        this.carts = (container.data).then((res)=> {this.carts = res})
        return newList

    }
    async getCart(){
        const theCart = this.carts.find(cart => cart.id === +cart)
            return {Productos: theCart.products}      
    }
}
   

module.exports=Cart;