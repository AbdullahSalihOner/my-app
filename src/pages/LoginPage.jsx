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
  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      let userService = new UserService();
      const result = await userService.signIn({ email, password }); // Kısa yol

      localStorage.setItem("id", result.data.userId);

      if (result.data.status === "success") {
        fetchUsers(); // Kullanıcı bilgilerini çek
        history.push('/'); // Ana sayfaya yönlendir
        window.location.reload();
      } else {
        setErrorMessage("Bilgiler yanlış"); // Hata mesajını ayarla
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userService = new UserService();
      const response = await userService.getUsers();
      setUsers(response.data);
      console.log(response.data);

      // Kullanıcının rolünü kontrol et
      const loggedInUser = users.find(user => user.email === email);
      if (loggedInUser && loggedInUser.role === "admin") {
        history.push('/admin'); // Eğer admin ise /admin sayfasına yönlendir
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '300px' }}>
        <Image src="https://www.computerhope.com/jargon/g/guest-user.png" wrapped ui={false} style={{ maxWidth: '100%', height: 'auto' }} />
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
              <Checkbox label="Kullanım Koşullarını kabul ediyorum" />
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