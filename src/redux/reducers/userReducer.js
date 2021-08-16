import {GET_CURRENT_USER, UPDATE_USER} from '../types';

const INITIAL_STATE = {
  id: null,
  first_name: null,
  last_name: null,
  current_city_id: null,
  _geo: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        _geo: action.payload,
      };
    default:
      return state;
  }
}
