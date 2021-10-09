import _                    from 'lodash';
import {
  CREATE_TOPIC,
  FETCH_TOPICS,
  FETCH_TOPIC,
  EDIT_TOPIC,
  DELETE_TOPIC,
}                           from "../actions/types";


const topicReducer = (state = {}, action) => {

    switch (action.type) {

        case FETCH_TOPICS:
           return { ...state, ..._.mapKeys(action.payload, '_id')}; 
        case FETCH_TOPIC:
            return{...state,[action.payload._id]: action.payload};
        case CREATE_TOPIC:
            return{...state,[action.payload._id]: action.payload};
        case EDIT_TOPIC:
            return{...state,[action.payload._id]: action.payload};
        case DELETE_TOPIC:
            return _.omit(state,action.payload);
        default:
            return state;

    }

}


export default topicReducer;