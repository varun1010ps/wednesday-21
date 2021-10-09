import _                    from 'lodash';
import {
  CREATE_TEAMACCESS,
  FETCH_TEAMACCESSS,
  FETCH_TEAMACCESS,
  EDIT_TEAMACCESS,
  DELETE_TEAMACCESS,
}                           from "../actions/types";


const teamAccessReducer = (state = {}, action) => {

    switch (action.type) {

        case FETCH_TEAMACCESSS:
           return { ...state, ..._.mapKeys(action.payload, '_id')}; 
        case FETCH_TEAMACCESS:
            return{...state,[action.payload._id]: action.payload};
        case CREATE_TEAMACCESS:
            return{...state,[action.payload._id]: action.payload};
        case EDIT_TEAMACCESS:
            return{...state,[action.payload._id]: action.payload};
        case DELETE_TEAMACCESS:
            return _.omit(state,action.payload);
        default:
            return state;

    }

}


export default teamAccessReducer;