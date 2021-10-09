import journalquestion from '../Api/heroicmindsapi';
import history from '../history';
import {
  CREATE_JOURNALQUESTION,
  FETCH_JOURNALQUESTIONS,
  FETCH_JOURNALQUESTION,
  DELETE_JOURNALQUESTION,
  EDIT_JOURNALQUESTION
} from './types';


export const createJournalQuestion = formValues => async (dispatch) => {
  const response = await journalquestion.post('/api/v1/addJournalQuestion', { ...formValues });
  dispatch({ type: CREATE_JOURNALQUESTION, payload: response.data });
  history.push('/admin/library-journalquestion');
};

export const fetchJournalQuestions = () => async dispatch => {
  const response = await journalquestion.get('/api/v1/getAllJournalQuestion');
  console.log(response)
  dispatch({ type: FETCH_JOURNALQUESTIONS, payload: response.data.message.docs });
};

export const fetchJournalQuestion = _id => async dispatch => {
  const response = await journalquestion.get(`/api/v1/getJournalQuestion`,{params: {
    _id: _id
  }}); 

  dispatch({ type: FETCH_JOURNALQUESTION, payload: response.data});
};

export const editJournalQuestion = (_id, formValues) => async dispatch => {
  const response = await journalquestion.post(`/api/v1/journalquestion/${_id}`, formValues);

  dispatch({ type: EDIT_JOURNALQUESTION, payload: response.data });
  history.push('/admin/library-journalquestion');
};

export const deleteJournalQuestion = _id => async dispatch => {
  await journalquestion.post(`/api/v1/journalquestion`, {
      _id
  });

  dispatch({ type: DELETE_JOURNALQUESTION, payload: _id });
  history.push('/admin/library-journalquestion');
};