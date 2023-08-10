import React, { useState } from "react";
import { UserService } from "../services/userService";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:password
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      let userService = new UserService();
      userService.signUp(user).then((result) => {
        console.log(result);
      });
      
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <form onSubmit={handleSignUp}>
    <div className="card signup-card">
      <div className="card-body">
        <h2 className="card-title">Sign Up</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
    </form>
  );
}

