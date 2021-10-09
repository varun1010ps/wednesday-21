import _ from "lodash";
import {
  CREATE_STORY,
  FETCH_STORYS,
  FETCH_STORY,
  EDIT_STORY,
  DELETE_STORY,
} from "../actions/types";

const storyReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STORYS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_STORY:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_STORY:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_STORY:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_STORY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default storyReducer;
