import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import pokeApi from './pokeApi';

export default combineReducers({
  form: reduxFormReducer,
  pokeApi,
});
