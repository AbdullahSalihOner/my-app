import React, { useState } from "react";

import { Button, Card, Checkbox, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserService } from "../services/userService";


export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajını saklamak için state
  const history = useHistory();

  const user = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:password
  }
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      setErrorMessage("Lütfen kullanım koşullarını kabul ediniz.");
      alert("Lütfen kullanım koşullarını kabul ediniz.");
      return; // işlemi durdur
    }

    try {

      
      let userService = new UserService();
      const result = await userService.signUp(user); 
      
      console.log(result); 
      
      
      if (result.data.status === "success") {
        
        history.push('/login'); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Card style={{ width: '300px' }}>
      <Card.Content>
        <Card.Header style={{ textAlign: 'center', marginBottom: '1rem' }}>Kayıt Ol</Card.Header>
        <Form onSubmit={handleSignUp}>
          <Form.Field>
            <label>Firstname</label>
            <input
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Lastname</label>
            <input
              placeholder="Lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Şifre</label>
            <input
              type="password"
              placeholder="Şifre"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            
          </Form.Field>
          <Form.Field>
            <Checkbox 
            label="I agree to the Terms and Conditions" 
            checked={isChecked}
               onChange={() => setIsChecked(!isChecked)}
            />
          </Form.Field>
          <Button type="submit" color="blue" fluid>
            Kayıt Ol
          </Button>
        </Form>
        <Button href="/login" color="green" fluid>
          Zaten üye misiniz? Giriş yapın.
        </Button>
      </Card.Content>
    </Card>
  </div>
    

  );
}

