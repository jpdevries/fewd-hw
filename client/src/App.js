import React, { Component } from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import * as actions from './model/actions';

import { randomRange, reduceArrayFrequency } from './utility/utility';

import Stage from './Stage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushState: {},
      onDay: false,
      viewMode: 'monthly'
    };
  }

  // every so often, for today and real-time views, re-fresh data from the server
  tock = () => {
    const {props, state} = this,
    {dispatch} = props;

    console.log('tock');

    if(state.viewMode == 'today') {
      dispatch(actions.fetchTodaysSelections());
    } else if(state.viewMode == 'real-time') {
      dispatch(actions.fetchRealTimeSelections());
    }
  }

  // when the component is going to update, do stuff if the view mode is changing
  componentWillUpdate(nextProps, nextState) {
    const {props, state} = this;

    if(state.viewMode !== nextState.viewMode) {
      //console.log(`changing view mode from ${state.viewMode} to ${nextState.viewMode}`);
      const interval = (() => {
        switch(nextState.viewMode) {
          case 'real-time':
          return 10000; // every 10 seconds

          case 'today':
          default:
          return 60000; // every minute
        }
      })();

      if(this.tick) {
        clearInterval(this.tick);
      }

      // no need to tick on monthly view
      if(nextState.viewMode == 'monthly') return;

      this.tick = setInterval(this.tock, interval);
    }
  }

  // when the app starts up, hit the REST API
  componentWillMount() {
    const {props} = this,
    {dispatch} = props;

    this.fetchDataFromAPI();
  }

  async fetchDataFromAPI() {
    const {props} = this,
    {dispatch} = props;

    // wouldn't do this in production
    // but for the assignment, just grab all the data straight away
    await dispatch(actions.fetchLast30Selections());
    await dispatch(actions.fetchTodaysSelections());
    await dispatch(actions.fetchRealTimeSelections());
  }

  render() {
    const { props, state } = this,
    // data from Redux for each of the three chart views
    { last30Selections, todaysSelection, realTimeSelections } = props;

    const selectionsData = (() => {
      switch (state.viewMode) {
        case 'monthly':
        // the redux data contains lots of sample points, we reduce their frequency here
        return reduceArrayFrequency(last30Selections, 31);

        case 'real-time':
        return reduceArrayFrequency(realTimeSelections, 24);

        case 'today':
        return reduceArrayFrequency(todaysSelection, 24);
      }
    })();

    return (
      <div className="App">
        <form onChange={(event) => {
          this.setState({
            viewMode: event.target.getAttribute('id')
          })
        }}>
        <fieldset>
          <legend>Viewing selections for</legend>
          <div>
          <label htmlFor="monthly">
            <input checked={this.state.viewMode === 'monthly'} type="radio" name="view-mode" id="monthly" /> Last 30 days
          </label>
          <label htmlFor="today">
            <input checked={this.state.viewMode === 'today'} type="radio" name="view-mode" id="today" /> Today
          </label>
          <label htmlFor="real-time">
            <input checked={this.state.viewMode === 'real-time'} type="radio" name="view-mode" id="real-time" /> Real&ndash;time
          </label>
          </div>
        </fieldset>
        </form>

        <Stage data={selectionsData} viewMode={this.state.viewMode} brushState={this.state.brushState} />

      </div>
    );
  }
}

// connect our App component (view) up to Redux (model)
export default (connect(function(state, props) { // todo list
    return {
      last30Selections: state.last30Selections,
      todaysSelection: state.todaysSelection,
      realTimeSelections: state.realTimeSelections
    }
})(App));
