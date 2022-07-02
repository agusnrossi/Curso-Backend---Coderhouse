const path = require('path')

const dataPath= path.resolve(__dirname,"./products.txt")
const Container= require('../../../container/container');
const container=new Container(dataPath);

class Product{

    constructor(){
        this.products=(container.data).then(res=>{
            this.products=res
        });
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product= this.products.find(product=>product.id===id);
        return product;
    }

    async updateById(newInfo, id){
        const newList = [...this.products]
        const index = this.products.findIndex(product => product.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!`};
        newList[index] = { 
            id: +id,
            code: +id,
            timestamp: Date.now(),
            ...newInfo
        }; 
        await contenedor.writeAllFile(newList)
        this.products = (contenedor.data).then((res)=> {this.products = res})
        return newList[index]
    };
  
    saveProduct(product){
        let idCount = [...this.products].length
        const { name, desc, image, price} = product;
        if (!name || !desc || !image || !price ) return { error: 'Todos los campos son obligatorios!' };
        const newProduct = { 
            id: idCount +1,
            code: idCount+1,
            timestamp: Date.now(),
            ...product
        };
        contenedor.writeFile(newProduct)
        return newProduct;
    };
    
    async deleteProduct(id){
        const newList = [...this.products]
        const index = this.products.findIndex(product => product.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!`};
        newList.splice(index, 1);
        await contenedor.writeAllFile(newList)
        this.products = (contenedor.data).then((res)=> {this.products = res})
        return newList
    
    }

  

}
module.exports=Product;