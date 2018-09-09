import React from 'react';

import Button from '@material-ui/core/Button';

const FundProjectButton = ({ onFundProjectClick }) => {
  return(
    <Button variant="contained" color="primary" onClick={onFundProjectClick}>
      Add Bounty
    </Button>
  )
}

export default FundProjectButton