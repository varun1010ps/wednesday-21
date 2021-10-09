import sessionBeta from '../Api/heroicmindsapi';
import history from '../history';
import {
  CREATE_SESSIONBETA,
  FETCH_SESSIONBETAS,
  FETCH_SESSIONBETA,
  DELETE_SESSIONBETA,
  EDIT_SESSIONBETA
} from './types';


export const createSessionBeta = formValues => async (dispatch) => {
  const response = await sessionBeta.post('/api/v1/addSessionBeta', { ...formValues });
  dispatch({ type: CREATE_SESSIONBETA, payload: response.data });
  history.push('/admin/library-sessionBeta');
};

export const fetchSessionBetas = () => async dispatch => {
  const response = await sessionBeta.get('/api/v1/getAllSessionBeta');

  dispatch({ type: FETCH_SESSIONBETAS, payload: response.data.message.docs });
};

export const fetchSessionBeta = _id => async dispatch => {
  const response = await sessionBeta.get(`/api/v1/getSessionBeta`, {
    params: {
      _id: _id
    }
  });

  dispatch({ type: FETCH_SESSIONBETA, payload: response.data });
};

export const editSessionBeta = (_id, formValues) => async dispatch => {
  const response = await sessionBeta.put(`/api/v1/updateSessionBeta/${_id}`, formValues);

  dispatch({ type: EDIT_SESSIONBETA, payload: response.data });
  history.push('/admin/library-sessionBeta');
};

export const deleteSessionBeta = _id => async dispatch => {
  await sessionBeta.delete(`/api/v1/updateSessionBeta/${_id}`);

  dispatch({ type: DELETE_SESSIONBETA, payload: _id });
  history.push('/admin/library-sessionBeta');
};