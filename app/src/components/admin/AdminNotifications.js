import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/AdminNotifications.css';

class AdminNotifications extends Component {
  render() {
    let notifications;
    notifications = (
      <div className='notifications-border'>
        <div className='notifications-date'>Date</div>
        <div className='notifications-title'>Title</div>
        <div className='notifications-author'>Author</div>
        <div className='notifications-decisions'>
          <div className='notifications-approve'>Approve</div>
          <div className='notifications-decline'>Decline</div>
        </div>
      </div>
    )
    return (
      <section className='notifications-section'>
        <div className='notifications-tab'>
          <div className='notifications-tab-pending'>Pending Review</div>
          <div className='notifications-tab-approved'>Approved</div>
          <div className='notifications-tab-declined'>Declined</div>
        </div>
        <div className='notifications-title-container'>
          <div className='notifications-title-date'>DATE</div>
          <div className='notifications-title-blog-post'>BLOG POST</div>
          <div className='notifications-title-author'>AUTHOR</div>
          <div className='notifications-title-action'>ACTIONS</div>
        </div>
        {notifications}
      </section>
    )
  }
}
export default connect()(AdminNotifications);