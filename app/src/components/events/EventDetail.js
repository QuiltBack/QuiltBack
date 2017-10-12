import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TimelineMax, Power4} from 'greensock'
import {getEventDetail, getEvents} from '../../reducers/generalReducer';
import {Link} from 'react-router-dom';
import {ShareButtons, generateShareIcon} from 'react-share';
import './EventDetail.css';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const EmailIcon = generateShareIcon('email');
const moment = require('moment');
const frontenv = require('../../frontenv.js');

/* not yet used
const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;

*/

class EventDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            item:0,
            numberOfEvents:4
        }
        this.nextItem=this.nextItem.bind(this);
        this.prevItem=this.prevItem.bind(this);
    }

    nextItem(){
        let item = this.state.item +1;
        this.setState({
            item:item
        });
    }

    prevItem(){
        let item = this.state.item -1;
        this.setState({
            item:item
        });
    }

    eventdetails() {
        if (this.props && this.props.getEventDetail && this.props.general) {
            if (this.props.match.params.eventId && (!this.props.general.eventDetail || this.props.general.eventDetail.eventid !== +this.props.match.params.eventId)) {  
                this.props.getEventDetail(this.props.match.params.eventId);
                this.props.getEvents();
            }
        }
    }

    componentDidMount() {
  
        let tl = new TimelineMax();
        tl.to(window, .5, {scrollTo:0, ease:Power4.easeOut})
        this.eventdetails(this.props);
    }

    componentWillReceiveProps(ownProps) {
        this.eventdetails(ownProps);
    }

    render() {
     console.log(this);
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
        
        if (this.props && this.props.general.eventDetail) {    
            shareUrl = `${frontenv.REACT_APP_HOST}/event/` + this.props.match.params.eventId;
            title = this.props.general.eventDetail.title;
            event = this.props.general.eventDetail;
            location = event.address;
            catalogue = JSON.parse(event.catalogue);
            if(!catalogue)
            catalogue=[];
            if (catalogue.length > 0) {
                //Take n + abs(np)
                let item = (this.state.item + Math.abs(this.state.item * catalogue.length)) % catalogue.length;    
                mainItem=catalogue[item];     
            }
            if (location && event.city) {
                location = location + ", " + event.city;
            } else {
                location = event.city;
            } 
            if (location && event.state) {
                location = location + ", " + event.state;
            } else {
                location = event.state;
            }
            if (location && event.zipcode) {
                location = location + " " + event.zipcode;
            } else {
                location = event.zipcode;
            }    
            let d1 = moment.utc(event.date);
            let displayEvents='';
            if (this.props && this.props.general.events ){
                this.props.general.events.sort((a, b)=>{
                    let date1 = new Date(a.date);
                    let date2 = new Date(b.date);
                    return (date2 - date1);
                })
                displayEvents = this.props.general.events.map((e, i)=>{
                    let d1 = moment.utc(e.date);
                  
                    return i<(this.state.numberOfEvents)?(
                        <Link to={'/event/'+e.eventid} className='event-details-recent-events-container'>
                            <div className="event-details-recent-events-image" 
                                style={{
                                    backgroundImage: 'url("' + e.imageref + '")',
                                    backgroundRepeat:"no-repeat",
                                    backgroundPosition: "center center",
                                    backgroundSize:"cover",
                                    height:'125px',
                                    width:'125px',
                                }}/>
                            <div className='event-details-recent-events-info' to={'/event/'+e.eventid}>
                                <div className='event-details-recent-events-date'>{d1.format("MMMM DD, YYYY")}</div>
                                <div className='event-details-recent-events-title'>{e.title}</div>
                            </div>
                        </Link>
                    ) : null
                })
            }
            eventDetail = (
                <section className="event-details-section">
                    <div className="event-details-banner-container">
                        <div className="event-details-banner-image" style={{
                            backgroundImage: 'url("' + event.imageref + '")',
                            backgroundRepeat:"no-repeat",
                            backgroundPosition: "center center",
                            backgroundSize:"cover",
                            }}>
                        </div>
                        <div className="event-details-banner-info">
                            <div className="event-details-banner-date">{d1.format("MMMM DD")}</div>
                            <div className="event-details-banner-title">{event.title}</div>
                            <div className="event-details-banner-host">By {event.host}</div>
                        </div>
                    </div>
                    <div className="event-details-main-container">
                        <div className="event-details-left-container">   
                            <h1 className='event-details-description-title'>Description</h1>
                            <div className='event-details-description-text'>{event.description}</div>
                            <h1 className='event-details-catalogue-title'>Catalogue</h1>
                            <div className='event-details-catalogue-container'>
                                <div className='event-details-catalogue-top-container'>
                                    <img className='event-details-catalogue-top-image' src={mainItem.image_uri} width="100%" height="516px" alt="Catalogue"/>
                                    <div className='event-details-catalogue-top-left-arrow' onClick={this.prevItem}>{'<'}</div>
                                    <div className='event-details-catalogue-top-right-arrow' onClick={this.nextItem}>{'>'}</div>
                                    <div className="event-details-catalogue-top-banner">
                                        <div className='event-details-catalogue-top-banner-name'>{mainItem.Name}</div>
                                        <div className="event-details-catalogue-top-banner-detail-id">ITEM # {mainItem.AuctionId}</div>
                                    </div>
                                </div>
                                <div className='event-details-catalogue-bottom-container'>
                                </div>
                            </div>
                            <div className="event-details-share-container">
                                <h1 className='event-details-share-title'>Share this Event</h1>
                                <div className='event-details-share-buttons'>
                                    <FacebookShareButton className="event-details-facebook-button" url={shareUrl} quote={title}>
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton className="event-details-twitter-button" url={shareUrl} quote={title}> 
                                        <TwitterIcon size={40} round />
                                    </TwitterShareButton>
                                    <GooglePlusShareButton className="event-details-google-button" url={shareUrl} quote={title}> 
                                        <GooglePlusIcon size={40} round />
                                    </GooglePlusShareButton>
                                    <EmailShareButton className="event-details-email-button" url={shareUrl} subject={title} body="body"> 
                                        <EmailIcon size={40} round />
                                    </EmailShareButton>
                                </div>
                            </div>          
                        </div>    
                        <div className="event-details-right-container">
                            <h1 className='event-details-right-container-date-title'>Date and Time</h1>
                            <div className='event-details-right-container-date-day'>{weekDays[d1.weekday()+1] +", " + d1.format("MMMM DD, YYYY")}</div>
                            <div className='event-details-right-container-date-time'>{d1.format("h A")}</div>
                            <h1 className='event-details-right-container-location-title'>Location</h1>
                            <div className='event-details-right-container-location-text'>{location}</div>
                            <h1 className='event-details-right-container-contact-title'>Contact Host</h1>
                            <div className='event-details-right-container-donor'>Donor Inquiries<br/>{event.donorinfo}<br/></div>
                            <div className='event-details-right-container-volunteer'>Volunteer<br/>{event.volunteerinfo}</div>
                            <h1 className='event-details-right-container-recent-title'>Related Events</h1>
                            <div className='event-details-right-container-recent-events'>{displayEvents}</div>
                        </div>
                    </div>
                </section>
            );
        }
        return (
            <section className='event-detail-main-section'>
                {eventDetail}
            </section>  
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
    getEventDetail:getEventDetail,
    getEvents:getEvents,
})(EventDetail);
