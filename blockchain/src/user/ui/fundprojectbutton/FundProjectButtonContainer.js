import { connect } from 'react-redux'
import FundProjectButton from './FundProjectButton'
import { addFunds } from './FundProjectButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFundProjectClick: (event) => {
      event.preventDefault();
      dispatch(addFunds())
      props.onClick()
    }
  }
}

const FundProjectButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FundProjectButton)

export default FundProjectButtonContainer
