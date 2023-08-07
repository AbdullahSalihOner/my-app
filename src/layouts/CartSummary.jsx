import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'

export default function CartSummary() {
  return (
    <div>
        <Dropdown item text="Sepet">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
                <Dropdown.Item>
                  <Button>Sepete Git</Button>
                </Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
    </div>
  )
}
