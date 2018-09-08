import { connect } from 'react-redux'
import ToggleSensorButton from './ToggleSensorButton'
import { deactivateSensor, activateSensor } from './ToggleSensorButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deactivateSensor: (sensorId) => {
      dispatch(deactivateSensor(sensorId))
    },
    activateSensor: (sensorId) => {
      dispatch(activateSensor(sensorId))
    }
  }
}

const ToggleSensorButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleSensorButton)

export default ToggleSensorButtonContainer
