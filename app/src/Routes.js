import React from 'react';
import {Switch,Route} from 'react-router-dom';
import ApiTest from './components/apiTest/ApiTest';
import ApiPosts from './components/apiTest/ApiPosts';
import ApiEvents from './components/apiTest/ApiEvents';
import EventsPage from './components/events/EventsPage';
import HomePage from './components/home/HomePage';
import BlogPage from './components/blog/BlogPage';
import CreateEvent from './components/createEvent/CreateEvent';
import EventDetail from './components/events/EventDetail'

export default (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/apitest" component={ApiTest}/>
        <Route path="/events" component={EventsPage}/>
        <Route path="/blog" component={BlogPage}/>
        <Route path="/createEvent/:eventId" component={CreateEvent}/>
         <Route path="/event/:eventId" component={EventDetail}/>
    </Switch>
);