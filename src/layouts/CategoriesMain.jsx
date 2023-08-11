import React, { useEffect, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { CategoryService } from '../services/categoryService';

export default function CategoriesMain() {
    const [categories, setCategories] = useState([]);

  useEffect(()=>{
    let categoryService = new CategoryService()
    categoryService.getCategories().then(result=>setCategories(result.data))
  },[])
    
  return (
    <div>
      <Menu pointing vertical>
        {categories.map((category)=>(
              <Menu.Item>{category.categoryName}</Menu.Item> 
                
          
        ))}
        
      </Menu>
    </div>
  )
}
