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

    getAll(){
        return this.products;
    }

    getById(id){
        const product = this.products.find(prod => prod.id === +id);
        return product || { error: `el producto ${id} no fué encontrado!` };
    };

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
        await container.writeAllFile(newList)
        this.products = (container.data).then((res)=> {this.products = res})
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
        container.writeFile(newProduct)
        return newProduct;
    };
    
    deleteById(id){
        const index = this.products.findIndex(product => product.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!`};
        const newList = this.products.splice(index, 1)
        container.writeAllFile(newList)
        return newList
    };

  

}
module.exports=Product;