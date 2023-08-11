import React, { useEffect, useState } from "react";
import { CategoryService } from "../services/categoryService";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const response = await categoryService.addCategory(newCategory);
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const categoryService = new CategoryService();
      const response = await categoryService.updateCategory(
        id,
        updatedCategory
      );
      const updatedCategories = categories.map((category) =>
        category.id === id ? response.data : category
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const categoryService = new CategoryService();
      await categoryService.deleteCategory(id);
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryService = new CategoryService();
      const response = await categoryService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Category Card</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mb-3">Category Listele</button>
          <button className="btn btn-primary mb-3">Category Ekle</button>
          <ul className="list-group">
            {categories.map((category) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={category.id}
              >
                {category.categoryName}
                <div>
                  <button className="btn btn-danger me-2">Sil</button>
                  <button className="btn btn-warning">Güncelle</button>
                </div>
              </li>
            ))}

            {/* Add more category list items here */}
          </ul>
        </div>
      </div>
    </div>
  );
}
