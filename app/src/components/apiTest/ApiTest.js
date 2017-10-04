import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import ApiPosts from './ApiPosts';


import ApiNewsLetter from './ApiNewsLetter';

import 'font-awesome/css/font-awesome.min.css';


class ApiTest extends Component{

 render(){
   


   return (
        <div className="apiTest">
        <Route path="/apitest/posts" component={ApiPosts} />
        <Route path="/apitest/newsletter" component={ApiNewsLetter} />
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
