import axios from "axios";

export class  CartService {
    getCart(token) {
        return axios.get("http://localhost:8080/cart/?token="+token);
    }//Çağırdığım yerde localdeki tokenı gönderiyorum
    addToCart(token,CartDto) {
        return axios.post("http://localhost:8080/cart/add" + "?token="+token,
        {
            CartDto: CartDto,
        });
    }
    deleteFromCart(id,token) {
        return axios.delete("http://localhost:8080/cart/delete/" + id + "?token=" + token);
    }


    updateCart(id,token,CartDto) {
        return axios.put("http://localhost:8080/cart/update/" + id + "?token=" + token,
        {
            CartDto: CartDto,
        });
    }
    
}

export default CartService;