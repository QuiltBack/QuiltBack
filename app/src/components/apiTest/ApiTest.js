import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import ApiPosts from './ApiPosts';
import ApiEvents from './ApiEvents';
import myForm from './myForm';
import ApiNewsLetter from './ApiNewsLetter';
import ApiEventDetail from './ApiEventDetail';
import ApiEventPage from './ApiEventPage';
import ApiCreateEvent from './ApiCreateEvent';
import 'font-awesome/css/font-awesome.min.css';


class ApiTest extends Component{

 render(){
   


   return (
        <div className="apiTest">
api TESTS
        <Route path="/apitest/posts" component={ApiPosts} />
        <Route path="/apitest/events" component={ApiEvents} />
        <Route path="/apitest/form" component={myForm} />
         <Route path="/apitest/eventpage" component={ApiEventPage} />
        <Route path="/apitest/eventdetail/:eventId" component={ApiEventDetail} />
        <Route path="/apitest/newsletter" component={ApiNewsLetter} />
        <Route path="/apitest/createevent" component={ApiCreateEvent} />
        </div>
    )
 }


}

function mapStateToProps(state, ownProps) {

    if (ownProps && ownProps.history && !(state && state.history))
        return Object.assign({}, state, {
            history: ownProps.history
        });
    return state;


}

export default connect(mapStateToProps, {
})(ApiTest);
