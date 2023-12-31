import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { UserService } from '../services/userService';

export default function SignedIn(props) {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState(""); // Kullanıcının adını saklamak için state
  const history = useHistory();

  const UserId = localStorage.getItem("id");

  const fetchUsers = async () => {
    try {
      const userService = new UserService();
      const response = await userService.getUserById(UserId);
      setUsers(response.data);

      // Kullanıcının adını ayarla
      setUserName(response.data.firstName); // Varsayılan olarak "name" alanını kullanıyoruz, uygun şekilde değiştirin

    } catch (error) {
      console.error("Error fetching users:", error);
      console.log("Kullanıcı Bulunamadı");
    }
  };

  const signOut = () => {
    localStorage.removeItem("id");
    history.push(`/`);
    window.location.reload();
  };

  const redirectToLogin = () => {
    history.push(`/login`);
  };

  useEffect(() => {
    fetchUsers();
  }, [UserId]);

  return (
    <div>
      
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src=""
          style={{ maxWidth: '150px', height: 'auto' }}
        />
        <Dropdown pointing="top left" text={userName || "User"}>
          {/* Kullanıcı adını ya da "User" yazısını görüntüle */}
          <Dropdown.Menu>
            <Dropdown.Item
              as={NavLink}
              to="/about"
              text="Bilgilerim"
              icon="info"
            />
            <Dropdown.Item
              as={NavLink}
              to="/order"
              text="Orders"
              icon="box"
            />
            <Dropdown.Item
              onClick={() => signOut()}
              text="Çıkış Yap"
              icon="sign-out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
