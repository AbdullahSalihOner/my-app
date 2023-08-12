import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-light py-4" fixed="down">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Hakkımızda</h5>
            <p>En kaliteli ürünleri sizlere sunuyoruz.</p>
          </div>
          <div className="col-md-4">
            <h5>İletişim</h5>
            <p>Adres: Örnek Sokak, Örnek Mahalle, Örnek Şehir</p>
            <p>Email: info@example.com</p>
            <p>Telefon: 123-456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Sosyal Medya</h5>
            <a href="#" className="me-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="me-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="me-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="me-2">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}