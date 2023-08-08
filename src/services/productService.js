import axios from "axios";

export class ProductService {
    getProducts() {
        return axios.get("http://localhost:8080/product/");
    }
    
    getProductById(id) {
        return axios.get("http://localhost:8080/product/getById/"+id);
    }
    
}