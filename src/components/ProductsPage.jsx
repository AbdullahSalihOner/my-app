import React from 'react';
import axios from 'axios';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/product/')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        {this.state.products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.imageURL} alt={product.name} />
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductPage;