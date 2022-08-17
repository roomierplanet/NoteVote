import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LoginButton = (props) => {
  const { loginWithPopup } = useAuth0();
  return <Button style={{'width': '10rem', 'borderRadius': '3rem', 'background-color': 'black'}}variant='contained'
  onClick={() => loginWithPopup()}>{props.children}</Button>
};

export default LoginButton;