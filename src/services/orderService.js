import axios from "axios";

export class OrderService {
    getOrders(userId) {
        return axios.get("http://localhost:8080/order/?UserId"+userId)
    }
    addOrder(userId) {
        return axios.post("http://localhost:8080/order/createFromCart?userId="+userId);
    }
    deleteOrder(id) {
        return axios.delete("http://localhost:8080/order/delete/"+id);
    }
    
    
}