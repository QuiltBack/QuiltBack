import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAdminNotifications} from '../../reducers/generalReducer';
import {Link} from 'react-router-dom';
import moment from 'moment';
import '../../styles/AdminNotifications.css';

class AdminNotifications extends Component {
  constructor() {
    super();
    this.state = {
      loadedNotifications:false,
    }
  }
  componentDidMount() {
    this.getNotifications();
  }
  componentWillReceiveProps() {
    this.getNotifications();
  }
  getNotifications() {
    let interval = setInterval(()=>{
      if (this.props.general && this.props.general.user.user_type==='Admin' && !this.state.loadedNotifications) {
        this.setState({
          loadedNotifications: true,
        })
        this.props.getAdminNotifications()
        clearInterval(interval);
      } else {
        clearInterval(interval);
      }
    },100)
  }
  render() {
    let notifications; 
    if (this.props.general && this.props.general.adminNotifications) {
      notifications = this.props.general.adminNotifications.map((e, i)=>{
        console.log(e)
        let d1 = moment.utc(e.date);
        return (
          <div className='notifications-border' key={i}>
            <div className='notifications-date'>{d1.format("MMMM DD, YYYY, h A")}</div>
            <div className='notifications-title'><Link to={'/blog/' + e.post_id}>{e.post_title}</Link></div>
            <div className='notifications-author'>{e.first_name + ' ' + e.last_name}</div>
            <div className='notifications-decisions'>
              <div className='notifications-approve'>Approve</div>
              <div className='notifications-decline'>Decline</div>
            </div>
          </div>
        )
      })
    }
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

function mapStateToProps(state, ownProps) {
  if (ownProps && ownProps.history && !(state && state.history))
      return Object.assign({}, state, {
          history: ownProps.history
      });
  return state;
}

export default connect(mapStateToProps, {  
  getAdminNotifications: getAdminNotifications,
})(AdminNotifications);