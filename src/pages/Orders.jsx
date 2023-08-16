import React from "react";
import "../pages/CSS/Orders.css";
import { useState } from "react";
import { OrderService } from "../services/orderService";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null); // For tracking the order to delete
    const [showConfirmation, setShowConfirmation] = useState(false); // For showing the confirmation popup
    const history = useHistory();
    const UserId = localStorage.getItem("id");

    const getOrders = async () => {
        let orderService = new OrderService();
        await orderService
            .getOrders(UserId)
            .then((result) => setOrders(result.data));
    };

    const handleShowConfirmation = (orderId) => {
        setOrderIdToDelete(orderId);
        setShowConfirmation(true);
    };

    const handleDeleteOrder = async () => {
        if (orderIdToDelete !== null) {
            let orderService = new OrderService();
            await orderService.deleteOrder(orderIdToDelete);
            getOrders();
            setShowConfirmation(false); // Hide the confirmation after successful deletion
            alert("Sipariş başarıyla iptal edildi.");
        }
        setOrderIdToDelete(null);
    };

    const handleCancelDelete = () => {
        setOrderIdToDelete(null);
        setShowConfirmation(false);
    };

    const handleContinueShopping = () => {
        history.push('/');
    };

    useEffect(() => {
        getOrders();
    }, []);
  
    return (
      <div className="order-summary-card">
        <h1>Sipariş Özeti</h1>
        {orders.map((order, index) => (
          <div key={order.id}>
            <p>Sipariş Numarası: {index + 1}</p>
            <p>Oluşturma Tarihi: {new Date(order.createdDate).toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Adet</th>
                  <th>Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="delete-order-btn" onClick={() => handleShowConfirmation(order.id)}>Siparişi Sil</button>
            <div className="divider"></div>
          </div>
        ))}
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>Alışverişe Devam Et</button>
  
        {/* Delete Confirmation Popup */}
        {showConfirmation && (
          <div className="delete-confirmation">
            <p>Siparişi iptal etmek istediğinize emin misiniz?</p>
            <button className="delete-confirm-btn" onClick={handleDeleteOrder}>Evet</button>
            <button className="delete-cancel-btn" onClick={handleCancelDelete}>Hayır</button>
          </div>
        )}
      </div>
    );
  }
