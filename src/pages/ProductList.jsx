import React, { useEffect, useState } from "react";
import { Button, Icon, Image, Menu, Table } from "semantic-ui-react";
import { ProductService } from "../services/productService";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Card } from "react-bootstrap";
import CartService from "../services/cartService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  
  const addToCart = async (product) => {
    // Check if the product is already in the cart
    const existingProduct = products.find((p) => p.id === product.id);
  
    if (existingProduct) {
      // If the product already exists, update its quantity
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      let cartService = new CartService();
      await cartService.updateCart(product.id, token); // Update the cart on the backend
      setProducts(updatedProducts);
    } else {
      // If the product doesn't exist, add it to the cart
      const newProduct = { ...product, quantity: 1 };
      let cartService = new CartService();
      await cartService.addToCart(newProduct, token); // Add the product to the cart on the backend
      setProducts([...products, newProduct]);
    }
  };
  

  useEffect(() => {
    let productService = new ProductService();
    productService.getProducts().then((result) => setProducts(result.data));
  }, []);

  return (
    <div>
      {/* <Table celled>
        <Table.Header>   
          <Table.Row>
          <Table.HeaderCell>Ürün Resmi</Table.HeaderCell>
            <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
            <Table.HeaderCell>Birim Fiyatı</Table.HeaderCell>
            <Table.HeaderCell>Açıklama</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products?.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell><Link to={`/products/${product.id}`}><img src={`${product.imageURL}`} style={{ maxWidth: '150px', height: 'auto' }}  alt="Gorsel" /></Link></Table.Cell>
              <Table.Cell><Link to={`/products/${product.id}`}>{product.name}</Link></Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell><Button>Sepete Ekle</Button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table> */}

      {/* <Card style={{ width: "18rem" }}>
          <Link to={`/products/${product.id}`}>
            <Card.Img variant="top" src={`${product.imageURL}`} />
          </Link>
          <Card.Body>
            <Link to={`/products/${product.id}`}>
              <Card.Title>{product.name}</Card.Title>
            </Link>
            <Card.Text>{product.price} $</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <Button variant="primary">Sepete Ekle</Button>
          </Card.Body>
        </Card> */}

      {products?.map((product) => (
        <div className="col-md-4 mb-4">
        <div className="card h-100">
          <img src={product.imageURL} className="card-img-top" alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">${product.price}</p>
            <p className="card-text">{product.description}</p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <button className="btn btn-danger" onClick={() => addToCart(product)}>Sepete Ekle</button>
            <button className="btn btn-warning">İstek Listesine Ekle</button>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}
