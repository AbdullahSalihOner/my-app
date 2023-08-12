import axios from "axios";

export class  CartService {
    getCart(id) {
        return axios.get("http://localhost:8080/cart/?UserId="+id);
    }

    addToCart(id,CartDto) {
        return axios.post("http://localhost:8080/cart/add?UserId="+id,
        {
            productId: CartDto.id,
            quantity:1,
        });
    }
    deleteFromCart(cartItemId,id) {
        return axios.delete("http://localhost:8080/cart/delete/" + cartItemId + "?UserId=" + id);
    }


    updateCart(cartItemId,id,CartDto) {
        return axios.put("http://localhost:8080/cart/update/" +cartItemId + "?UserId=" +id,
        {
            id:0,
            productId: CartDto.id,
            quantity:CartDto.quantity,
        });
    }
    
}

export default CartService;