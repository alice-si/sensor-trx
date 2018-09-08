import React from 'react'

import Button from '@material-ui/core/Button';

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <Button color="inherit" onClick={(event) => onLogoutUserClick(event)}>Logout</Button>
  )
}

export default LogoutButton
