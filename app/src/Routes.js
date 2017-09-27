import {Switch,Route} from 'react-router-dom';
import React from 'react';
import ApiTest from './components/apiTest/ApiTest';
import ApiPosts from './components/apiTest/ApiPosts';
import ApiEvents from './components/apiTest/ApiEvents';

export default (
    <Switch>
        <Route path="/apitest" component={ApiTest} >
       </Route>
    </Switch>
);