import React, { useState } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { UserService } from '../services/userService';

export default function SignedIn(props) {
    const [users, setUsers] = useState([]);

    const UserId = localStorage.getItem("id");

    const fetchUsers = async () => {
        try {
          const userService = new UserService();
          const response = await userService.getUserById(UserId);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
          console.log("Kullanıcı Bulunamadı");
        }
      };

  return (
    <div>
            <Menu.Item>
                <Image avatar spaced="right" src="" style={{ maxWidth: '150px', height: 'auto' }}/>
                <Dropdown pointing="top left" text="User">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/about" text="Bilgilerim" icon="info"/>
                        <Dropdown.Item as={NavLink} to="/wishlist" text="İstek Listem" icon="info"/>
                        <Dropdown.Item onClick={props.signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
  )
}
