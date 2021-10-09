import _ from "lodash";
import {
  CREATE_EPISODE,
  FETCH_EPISODES,
  FETCH_EPISODE,
  EDIT_EPISODE,
  DELETE_EPISODE,
} from "../actions/types";

const episodeReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_EPISODE:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_EPISODE:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_EPISODE:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_EPISODE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default episodeReducer;
