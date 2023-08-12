import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Button } from "semantic-ui-react";

export default function SignedOut(props) {
  localStorage.removeItem('id');
  return (
    <div>
      <Button as={NavLink} to="/login" onClick={props.signIn} primary>Giriş yap</Button>
    </div>
  );
}
