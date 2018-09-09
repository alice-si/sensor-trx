const initialState = {
  data: {
    name: null,
    balance: null,
    address: '0x0',
  }
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'PROJECT_RECEIVED') {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default userReducer
