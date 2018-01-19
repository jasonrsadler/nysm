import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
//import DevsHow from './containers/DevsHow';
//import Sentries from './containers/Sentries';
//import NotFound from './containers/NotFound';
//import Login from './containers/Login';


export default () =>
<Switch>
    <Route path="/" exact component={Home} />    
    <Route component={NotFound} />
</Switch>; 