import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEventDetail} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';
import './EventDetail.css';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';


const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const EmailIcon = generateShareIcon('email');


const moment = require('moment');


class EventDetail extends Component{

constructor(props){
    super(props);
    this.state={
        item:0
    }
    this.nextItem=this.nextItem.bind(this);
    this.prevItem=this.prevItem.bind(this);
}
nextItem(){
    let item = this.state.item +1;
    this.setState({item:item});
}
prevItem(){
      let item = this.state.item -1;
    this.setState({item:item});
}


eventdetails()
{


  if (this.props && this.props.getEventDetail && this.props.general ) {
    

      if (  this.props.match.params.eventId && (!this.props.general.eventDetail || this.props.general.eventDetail.eventid != this.props.match.params.eventId)){
        
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
   

let mainItem='';
let title='';
let shareUrl='';
let event='';
let location='';
let catalogue='';
   if (this.props && this.props.general.eventDetail ){
       
        
            shareUrl="http://localhost:3000/event/" + this.props.match.params.eventId;
            title=this.props.general.eventDetail.title;
 
             event=this.props.general.eventDetail;
             location =event.address;
             catalogue = JSON.parse(event.catalogue);
             if(!catalogue)
             catalogue=[];


            if (catalogue.length>0)
            {
                console.log("state item " +this.state.item)
                //Take n + abs(np)
                let item = (this.state.item + Math.abs(this.state.item * catalogue.length)) % catalogue.length;
                
        
                
                 mainItem=catalogue[item];
                 
            }

            if (location &&  event.city) location = location + ", " + event.city;
            else location = event.city;

            if (location &&  event.state) location = location + ", " + event.state;
            else location = event.state;
            if (location &&  event.zipcode) location = location + " " + event.zipcode;
            else location = event.zipcode;
            
            
        
           
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
              <div className="eventBannerInfo">
                 <div className="eventBannerDate">{d1.format("MMMM DD")}</div>
                 <div className="eventBannerTitle">{event.title}</div>
                 <div className="eventBannerHost">By {event.host}</div>
              </div>
          </div>

<div className="eventMainSection">
   <div className="eventLeftSection">   
 
       <h1>Description</h1>
           <p>{event.description}</p>
        <h1>Catalogue</h1>
        <div className="eventDetailCatalogueImages">
            <div onClick={this.prevItem} className="eventDetailCataloguePrevious">&lt;</div>
            <div className="eventCatalogueMainImage"><img src={mainItem.image_uri} width="100%" height="400px"/></div>
            <div onClick={this.nextItem} className="eventDetailCatalogueNext">&gt;</div>
        </div>
        <div className="eventDetailCatalogueBanner">
            <div className="eventDetailName">{mainItem.Name}</div>
            <div className="eventDetailAuctionId">Item # {mainItem.AuctionId}</div>
        </div>
        <div className="EventShare">
        <h1>Share this Event</h1>

    <div className='eventdetail-page-social-media'>


              <div className='eventdetail-page-facebook'>
           
         <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <FacebookIcon
              size={40}
              round />
          </FacebookShareButton>
              </div>
              <div className='eventdetail-page-twitter'>
               <TwitterShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <TwitterIcon
              size={40}
              round />

          </TwitterShareButton>

              </div>
              <div className='eventdetail-page-google'>
                <GooglePlusShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <GooglePlusIcon
              size={40}
              round />

          </GooglePlusShareButton>
                </div>
              <div className='eventdetail-page-email'>
              <EmailShareButton
             url={shareUrl}
            subject={title}
            body="body"
            className="share-button">
            <EmailIcon
              size={40}
              round />

          </EmailShareButton>
              </div>
            </div>
        
        
        </div>


    </div>
    <div className="eventRightSection">
       <h1>Date and Time</h1>
       <p>{weekDays[d1.weekday()+1] +", " + d1.format("MMMM DD, YYYY")}</p>
       <p>{d1.format("h A")}</p>
       <h1>Location</h1>
         {location}
        <h1>Contact Host</h1>
          <p><span className="eventLabel">Donor Inquiries</span></p>
          <p>{event.donorinfo}</p>
          <br/>
          <p><span className="eventLabel">Volunteer</span></p>
          <p>{event.volunteerinfo}</p>
          <h1>Related Events</h1>
      </div>
      </div>
      </div>
      
      );
 
    
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
})(EventDetail);
