const redux = require('redux'),
createStore = redux.createStore,
applyMiddleware = redux.applyMiddleware,
thunk = require('redux-thunk').default,
reducers = require('./reducers').default,
store = createStore(reducers, applyMiddleware(thunk));

module.exports = store;
