import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducer';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

import App from './App';
const rootElement = document.getElementById('root');

window.React = Perf;

ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, rootElement);
