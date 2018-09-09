import { connect } from 'react-redux'
import AddSensorButton from './AddSensorButton'
import { addSensor } from './AddSensorButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddSensorClick: (event) => {
      event.preventDefault();
      dispatch(addSensor(props.address))
      props.onClick()
    }
  }
}

const AddSensorButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSensorButton)

export default AddSensorButtonContainer
