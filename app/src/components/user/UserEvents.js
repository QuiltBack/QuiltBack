import React, {Component} from 'react';
import {connect} from 'react-redux';
import PromoteIcon from '../../styles/images/home/Promote_Image.svg';
import '../../styles/UserEvents.css';

class UserEvents extends Component {
  componentDidMount() {
    if (this.props.general && this.props.general.user) {

    }
  }
  render() {
    let userEventList;
    userEventList = (
      <div className='user-events-container'>
        <img className='user-events-promote-icon' src={PromoteIcon}/> 
        <div className='user-events-text'>No Events Found</div> 
        <button className='user-events-button'>Add New Event</button> 
      </div>
    )
    return (
      <section className='user-events-section'>
        <div className='user-events-title'>MY EVENTS</div>
        {userEventList}
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
  
})(UserEvents);