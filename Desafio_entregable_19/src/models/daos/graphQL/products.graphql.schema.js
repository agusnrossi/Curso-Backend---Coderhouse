const productSchema = `
    type Product {
        id: ID!,
        code: String,
        name: String,
        desc: String,
        image: String,
        price: Int,
        stock: Int,
        timestamp: String
    }

    input newInfoProduct {
        name: String,
        desc: String,
        image: String,
        price: Int,
        stock: Int
    }


    type: Query {
        getAllProducts: [Product],
        getProductById(id: ID!): Product,
    }

    type: Mutation {
        saveNewProduct(info: newInfoProduct): Product,
        updateProduct(id: ID!, info: newInfoProduct): Product,
        deleteProduct(id: ID!): Product,
    }
`;

module.exports = productSchema;
