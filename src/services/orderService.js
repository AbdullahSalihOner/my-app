import axios from "axios";

export class OrderService {
    getOrders(token) {
        return axios.get("http://localhost:8080/order/"+token)
    }//Çağırdığım yerde localdeki tokenı gönderiyorum
    
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