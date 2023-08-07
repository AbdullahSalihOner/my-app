import axios from "axios";
import React from "react";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Users: [],
        };
    }

    componentDidMount() {   
        axios.get('http://localhost:8080/user/')
        .then(response => {
            this.setState({ Users: response.data });
            })
        .catch(error => {
            console.error('Error fetching data: ', error);
            });
    }

    render() {
        return (
          <div>
            <h1>Products</h1>
            {this.state.users.map(user => (
              <div key={user.id}>
                <h2>{user.firstName +" "+ user.lastName}</h2>
                <p>{user.email}</p>
                <p>{user.password}</p>
                <p>{user.address}</p>
                <p>{user.phone}</p>
                <p>{user.role}</p>
              </div>
            ))}
          </div>
        );
      }
    }