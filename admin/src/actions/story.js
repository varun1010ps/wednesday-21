import story from "../Api/heroicmindsapi";
import history from "../history";
import {
  CREATE_STORY,
  FETCH_STORYS,
  FETCH_STORY,
  DELETE_STORY,
  EDIT_STORY,
} from "./types";

export const createStory = (formValues, file, audiofile) => async (dispatch) => {
  const uploadConfig = await story.get("/api/v1/upload");

  const upload = await story.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  const audioUploadConfig = await story.get("/api/v1/audio");

  const audioUpload = await story.put(audioUploadConfig.data.url, audiofile, {
    headers: {
      "Content-Type": audiofile.type,
    },
  });
  if (upload) console.log('Upload Success')
  if (audioUpload) console.log('Upload Success')
  const response = await story.post("/api/v1/addStories", {
    ...formValues,
    imageUrl: uploadConfig.data.key,
    audioFile:audioUploadConfig.data.key
  });

  dispatch({ type: CREATE_STORY, payload: response.data });
  history.push("/admin/library-stories");
};

export const fetchStorys = () => async (dispatch) => {
  const response = await story.get("/api/v1/getAllStories");
  console.log(response)
  dispatch({ type: FETCH_STORYS, payload: response.data.message.docs });
};

export const fetchStory = (_id) => async (dispatch) => {
  const response = await story.get(`/api/v1/getStories`, {params: {
    _id: _id
  }});  
  console.log(response)
  dispatch({ type: FETCH_STORY, payload: response.data });
};

export const editStory = (_id, formValues,file) => async (dispatch) => {
  const uploadConfig = await story.get("/api/v1/upload");

  const upload = await story.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  console.log(upload);
  const response = await story.post(`/api/v1/updateStories`, {
    ...formValues,
    imageurl: uploadConfig.data.key,
  });

  dispatch({ type: EDIT_STORY, payload: response.data });
  history.push("/admin/library-stories");
};

export const deleteStory = (_id) => async (dispatch) => {
  await story.post(`/api/v1/removeStories`, {
    _id
  });

  dispatch({ type: DELETE_STORY, payload: _id });
  history.push("/admin/library-stories");
};
