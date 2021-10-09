import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import adminAuthReducer from "./adminAuthReducer";
import episodeReducer from "./episodeReducer";
import storyReducer from "./storyReducer";
import teamAccessReducer from "./teamAccessReducer";
import themeReducer from "./themeReducer";
import topicReducer from "./topicReducer";
import journalQuestionsReducer from "./journalQuestionsReducer";
import sessionBetaReducer from "./sessionReducer";

export default combineReducers({
    form: formReducer,
    auth: adminAuthReducer,
    theme: themeReducer,
    topic: topicReducer,
    episode: episodeReducer,
    teamAccess: teamAccessReducer,
    story: storyReducer,
    journalQuestion: journalQuestionsReducer,
    sessionBeta: sessionBetaReducer
})