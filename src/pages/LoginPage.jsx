import React, { useState, useEffect } from "react";
import { Button, Card, Checkbox, Form, Image } from "semantic-ui-react";
import { UserService } from "../services/userService";
import { NavLink } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const user1 = {
    email: email,
    password: password,
  };
  // const navigate = useNavigate()
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      let userService = new UserService();
      userService.signIn(user1).then((result) => {
        console.log(result);
        if (result.data.status === "success") {
          localStorage.setItem("token", result.data.token);
        }
        if (result.data.status === "success") {
        
          history.push('/'); 
        }
        else{
          alert("Kullanıcı adı veya şifre yanlış");
          
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   loginSubmit()
  // },[])
  return (
   





    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '300px' }}>
        <Image src="https://www.computerhope.com/jargon/g/guest-user.png" wrapped ui={false} style={{ maxWidth: '100%', height: 'auto' }} />
        <Card.Content>
          <Card.Header style={{ textAlign: 'center', marginBottom: '1rem' }}>Giriş Yap</Card.Header>
          <Form onSubmit={loginSubmit}>
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
              <Checkbox label="Kullanım Koşullarını kabul ediyorum" />
            </Form.Field>
            <Button type="submit" color="blue" href="/" fluid>
              Giriş Yap
            </Button>
          </Form>
          <Button href="/signup" color="green" fluid>
            Kayıt olmak İçin Tıklayın
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}
