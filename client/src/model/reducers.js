import * as actions from './actions';

//import update from 'react-addons-update';
//import { randomRange } from '../utility/utility';

const combineReducers = require('redux').combineReducers;


const initialRealTimeSelectionsReducer = [];
function realTimeSelectionsReducer(state, action) {
  state = state || initialRealTimeSelectionsReducer;

  switch (action.type) {
    case actions.FETCH_REALTIME_SELECTIONS_SUCCESS:
    return friendlyProperties(action.contents);
    break;

  }

  return state;
}


const initialTodaySelectionsReducer = [];
function todaysSelectionsReducer(state, action) {
  state = state || initialTodaySelectionsReducer;

  switch (action.type) {
    case actions.FETCH_TODAYS_SELECTIONS_SUCCESS:
    return friendlyProperties(action.contents);
    break;

  }

  return state;
}


const initialLast30SelectionsReducer = [];
function last30SelectionsReducer(state, action) {
  state = state || initialLast30SelectionsReducer;

  switch (action.type) {
    case actions.FETCH_LAST30_SELECTIONS_SUCCESS:
    return friendlyProperties(action.contents);
    break;

  }

  return state;
}

// prepare data to be more easily consumbed by recharts
const friendlyProperties = (data) => (
  data.map((dto) => (
    Object.assign({}, dto, {
      'Removed': dto.totalCallsRemoved,
      'Selection size': dto.segmentSize,
      'Added': dto.totalCallsAdded,
    })
  ))
);

// there are three reducers, one for each view mode of the chart
export default combineReducers({
  last30Selections: last30SelectionsReducer,
  todaysSelection: todaysSelectionsReducer,
  realTimeSelections: realTimeSelectionsReducer
});
