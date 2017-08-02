import { makeURL } from './../utility/utility';

require('isomorphic-fetch');

export const fetchTodaysSelections = (params = { mode: 'today' }, customHeaders = {}) => (
  (dispatch) => (
    fetch(makeURL(`/selections`, params), {
      method: 'GET',
      headers: Object.assign({}, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, customHeaders)
    }).then((response) => {
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        console.log(error);
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((contents) => (
      dispatch(
        fetchTodaysSelectionsSuccess(contents)
      )
    )).catch((error) => (
      dispatch(
      fetchTodaysSelectionsError(error)
      )
    ))
  )
);

export const FETCH_TODAYS_SELECTIONS_SUCCESS = 'fetch_todays_selections_success';
export const FETCH_TODAYS_SELECTIONS_ERROR = 'fetch_todays_selections_error';

export const fetchTodaysSelectionsSuccess = function(contents) {
  console.log('fetchTodaysSelectionsSuccess', contents);
  return {
    type: FETCH_TODAYS_SELECTIONS_SUCCESS,
    contents
  }
}

export const fetchTodaysSelectionsError = function(error) {
  console.log('fetchDirectoryContentsError', error);
  return {
    type: FETCH_TODAYS_SELECTIONS_ERROR,
    error: error
  }
}














export const fetchLast30Selections = (params = { mode: 'monthly' }, customHeaders = {}) => (
  (dispatch) => (
    fetch(makeURL(`/selections`, params), {
      method: 'GET',
      headers: Object.assign({}, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, customHeaders)
    }).then((response) => {
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        console.log(error);
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((contents) => (
      dispatch(
        fetchLast30SelectionsSuccess(contents)
      )
    )).catch((error) => (
      dispatch(
      fetchLast30SelectionsError(error)
      )
    ))
  )
);

export const FETCH_LAST30_SELECTIONS_SUCCESS = 'fetch_last30_selections_success';
export const FETCH_LAST30_SELECTIONS_ERROR = 'fetch_last30_selections_error';

export const fetchLast30SelectionsSuccess = function(contents) {
  console.log('fetchLast30SelectionsSuccess', contents);
  return {
    type: FETCH_LAST30_SELECTIONS_SUCCESS,
    contents
  }
}

export const fetchLast30SelectionsError = function(error) {
  console.log('fetchLast30SelectionsError', error);
  return {
    type: FETCH_LAST30_SELECTIONS_ERROR,
    error: error
  }
}















export const fetchRealTimeSelections = (params = { mode: 'real-time' }, customHeaders = {}) => (
  (dispatch) => (
    fetch(makeURL(`/selections`, params), {
      method: 'GET',
      headers: Object.assign({}, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, customHeaders)
    }).then((response) => {
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        console.log(error);
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((contents) => (
      dispatch(
        fetchRealTimeSelectionsSuccess(contents)
      )
    )).catch((error) => (
      dispatch(
      fetchRealTimeSelectionsError(error)
      )
    ))
  )
);

export const FETCH_REALTIME_SELECTIONS_SUCCESS = 'fetch_realtime_selections_success';
export const FETCH_REALTIME_SELECTIONS_ERROR = 'fetch_realtime_selections_error';

export const fetchRealTimeSelectionsSuccess = function(contents) {
  console.log('fetchRealTimeSelectionsSuccess', contents);
  return {
    type: FETCH_REALTIME_SELECTIONS_SUCCESS,
    contents
  }
}

export const fetchRealTimeSelectionsError = function(error) {
  console.log('fetchRealTimeSelectionsError', error);
  return {
    type: FETCH_REALTIME_SELECTIONS_ERROR,
    error: error
  }
}
