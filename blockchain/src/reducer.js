import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import projectReducer from './user/projectReducer'
import sensorReducer from './user/sensorReducer'
import claimReducer from './user/claimReducer'
import web3Reducer from './util/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  project: projectReducer,
  sensors: sensorReducer,
  claims: claimReducer,
  web3: web3Reducer
})

export default reducer
