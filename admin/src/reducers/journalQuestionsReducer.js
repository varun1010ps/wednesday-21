import _ from "lodash";
import {
  CREATE_JOURNALQUESTION,
  FETCH_JOURNALQUESTIONS,
  FETCH_JOURNALQUESTION,
  EDIT_JOURNALQUESTION,
  DELETE_JOURNALQUESTION,
} from "../actions/types";

const journalQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_JOURNALQUESTIONS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_JOURNALQUESTION:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_JOURNALQUESTION:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_JOURNALQUESTION:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_JOURNALQUESTION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default journalQuestionsReducer;
