import axios from "axios";

export class CategoryService {
    getCategories() {
        return axios.get("http://localhost:8080/category/");
    }
    
    addCategory(category) {
        return axios.post("http://localhost:8080/category/create",+ category);
    }
    deleteCategory(id) {
        return axios.delete("http://localhost:8080/category/delete/"+id);
    }
    updateCategory(id) {
        return axios.put("http://localhost:8080/category/update/",+ id);
    }
    
}