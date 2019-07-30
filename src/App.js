import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Error from './pages/Error';
//import withAuth from './utils/withAuth';

function withAuth(Component) {
  return props => {
    const token = localStorage.getItem('token');
    console.log('withAuth');
    console.log(token);
    if (token === null) {
      return <Redirect to="/signin" />;
    }
    return <Component {...props} token={token} />;
  };
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/" exact render={withAuth(Home)} />; }} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
