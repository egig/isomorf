import React from 'react';
import ReactDOM from 'react-dom';
import Isomorf from '../common/Isomorf';
import { BrowserRouter } from 'react-router-dom'
import storeFromState from '../common/storeFromState'

const store = storeFromState(window.__PRELOADED_STATE);

ReactDOM.render(<BrowserRouter>
	<Isomorf store={store} />
</BrowserRouter>, document.getElementById('app'));


