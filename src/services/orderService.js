import axios from "axios";

export class OrderService {
    getOrders(userId) {
        return axios.get("http://localhost:8080/order/user/"+userId)
    }
    addOrder(userId) {
        return axios.post("http://localhost:8080/order/createFromCart?userId="+userId);
    }
    deleteOrder (orderId) {
        return axios.delete(`http://localhost:8080/order/`+orderId);
      }
    
    
}