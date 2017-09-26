import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts,getEvents} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';



class ApiTest extends Component{
 testType='events';

componentDidMount() {

    if (this.props && this.props.getPosts && this.props.general ) {
      if (this.testType==='posts' && this.props.general.posts.length < 1){
        this.props.getPosts();
      }
      if (this.testType==='events' && this.props.general.events.length<1){
          this.props.getEvents();
      }
    }
    

}
componentWillReceiveProps(ownProps) {
   
    if (this.props && this.props.getPosts && this.props.general ) {
      if (this.testType==='posts' && this.props.general.posts.length < 1){
        this.props.getPosts();
      }
      if (this.testType==='events' && this.props.general.events.length<1){
          this.props.getEvents();
      }
    }
    

}

 render(){
   let posts='';
   let events='';
   if (this.props && this.props.general.posts && this.testType==='posts'){
    posts = this.props.general.posts.map((post,index)=>{
      return (<div className="post" key={index}>
          
           <h1>{post.post_title}</h1>
           <p>{post.post_text}</p>

      </div>)
   })
    
}


   if (this.props && this.props.general.posts && this.testType==='events'){
    events = this.props.general.events.map((event,index)=>{
      return (<div className="event" key={index}>
          
           <h1>{event.event_title}</h1>
           <p>{event.event_description}</p>

      </div>)
   })
    
   }


   return (
        <div className="apiTest">

           <div className="events">
             <h1>Events</h1>
             {events}
           </div>

           <div className="posts">
             <h1>Posts</h1>
             {posts}
           </div>


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
    getPosts: getPosts,
    getEvents:getEvents
})(ApiTest);
