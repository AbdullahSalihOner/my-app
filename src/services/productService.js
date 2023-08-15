import axios from "axios";

export class ProductService {
    getProducts() {
        return axios.get("http://localhost:8080/product/");
    }
    
    getProductById(id) {
        return axios.get("http://localhost:8080/product/getById/"+id);
    }
    
    addProduct(product) {
        return axios.post("http://localhost:8080/product/add/",{
            categoryId:product.categoryId,
            description:product.description,
            imageURL:product.imageURL,
            name:product.name,
            price:product.price,
            id:0
        });
    }
    deleteProduct(productId) {
        return axios.delete("http://localhost:8080/product/delete/"+productId);
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
    getProductByCategoryId(categoryId)  {
        return axios.get("http://localhost:8080/product/category/"+categoryId);
    } 

}