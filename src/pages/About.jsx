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
    <div className="container">
      <h2>Bilgilerim</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">Firstname</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Lastname</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Kaydet</button>
      </form>
    </div>
  );
}
