import epsiode from "../Api/heroicmindsapi";
import history from "../history";
import {
  CREATE_EPISODE,
  FETCH_EPISODES,
  FETCH_EPISODE,
  DELETE_EPISODE,
  EDIT_EPISODE,
} from "./types";

export const createEpisode = (formValues, file, audiofile) => async (dispatch) => {
  const uploadConfig = await epsiode.get("/api/v1/upload");

  const upload = await epsiode.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  const audioUploadConfig = await epsiode.get("/api/v1/audio");

  const audioUpload = await epsiode.put(audioUploadConfig.data.url, audiofile, {
    headers: {
      "Content-Type": audiofile.type,
    },
  });
  if (upload) console.log('Upload Success')
  if (audioUpload) console.log('Upload Success')
  const response = await epsiode.post("/api/v1/episode", {
    ...formValues,
    imageUrl: uploadConfig.data.key,
    audioFile:audioUploadConfig.data.key
  });

  dispatch({ type: CREATE_EPISODE, payload: response.data });
  history.push("/admin/library-episodes");
};

export const fetchEpisodes = () => async (dispatch) => {
  const response = await epsiode.get("/api/v1/episode");

  dispatch({ type: FETCH_EPISODES, payload: response.data });
};

export const fetchEpisode = (_id) => async (dispatch) => {
  const response = await epsiode.get(`/api/v1/episode/${_id}`);

  dispatch({ type: FETCH_EPISODE, payload: response.data });
};

export const editEpisode = (_id, formValues,file) => async (dispatch) => {
  const uploadConfig = await epsiode.get("/api/v1/upload");

  const upload = await epsiode.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  console.log(upload);
  const response = await epsiode.put(`/api/v1/episode/${_id}`, {
    ...formValues,
    imageurl: uploadConfig.data.key,
  });

  dispatch({ type: EDIT_EPISODE, payload: response.data });
  history.push("/admin/library-episodes");
};

export const deleteEpisode = (_id) => async (dispatch) => {
  await epsiode.delete(`/api/v1/episode/${_id}`);

  dispatch({ type: DELETE_EPISODE, payload: _id });
  history.push("/admin/library-episodes");
};
