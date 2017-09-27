import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEvents} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';



class ApiEvents extends Component{
 testType='events';

componentDidMount() {

    if (this.props && this.props.getPosts && this.props.general ) {
    
      if ( this.props.general.events.length<1){
          this.props.getEvents();
      }
    }
    

}
componentWillReceiveProps(ownProps) {
   
    if (this.props && this.props.getPosts && this.props.general ) {
     
      if (this.props.general.events.length<1){
          this.props.getEvents();
      }
    }
    

}

 render(){
  
   let events='';


   if (this.props && this.props.general.posts && this.testType==='events'){
    events = this.props.general.events.map((event,index)=>{
      return (<div className="event" key={index}>
          
           <h1>{event.event_title}</h1>
           <p>{event.event_description}</p>

      </div>)
   })
    
   }


   return (
        

           <div className="events">
             <h1>Events</h1>
             {events}
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
   
    getEvents:getEvents
})(ApiEvents);
