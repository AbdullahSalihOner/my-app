import React from 'react'
import { useState } from 'react';

export default function Payment() {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
  
    const handlePayment = (e) => {
      e.preventDefault();
      // Ödeme işlemi burada gerçekleştirilebilir
      // Örneğin, bir ödeme ağ geçidine veri gönderme gibi
      console.log('Ödeme işlemi gerçekleştirildi.');
    };
  
    return (        
        <div className="container">
        <div className="credit-card">
          <div className="credit-card-form">
            <h2>Fake Hesap Özeti</h2>
            <div>
              <p>Hesap Özeti: Toplam $100</p>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Adres Seçimi</label>
              <select
                className="form-control"
                id="address"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                required
              >
                <option value="">Adres Seçin</option>
                <option value="address1">Adres 1</option>
                <option value="address2">Adres 2</option>
                <option value="address3">Adres 3</option>
              </select>
            </div>
          </div>
          <div className="credit-card-form">
            <h2>Ödeme Bilgileri</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Kredi Kartı Numarası</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardName" className="form-label">Kart Sahibi Adı</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="expiration" className="form-label">Son Kullanma Tarihi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiration"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Ödemeyi Gerçekleştir</button>
            </form>
          </div>
        </div>
      </div>
    );
}
