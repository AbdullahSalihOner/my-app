import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { CategoryService } from '../services/categoryService';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

export default function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    let categoryService = new CategoryService()
    categoryService.getCategories().then(result=>setCategories(result.data))
  },[])
  return (
    <div>
      <Dropdown item text="Kategoriler">
              <Dropdown.Menu>
              {categories.map((category)=>( 
                <Dropdown.Item>{category.categoryName}</Dropdown.Item>
                ))}
                <Dropdown.Divider />
              </Dropdown.Menu>
          </Dropdown>
    </div>
  )
}
