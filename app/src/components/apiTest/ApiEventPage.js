import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEventPage,getNextEventPage} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';
import './ApiEvents.css';



const moment = require('moment');


class ApiEventPage extends Component{
 testType='events';

componentDidMount() {

console.log("DIDMOUNT");
    if (this.props && this.props.getEventPage && this.props.general ) {
    
    console.log("props valid");
      if ( this.props.general.events.length<1){
          console.log("call get event page");
          console.log(`pageSize ${this.props.general.eventPageSize}`);
          this.props.getEventPage(this.props.general.eventPage,this.props.general.eventPageSize);
      }
    }
    

}
nextPage()
{
    console.log("GET NEXTPAGE");
     if (this.props && this.props.getNextEventPage && this.props.general ) {

          console.log("call get next event page");
          this.props.getNextEventPage(this.props.general.eventPage,this.props.general.eventPageSize);
    
     }
}

 render(){
  
   let events='';
  let weekDays={
      1:"Sun",
      2:"Mon",
      3:"Tues",
      4:"Wed",
      5:"Thurs",
      6:"Fri",
      7:"Sat"
  };
   

console.log(this.props.general);

   if (this.props && this.props.general.events ){
       console.log("map events object");
    events = this.props.general.events.map((event,index)=>{
        console.log("EVENT");
        console.log(event);
        var d1 = moment(event.date);
            

      return (<div className="event" key={index}>

          <div className="eventBanner">
              <div className="eventBannerImage" style={
                  {backgroundImage: 'url("' + event.imageref + '")',
                  backgroundRepeat:"no-repeat",
                  backgroundSize:"cover"
                  
                  }
              }>
               
              </div>
              <div class="eventBannerInfo">
                 <p>{d1.format("MMMM DD")}</p>
                 <h1>{event.title}</h1>
                 <p>By {event.group}</p>
              </div>
              </div>


       <h1>Description</h1>
           <p className="eventDescription">{event.description}</p>

          
       <h1>Date and Time</h1>
       {weekDays[d1.weekday()+1] +", " + d1.format("MMMM DD, YYYY")}
       <h1>Location</h1>
         {event.location}
        <h1>Contact Host</h1>
          <p><span className="eventLabel">Donor Inquiries</span></p>
          <p>{event.donorinfo}</p>
          <p><span className="eventLabel">Volunteer</span></p>
          <p>{event.volunteerinfo}</p>

      </div>)
   })
    
   }


   return (
        

           <div className="events">
             <h1>Event Page</h1>
             <button onClick={(e)=>{this.nextPage()}}>Next Page</button>
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
   getEventPage:getEventPage, 
    getNextEventPage:getNextEventPage
})(ApiEventPage);
