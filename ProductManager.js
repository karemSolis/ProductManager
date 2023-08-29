
import {promises as fs} from "fs"

class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = [];
    }
    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++

            let newProduct = {
                title,
                description,
                price,
                imagen,
                code, 
                stock,
                id: ProductManager.id
            };
            
            this.products.push(newProduct)

            await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)

    }

    getProducts = async() => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){ 
        console.log("No hay de ese producto")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        } 
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)

        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado");


        
    };

    updateProduct = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productAntiguo = await this.readProducts();
        let productModificado = [{ ...producto, id},...productAntiguo];
        await fs.writeFile(this.patch, JSON.stringify(productModificado));

    };
}

const productos = new ProductManager();





//PRODUCTOS AGREGADOS AL PACKAGE.JSON

// productos.addProduct("Título1", "Descripción1", 1000, "Imagen1", "A123456", 12);
// productos.addProduct("Título2", "Descripción2", 2000, "Imagen2", "A123457", 6);
// productos.addProduct("Título3", "Descripción3", 3000, "Imagen3", "A123458", 24);
// productos.addProduct("Título4", "Descripción4", 4000, "Imagen4", "A123459", 12);
// productos.addProduct("Título5", "Descripción5", 5000, "Imagen5", "A123460", 6);

//LLAMADOS 

//productos.getProducts();

//productos.getProductsById(3);

//productos.deleteProductsById(2);

productos.updateProduct({
    title: 'Título3',
    description: 'Descripción3',
    price: 7500,
    imagen: 'Imagen3',
    code: 'A123458',
    stock: 24,
    id: 3
})