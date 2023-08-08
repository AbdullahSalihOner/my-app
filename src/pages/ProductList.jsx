import React, { useEffect, useState } from "react";
import { Button, Icon, Image, Menu, Table } from "semantic-ui-react";
import { ProductService } from "../services/productService";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    let productService = new ProductService()
    productService.getProducts().then(result=>setProducts(result.data))
  },[])

  return (
    <div>
      <Table celled>
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
      </Table>
    </div>
  );
}