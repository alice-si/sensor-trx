const initialState = []

const claimReducer = (state = initialState, action) => {
  if (action.type === 'CLAIMS_RECEIVED') {
    return [...action.payload]
  }

  return state
}

export default claimReducer
