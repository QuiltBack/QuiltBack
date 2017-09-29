import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEventDetail} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';
import './ApiEvents.css';



const moment = require('moment');


class ApiEventDetail extends Component{



eventdetails()
{
    console.log("GET EVENT DETAIL")

  if (this.props && this.props.getEventDetail && this.props.general ) {
    
    console.log("dEBUG 1");   
      if (! this.props.general.eventDetail && this.props.match.params.eventId){
          console.log("TRYING TO GET DEATAIL FOR event " +this.props.match.params.eventId)
          this.props.getEventDetail(this.props.match.params.eventId);
      }
    }
}

componentDidMount() {
    this.eventdetails();
}
componentWillReceiveProps(ownProps) {  
    this.eventdetails();
}

 render(){
  
   let eventDetail='';
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

   if (this.props && this.props.general.eventDetail ){
       
        
     console.log("debug b");
            let event=this.props.general.eventDetail;
   let d1 = moment.utc(event.date);
     eventDetail=(<div className="event">

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

      </div>);
 
    
   }


   return (
        

           <div className="events">
             <h1>Event</h1>
             {eventDetail}
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
   
    getEventDetail:getEventDetail
})(ApiEventDetail);
