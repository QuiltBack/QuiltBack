import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsersEvents} from '../../reducers/generalReducer';
import {Link} from 'react-router-dom';
import PromoteIcon from '../../styles/images/home/Promote_Image.svg';
import moment from 'moment';
import '../../styles/UserEvents.css';

class UserEvents extends Component {
  constructor() {
    super();
    this.state = {
      loadedEvents:false,
      numberOfEvents:10,
    }
  }
  componentDidMount() {
  console.log('mounted component');
  this.fillPage();
}
componentWillReceiveProps() {
  console.log('received props');
  this.fillPage();
  }
  fillPage() {
    let interval = setInterval(()=>{
      if (this.props.general && this.props.general.user.users_id && !this.state.loadedEvents) {
        this.updatePage();
        clearInterval(interval);
      } else {
        clearInterval(interval);
      }
    },100)
  }
  updatePage() {
    console.log('filled page')
    this.setState({
      loadedEvents:true
    })
      this.props.getUsersEvents(this.props.general.user.users_id)
  }
  render() {
    let userEventList = (<section className='user-events-empty'>
    <div className='user-events-container'>
      <img className='user-events-promote-icon' src={PromoteIcon} alt="Promote"/> 
      <div className='user-events-text'>No Events Found</div> 
      <Link to={'/createEvent/new'} className='user-events-button'>Add New Event</Link> 
    </div>
  </section>)
    if (this.props.general && this.props.general.userEvents && this.props.general.userEvents.length > 0) {
      let props = this.props;
      userEventList = props.general.userEvents.map((e, i)=>{
        console.log(e)
        let d1 = moment.utc(e.date)
        return i<(this.state.numberOfEvents)? ( 
          <section className='user-events-filled'>
            <div className="user-events-events"   key={i}>
              <div className="user-events-banner" style={{
                      backgroundImage: "url(" + e.imageref + ")",
                      backgroundSize: "cover",
                      backgroundRepeat:"no-repeat",
                      backgroundPosition:'center center'
                    }}/>
              <div className="user-events-info">
                <div className='user-events-date'>{d1.format("MMMM DD, YYYY ")}</div>
                <div className='user-events-title-filled'>{ 40 > e.title.length? 
                  e.title : (e.title).substring(0, 40) + '...'}
                </div>
                <div className='user-events-owner'>hosted by {e.host}</div>
              </div>
            </div>
            <div className='user-events-view-container'>
              <Link to={'/event/' + e.eventid} className='user-events-view-view'>View</Link>
              <div className='user-events-view-delete'>Delete</div>
            </div>
          </section>
        ) : null
      })
    }
    return (
      <section className='user-events-section'>
        <div className='user-events-title'>MY EVENTS</div>
        <div className='user-events-filled-container'>
          {this.props.general.userEvents?(<Link to='/createEvent/new' className='user-events-button-2'>Add New Event</Link>):null}
          {userEventList}
        </div>
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
