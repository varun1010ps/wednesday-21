import _ from "lodash";
import {
  CREATE_SESSIONBETA,
  FETCH_SESSIONBETAS,
  FETCH_SESSIONBETA,
  EDIT_SESSIONBETA,
  DELETE_SESSIONBETA,
} from "../actions/types";

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SESSIONBETAS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_SESSIONBETA:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_SESSIONBETA:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_SESSIONBETA:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_SESSIONBETA:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default sessionReducer;
