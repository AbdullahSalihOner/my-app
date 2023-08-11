import axios from "axios";

export class ProductService {
    getProducts() {
        return axios.get("http://localhost:8080/product/");
    }
    
    getProductById(id) {
        return axios.get("http://localhost:8080/product/getById/"+id);
    }
    
    addProduct(product) {
        return axios.post("http://localhost:8080/product/add/",+ product);
    }
    deleteProduct(id) {
        return axios.delete("http://localhost:8080/product/delete/"+id);
    }
    updateProduct(id,productDto) {
        return axios.put("http://localhost:8080/product/update/",+id,{
            categoryId:productDto.categoryId,
            description:productDto.description,
            id:0,
            imageURL:productDto.imageURL,
            name:productDto.name,
            price:productDto.price
        });
    }

}