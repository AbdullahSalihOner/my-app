import React, { useState} from "react";
import { Button, Card, Checkbox, Form, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserService } from "../services/userService";
// import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajını saklamak için state
  const [users, setUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();

   

    try {
      let userService = new UserService();
      const result = await userService.signIn({ email, password }); // Kısa yol

      if (result.data.userId > 0) {
        localStorage.setItem("id", result.data.userId);
        history.push('/'); // Ana sayfaya yönlendir
        window.location.reload();
      }
      

      throw new Error("Bilgiler yanlış");
        
        
      
    } catch (error) {
      console.log(error);
      setErrorMessage("Bilgiler yanlış");
    }
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '300px' }}>
        <Card.Content>
          <Card.Header style={{ textAlign: 'center', marginBottom: '1rem' }}>Giriş Yap</Card.Header>
          <Form onSubmit={handleSignIn}>
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
            <Button type="submit" color="blue" fluid>
              Giriş Yap
            </Button>
          </Form>
          {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
          <Button href="/signup" color="green" fluid>
            Kayıt olmak İçin Tıklayın
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}