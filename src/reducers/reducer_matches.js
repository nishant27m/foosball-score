import {FETCH_MATCHES} from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_MATCHES:
    return action.payload.data;

    default:
    return state;
  }

}
