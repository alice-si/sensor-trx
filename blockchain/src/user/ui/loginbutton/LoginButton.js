import React from 'react'

import Button from '@material-ui/core/Button';

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <Button color="inherit" onClick={(event) => onLoginUserClick(event)}>Login</Button>
  )
}

export default LoginButton
