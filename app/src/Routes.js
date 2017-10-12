import React from 'react';
import {Switch,Route} from 'react-router-dom';
import ApiTest from './components/apiTest/ApiTest';
import EventsPage from './components/events/EventsPage';
import HomePage from './components/home/HomePage';
import BlogPage from './components/blog/BlogPage';
import CreateEvent from './components/createEvent/CreateEvent';
import UserEvents from './components/user/UserEvents';
import UserPosts from './components/user/UserPosts';
import UserAccount from './components/user/UserAccount';
import EventDetail from './components/events/EventDetail';
import BlogDetails from './components/blog/BlogDetails';
import CreateBlog from './components/createblog/CreateBlog'
import AdminNotifications from './components/admin/AdminNotifications';
import AdminUsers from './components/admin/AdminUsers';

const adminRoutes = () => {
    return (
        <Switch>
            <Route/>
        </Switch>
    )
}
export default (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/apitest" component={ApiTest}/>
        <Route path="/events" component={EventsPage}/>
        <Route path="/blog/:blogId" component={BlogDetails}/>
        <Route path="/blog" component={BlogPage}/>
        <Route path="/createblog/:blogId" component={CreateBlog} />
        <Route path="/createEvent/:eventId" component={CreateEvent}/>
        <Route path="/dashboard/events" component={UserEvents}/>
        <Route path="/dashboard/posts" component={UserPosts}/>
        <Route path="/dashboard/account" component={UserAccount}/>      
        <Route path="/event/:eventId" component={EventDetail}/>
        <Route path='/notifications' component={AdminNotifications}/>
        <Route path='/users' component={AdminUsers}/>
    </Switch>
);
