import React from 'react';
import {Switch,Route} from 'react-router-dom';
import ApiTest from './components/apiTest/ApiTest';
import ApiPosts from './components/apiTest/ApiPosts';
import ApiEvents from './components/apiTest/ApiEvents';
import EventsPage from './components/events/EventsPage';
import HomePage from './components/home/HomePage';
import BlogPage from './components/blog/BlogPage';
import CreateEvent from './components/createEvent/CreateEvent';
import UserEvents from './components/user/UserEvents';
import UserPosts from './components/user/UserPosts';
import UserAccount from './components/user/UserAccount';

export default (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/apitest" component={ApiTest}/>
        <Route path="/events" component={EventsPage}/>
        <Route path="/blog" component={BlogPage}/>
        <Route path="/createEvent" component={CreateEvent}/>
        <Route path="/dashboard/events" component={UserEvents}/>
        <Route path="/dashboard/posts" component={UserPosts}/>
        <Route path="/dashboard/account" component={UserAccount}/>
    </Switch>
);