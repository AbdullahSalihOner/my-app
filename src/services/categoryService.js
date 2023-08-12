import axios from "axios";

export class CategoryService {
    getCategories() {
        return axios.get("http://localhost:8080/category/");
    }
    
    addCategory(category) {
        return axios.post("http://localhost:8080/category/create",{
            categoryName: category.categoryName,
            description: category.description,
            imageUrl: category.imageUrl,
        });
    }
    deleteCategory(categoryId) {
        return axios.delete("http://localhost:8080/category/delete/"+categoryId);
    }
    updateCategory(categoryId) {
        return axios.put("http://localhost:8080/category/update/",+ categoryId);
    }
    
}