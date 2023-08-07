import axios from "axios";
import React from "react";

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {   
        axios.get('http://localhost:8080/category/')
        .then(response => {
          this.setState({ categories: response.data });
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }

    render() {
        return (
          <div>
            <h1>Products</h1>
            {this.state.categories.map(category => (
              <div key={category.id}>
                <h2>{category.categoryName}</h2>
                <p>{category.description}</p>
                <img src={category.imageUrl} alt={category.categoryName} />
                <p>{category.price}</p>
              </div>
            ))}
          </div>
        );
      }
}

export default Categories;