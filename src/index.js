import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js'
import store, { history } from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
            <Switch>
            	
            	<Route component={App} />
        	</Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
