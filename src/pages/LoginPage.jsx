import React, { useState, useEffect } from "react";
import { Button, Card, Checkbox, Form } from "semantic-ui-react";
import { UserService } from "../services/userService";
// import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
        if (result.data.status === 'success') {
            localStorage.setItem('token', result.data.token)
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
    <div>
      <Form onSubmit={loginSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="First Name"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Şifre</label>
          <input
            placeholder="Last Name"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Giriş Yap</Button>
        <Button type="submit" href="/signup">Kayıt olamk İçin Tıklayın</Button>
      </Form>
    </div>

  
  );
}
