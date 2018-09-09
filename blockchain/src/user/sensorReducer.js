const initialState = []

const sensorReducer = (state = initialState, action) => {
  if (action.type === 'SENSORS_RECEIVED') {
    return [...action.payload]
  }

  return state
}

export default sensorReducer
