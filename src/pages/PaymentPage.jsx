import React, { useEffect, useState } from "react";
import "../pages/CSS/PaymentPage.css"; // Stil dosyası gerektiği gibi ayarlanmalı
import CartService from "../services/cartService";

export default function PaymentPage() {
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cartTotal, setCartTotal] = useState(''); // [1
  const [error, setError] = useState("");
  const [cvv, setCvv] = useState('');
  const UserId = localStorage.getItem("id");

  const getCartTotal = async() => {
    let total = 0;
    let cartService = new CartService();
    await cartService
    .getCart(UserId)
    .then((result) => setCartTotal(result.data.totalCost));

  };
 

  const handlePayment = () => {
    setError(""); // Her ödeme denemesinde hataları temizle

    if (!/^[0-9]{16}$/.test(cardNumber)) {
      setError("Kart numarası 16 haneli bir sayı olmalıdır.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardHolder)) {
      setError("Kart sahibi isim ve soyisimden oluşmalıdır.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setError("Geçerli bir son kullanma tarihi giriniz (MM/YY formatında).");
      return;
    }

    if (!/^[0-9]{3}$/.test(cvv)) {
      setError("CVV kodu üç haneli bir sayı olmalıdır.");
      return;
    }

    // Ödeme işlemleri burada gerçekleştirilebilir
    console.log("Ödeme yapıldı:", {
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
    });
  };

  useEffect(() => {
    getCartTotal();
    }, []);
  return (
    <div className="payment-container">
      <h2>Ödeme Bilgileri</h2>
      <div className="card-form">
        <div className="form-group">
          <label>Kart Numarası</label>
          <input
            type="text"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Kart Numarasını Girin"
          />
        </div>
        <div className="form-group">
          <label>Kart Sahibi</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Kart Sahibinin Adını Girin"
          />
        </div>
        <div className="form-group">
          <label>Son Kullanma Tarihi</label>
          <input
            type="text"
            maxLength="5"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV Kodunu Girin"
          />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="payment-button" onClick={handlePayment}>
        Ödeme Yap
      </button>
    </div>
  );
}
