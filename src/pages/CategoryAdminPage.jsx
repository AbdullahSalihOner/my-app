import React, { useEffect, useState } from "react";
import { CategoryService } from "../services/categoryService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const history = useHistory();

  const gotoAddPage = () => {
    history.push("/admin/category/add");
  };

  useEffect(() => {
    fetchCategories();
  }, []);


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
      setEditMode(false);
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

  const handleEdit = (category) => {
    setEditMode(true);
    setEditedCategory(category);
    setEditedCategoryName(category.categoryName);
  };

  const handleConfirm = (id) => {
    const updatedCategory = {
      ...editedCategory,
      categoryName: editedCategoryName
    };
    updateCategory(id, updatedCategory);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Category Card</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mb-3" onClick={gotoAddPage}>Category Ekle</button>
          <ul className="list-group">
            {categories.map((category) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={category.id}
              >
                {editMode && editedCategory?.id === category.id ? (
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                ) : (
                  category.categoryName
                )}
                
                <div>
                  <button className="btn btn-danger me-2" onClick={() => deleteCategory(category.id)}>Sil</button>
                  {editMode && editedCategory?.id === category.id ? (
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => handleConfirm(category.id)}
                      >
                        Onayla
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditMode(false)}
                      >
                        İptal
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
