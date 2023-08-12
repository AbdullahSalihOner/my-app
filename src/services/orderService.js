import axios from "axios";

export class OrderService {
    getOrders(userId) {
        return axios.get("http://localhost:8080/order/?UserId"+userId)
    }
    addOrder(orderDto) {
        return axios.post("http://localhost:8080/order/add",
        {
            orderDto: orderDto,
            token: localStorage.getItem("token")
        
        });
    }
    deleteOrder(id) {
        return axios.delete("http://localhost:8080/order/delete/"+id);
    }
    
    
}