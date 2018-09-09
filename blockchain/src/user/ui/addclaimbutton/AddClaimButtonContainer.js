import { connect } from 'react-redux'
import AddClaimButton from './AddClaimButton'
import { addClaim } from './AddClaimButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddClaimClick: (event) => {
      event.preventDefault();
      dispatch(addClaim(props.ppm, props.scheduledOn, props.bounty))
      props.onClick()
    }
  }
}

const AddClaimButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClaimButton)

export default AddClaimButtonContainer
