import React, { useEffect, useState } from 'react'
import { ProductService } from '../services/productService';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ProductAdmin() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const history = useHistory();

  
    const gotoAddPage = () => {
      history.push('/admin/product/add');
    };
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const productService = new ProductService();
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    const addProduct = async (newProduct) => {
      try {
        const productService = new ProductService();
        const response = await productService.addProduct(newProduct);
        setProducts([...products, response.data]);
        setNewProduct('');
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };
  
    const updateProduct = async (id, updatedProduct) => {
      try {
        const productService = new ProductService();
        const response = await productService.updateProduct(id, updatedProduct);
        const updatedProducts = products.map(product =>
          product.id === id ? response.data : product
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };
  
    const deleteProduct = async (id) => {
      try {
        const productService = new ProductService();
        await productService.deleteProduct(id);
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    return (
        <div>
          
    
          <div>
            <div className="card">
              <div className="card-header">
                <h2>Product Card</h2>
              </div>
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={()=>gotoAddPage()}>Ürün Ekle</button>
                
                <ul className="list-group">
                {products.map((product) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={product.id}>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Category Id</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
    
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell><img
                    src={product.imageURL}
                    className="card-img-top"
                    alt={product.name}
                  /></Table.Cell>
                        <Table.Cell>{product.id}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>{product.description}</Table.Cell>
                        <Table.Cell>{product.categoryId}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <div>
                    <button className="btn btn-danger me-2" onClick={() => deleteProduct(product.id)} >Sil</button>
                    {/* <button className="btn btn-warning" >Güncelle</button> */}
                  </div>
                </li>
    
                  ))}
                  
    
                  {/* Add more product list items here */}
                </ul>
              </div>
            </div>
          </div>
    
          
        </div>
      );
    
}
