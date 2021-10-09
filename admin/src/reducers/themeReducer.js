import _                    from 'lodash';
import {
  CREATE_THEME,
  FETCH_THEMES,
  FETCH_THEME,
  EDIT_THEME,
  DELETE_THEME,
}                           from "../actions/types";


const themeReducer = (state = {}, action) => {

    switch (action.type) {

        case FETCH_THEMES:
           return { ...state, ..._.mapKeys(action.payload, '_id')}; 
        case FETCH_THEME:
            return{...state,[action.payload._id]: action.payload};
        case CREATE_THEME:
            return{...state,[action.payload._id]: action.payload};
        case EDIT_THEME:
            return{...state,[action.payload._id]: action.payload};
        case DELETE_THEME:
            return _.omit(state,action.payload);
        default:
            return state;

    }

}


export default themeReducer;