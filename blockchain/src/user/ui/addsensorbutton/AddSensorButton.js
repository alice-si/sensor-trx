import React from 'react';

import Button from '@material-ui/core/Button';

const AddSensorButton = ({ onAddSensorClick }) => {
  return(
    <Button variant="contained" color="primary" onClick={onAddSensorClick}>
      Add Sensor
    </Button>
  )
}

export default AddSensorButton