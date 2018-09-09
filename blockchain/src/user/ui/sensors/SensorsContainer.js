import { connect } from 'react-redux'
import Sensors from './Sensors'
import { fetchSensors } from './SensorsActions'

const mapStateToProps = (state, ownProps) => {
  return {
    sensors: state.sensors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSensors: () => {
      dispatch(fetchSensors())
    }
  }
}

const SensorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sensors)

export default SensorsContainer
