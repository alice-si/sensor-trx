import { connect } from 'react-redux'
import Claims from './Claims'
import { fetchClaims } from './ClaimsActions'

const mapStateToProps = (state, ownProps) => {
  return {
    claims: state.claims
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClaims: () => {
      dispatch(fetchClaims())
    }
  }
}

const ClaimsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Claims)

export default ClaimsContainer
