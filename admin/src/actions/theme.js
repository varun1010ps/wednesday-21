import theme from '../Api/heroicmindsapi';
import history from '../history';
import {
  CREATE_THEME,
  FETCH_THEMES,
  FETCH_THEME,
  DELETE_THEME,
  EDIT_THEME
} from './types';


export const createTheme = formValues => async (dispatch) => {
  const response = await theme.post('/api/v1/theme', { ...formValues });
  dispatch({ type: CREATE_THEME, payload: response.data });
  history.push('/admin/library-theme');
};

export const fetchThemes = () => async dispatch => {
  const response = await theme.get('/api/v1/theme');

  dispatch({ type: FETCH_THEMES, payload: response.data });
};

export const fetchTheme = _id => async dispatch => {
  const response = await theme.get(`/api/v1/theme/${_id}`);

  dispatch({ type: FETCH_THEME, payload: response.data });
};

export const editTheme = (_id, formValues) => async dispatch => {
  const response = await theme.put(`/api/v1/theme/${_id}`, formValues);

  dispatch({ type: EDIT_THEME, payload: response.data });
  history.push('/admin/library-theme');
};

export const deleteTheme = _id => async dispatch => {
  await theme.delete(`/api/v1/theme/${_id}`);

  dispatch({ type: DELETE_THEME, payload: _id });
  history.push('/admin/library-theme');
};