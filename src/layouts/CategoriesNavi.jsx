import React, { useEffect, useState } from 'react'
import { Dropdown} from 'semantic-ui-react'
import { CategoryService } from '../services/categoryService';
import ProductList from '../pages/ProductList';


export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(()=>{
    let categoryService = new CategoryService()
    categoryService.getCategories().then(result=>setCategories(result.data))
  },[])
  return (
    <div>
      <Dropdown item text="Kategoriler">
              <Dropdown.Menu>
              {categories.map((category)=>( 
                <Dropdown.Item onClick={() => handleCategorySelect(category)}>{category.categoryName}</Dropdown.Item>
                ))}
                <Dropdown.Divider />
              </Dropdown.Menu>
          </Dropdown>

          
    </div>
  )
}
