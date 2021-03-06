import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Error from './pages/Error';
import withAuth from './utils/withAuth';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signin" exact render={Signin} />
				<Route path="/" exact render={withAuth(Home)} />; }} />
				<Route component={Error} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
