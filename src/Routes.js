import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home'
const RouterOutlet = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default RouterOutlet;
