import { connect } from 'react-redux'
import AddSensorButton from './AddSensorButton'
import { addSensor } from './AddSensorButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSensorClick: (event) => {
      event.preventDefault();

      dispatch(addSensor())
    }
  }
}

const AddSensorButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSensorButton)

export default AddSensorButtonContainer
