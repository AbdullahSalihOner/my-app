import { useState } from "react";
import WishListDeatil from "./WishListDeatil";

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
  
    const handleRemoveItem = (itemId) => {
      const updatedItems = wishlistItems.filter(item => item.id !== itemId);
      setWishlistItems(updatedItems);
    };
  
    const handleAddToCart = (item) => {
      setCartItems(prevCartItems => [...prevCartItems, item]);
      handleRemoveItem(item.id);
    };
  
    return (
      <div className="container">
        <h2>İstek Listesi</h2>
        {wishlistItems.length === 0 ? (
          <p>İstek listeniz boş.</p>
        ) : (
          wishlistItems.map(item => (
            <WishListDeatil
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>
    );
  }
  
  export default Wishlist;