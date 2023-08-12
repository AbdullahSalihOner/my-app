import React from 'react'
import { useState } from 'react';

export default function About() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bilgileri işleme veya gönderme işlemleri burada yapılabilir
    // Örneğin, bir API'ye göndermek veya veritabanına kaydetmek gibi
    console.log('Bilgiler gönderildi:', { email, firstname, lastname });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        width: '300px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Bilgilerim</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" style={{ marginBottom: '5px', display: 'block' }}>Email</label>
            <input
            
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" style={{ marginBottom: '5px', display: 'block' }}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" style={{ marginBottom: '5px', display: 'block' }}>Firstname</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" style={{ marginBottom: '5px', display: 'block' }}>Lastname</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Güncelle</button>
          </div>
        </form>
      </div>
    </div>
  );
}
