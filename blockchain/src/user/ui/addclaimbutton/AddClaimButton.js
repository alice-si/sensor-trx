import React from 'react';

import Button from '@material-ui/core/Button';

const AddClaimButton = ({ onAddClaimClick }) => {
  return(
    <Button variant="contained" color="primary" onClick={onAddClaimClick}>
      Add Claim
    </Button>
  )
}

export default AddClaimButton