import {GET_STATISTICS} from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_STATISTICS:
      return action.payload.data;

    default:
      return state;
  }

}
