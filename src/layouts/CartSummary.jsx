import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { Button, Dropdown } from 'semantic-ui-react'

export default function CartSummary() {
  return (
    <div>
        <Dropdown item text="Sepet">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Button as={NavLink} to="/cart">Sepete Git</Button>
                </Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
    </div>
  )
}
