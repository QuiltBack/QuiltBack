import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsersEvents} from '../../reducers/generalReducer';
import PromoteIcon from '../../styles/images/home/Promote_Image.svg';
import moment from 'moment';
import '../../styles/UserEvents.css';

class UserEvents extends Component {
  constructor() {
    super();
    this.state = {
      loadedEvents:false,
      numberOfEvents:6,
    }
  }
  componentDidMount() {
    this.fillPage();
  }
  componentWillReceiveProps() {
    this.fillPage();
  }
  fillPage() {
    if (this.props.general && this.props.general.user && !this.state.loadedEvents) {
      this.setState({
        loadedEvents:true
      })
      this.props.getUsersEvents(this.props.general.user.users_id);
    }
  }
  render() {
    let userEventList = (
      <section className='user-events-empty'>
        <div className='user-events-container'>
          <img className='user-events-promote-icon' src={PromoteIcon}/> 
          <div className='user-events-text'>No Events Found</div> 
          <button className='user-events-button'>Add New Event</button> 
        </div>
      </section>
    );
    if (this.props.general && this.props.general.events) {
      let props = this.props;
      userEventList = props.general.events.map((e, i)=>{
        let d1 = moment.utc(e.date);
        return i<(this.state.numberOfEvents)? ( 
          <section className='user-events-filled'>
            <div className="user-events-events"   key={i}>
              <div className="user-events-banner"/>
              <div className="user-events-info">
                <div className='user-events-date'>{d1.format("MMMM DD, YYYY ")}</div>
                <div className='user-events-title-filled'>{ 40 > e.title.length? 
                  e.title : (e.title).substring(0, 40) + '...'}
                </div>
                <div className='user-events-owner'>hosted by {props.general.user.first_name + ' '} {props.general.user.last_name}</div>
              </div>
            </div>
            <div className='user-events-view-container'>
              <div className='user-events-view-view'>View</div>
              <div className='user-events-view-delete'>Delete</div>
            </div>
          </section>
        ) : null
      })
    }
    return (
      <section className='user-events-section'>
        <div className='user-events-title'>MY EVENTS</div>
        <div className='user-events-filled-container'>{userEventList}</div>
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
  getUsersEvents: getUsersEvents,
})(UserEvents);