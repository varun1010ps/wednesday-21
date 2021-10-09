import teamAccess from '../Api/heroicmindsapi';
import history from '../history';
import {
  CREATE_TEAMACCESS,
  FETCH_TEAMACCESSS,
  FETCH_TEAMACCESS,
  DELETE_TEAMACCESS,
  EDIT_TEAMACCESS
} from './types';


export const createTeamAccess = formValues => async (dispatch) => {
  const response = await teamAccess.post('/api/v1/teamaccess', { ...formValues });
  dispatch({ type: CREATE_TEAMACCESS, payload: response.data });
  history.push('/admin/library-TeamAccess');
};

export const fetchTeamAccesss = () => async dispatch => {
  const response = await teamAccess.get('/api/v1/teamaccess');

  dispatch({ type: FETCH_TEAMACCESSS, payload: response.data });
};

export const fetchTeamAccess = _id => async dispatch => {
  const response = await teamAccess.get(`/api/v1/teamaccess/${_id}`);

  dispatch({ type: FETCH_TEAMACCESS, payload: response.data });
};

export const editTeamAccess = (_id, formValues) => async dispatch => {
  const response = await teamAccess.put(`/api/v1/teamaccess/${_id}`, formValues);

  dispatch({ type: EDIT_TEAMACCESS, payload: response.data });
  history.push('/admin/library-TeamAccess');
};

export const deleteTeamAccess = _id => async dispatch => {
  await teamAccess.delete(`/api/v1/teamaccess/${_id}`);

  dispatch({ type: DELETE_TEAMACCESS, payload: _id });
  history.push('/admin/library-TeamAccess');
};