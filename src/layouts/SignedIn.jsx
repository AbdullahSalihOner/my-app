import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'

export default function SignedIn(props) {
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
