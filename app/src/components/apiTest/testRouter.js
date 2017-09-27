import {Switch,Route} from 'react-router-dom';
import React from 'react';
import ApiPosts from './ApiPosts';
import ApiEvents from './ApiEvents';
export default (
    <Switch>
        <Route path="/posts" component={ApiPosts} />
        <Route path="/events" component={ApiEvents} />
    </Switch>
);