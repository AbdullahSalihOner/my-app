import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CategoryService } from "../services/categoryService";

export default function CategoryAddAdmin() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let categoryService = new CategoryService();
      const result = await categoryService.addCategory({
        categoryName,
        description,
        imageUrl,
      }); // Kısa yol
      console.log(result);
      window.location.reload();
      alert("Kategori Eklendi");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Kategori Ekle
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="categoryName"
              style={{ marginBottom: "5px", display: "block" }}
            >
              Category Name
            </label>
            <input
              type="categoryName"
              className="form-control"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              style={{ marginBottom: "5px", display: "block" }}
            >
              Description
            </label>
            <input
              type="description"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="imageUrl"
              style={{ marginBottom: "5px", display: "block" }}
            >
              Image
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
              }}
              required
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
