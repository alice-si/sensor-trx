import { connect } from 'react-redux'
import AddClaimButton from './AddClaimButton'
import { addClaim } from './AddClaimButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClaimClick: (event) => {
      event.preventDefault();

      dispatch(addClaim())
    }
  }
}

const AddClaimButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClaimButton)

export default AddClaimButtonContainer
