import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../pages/CSS/CreditCardApprove.css"; // Stil dosyasını ekledik
import { OrderService } from "../services/orderService";

function CreditCardApprove() {
    const [password, setPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [error, setError] = useState("");
    const correctPassword = "12345";
  
    const UserId = localStorage.getItem("id"); // LocalStorage'dan UserId'yi al
  
    const history = useHistory();
  
    const createOrder = async () => {
      let orderService = new OrderService();
      await orderService.addOrder(UserId).then((result) => {
        console.log(result.data.data);
        setIsPasswordCorrect(true); // Sipariş oluşturulduğunda şifreyi doğru kabul ediyoruz
      });
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmation = () => {
      setError(""); // Her denemede hata mesajını temizle
  
      if (password === correctPassword) {
        createOrder(); // Şifre doğruysa sipariş oluştur
      } else {
        setError("Şifre hatalı. Lütfen tekrar deneyin.");
      }
    };
  
    const handleRedirect = () => {
      history.push("/order"); // Sipariş oluşturulduğunda /order sayfasına yönlendir
    };
  
    return (
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">Şifre Onayı</h2>
          <div className="card-content">
            {isPasswordCorrect ? (
              <div>
                <p>Şifre doğru. Ödemeniz gerçekleşti</p>
                <button onClick={handleRedirect}>Devam Et</button>
              </div>
            ) : (
              <div>
                <label>
                  Şifreyi Girin:
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
                <button onClick={handleConfirmation}>Onayla</button>
                {error && <p className="error-message">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default CreditCardApprove;
