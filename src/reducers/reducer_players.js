import {FETCH_PLAYERS} from '../actions/index';

export default function(state = {}, action) {

    switch(action.type) {
    case FETCH_PLAYERS:
      return action.payload.data;
    default:
      return state;
  }

}
