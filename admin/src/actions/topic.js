import topic from "../Api/heroicmindsapi";
import history from "../history";
import {
  CREATE_TOPIC,
  FETCH_TOPICS,
  FETCH_TOPIC,
  DELETE_TOPIC,
  EDIT_TOPIC,
} from "./types";

export const createTopic = (formValues, file) => async (dispatch) => {
  const uploadConfig = await topic.get("/api/v1/upload");

  const upload = await topic.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  console.log(upload);
  const response = await topic.post("/api/v1/librarytopic", {
    ...formValues,
    imageurl: uploadConfig.data.key,
  });

  dispatch({ type: CREATE_TOPIC, payload: response.data });
  history.push("/admin/library-topics");
};

export const fetchTopics = () => async (dispatch) => {
  const response = await topic.get("/api/v1/getAllTopic");
  console.log(response)

  dispatch({ type: FETCH_TOPICS, payload: response.data.message.docs });
};

export const fetchTopic = (_id) => async (dispatch) => {
  const response = await topic.get(`/api/v1/librarytopic/${_id}`);

  dispatch({ type: FETCH_TOPIC, payload: response.data });
};

export const editTopic = (_id, formValues,file) => async (dispatch) => {
  const uploadConfig = await topic.get("/api/v1/upload");

  const upload = await topic.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  console.log(upload);
  const response = await topic.put(`/api/v1/librarytopic/${_id}`, {
    ...formValues,
    imageurl: uploadConfig.data.key,
  });

  dispatch({ type: EDIT_TOPIC, payload: response.data });
  history.push("/admin/library-topics");
};

export const deleteTopic = (_id) => async (dispatch) => {
  await topic.delete(`/api/v1/librarytopic/${_id}`);

  dispatch({ type: DELETE_TOPIC, payload: _id });
  history.push("/admin/library-topics");
};
