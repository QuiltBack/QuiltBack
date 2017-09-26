import {Switch,Route} from 'react-router-dom';
import React from 'react';
import ApiTest from './components/apiTest/ApiTest';

export default (
    <Switch>
        <Route path="/apitest" component={ApiTest} />
    </Switch>
);