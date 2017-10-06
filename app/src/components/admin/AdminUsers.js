import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/AdminUsers.css';
import {getAdminUsers} from '../../reducers/generalReducer';

class AdminUsers extends Component {
    constructor() {
        super();
        this.state = {
          loadedUsers:false,
        }
      }
    componentDidMount() {
        this.getUsers();
      }
      componentWillReceiveProps() {
        this.getUsers();
      }
      getUsers() {
        let interval = setInterval(()=>{
          if (this.props.general && this.props.general.user.user_type==='Admin' && !this.state.loadedUsers) {
            this.setState({
              loadedUsers: true,
            })
            console.log('getting users')
            this.props.getAdminUsers()
            clearInterval(interval);
          } else {
            clearInterval(interval);
          }
        },100)
      }
      render() {
        let users;
        if (this.props.general && this.props.general.adminUsers) {
          users = this.props.general.adminUsers.map((e, i)=>{
            console.log(e)
            return (
              <div className='users-border' key={i}>
                <div className='users-author'>{e.first_name + ' ' + e.last_name}</div>
                <div className='users-email'>{e.email}</div>
                <div className='users-role'>{e.user_type}</div>
                <div className='users-post'>{e.post_count}</div>
              </div>
            )
          })
        }
    return (
      <section className='users-section'>
        <div className='users-tab'>
          <div className='users-tab-pending'>Pending Review</div>
          <div className='users-tab-approved'>Approved</div>
          <div className='users-tab-declined'>Declined</div>
        </div>
        <div className='users-title-container'>
          <div className='users-title-username'>USERNAME</div>
          <div className='users-title-email'>EMAIL</div>
          <div className='users-title-role'>ROLE</div>
          <div className='users-title-post'>POST</div>
        </div>
        {users}
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
   getAdminUsers: getAdminUsers,
  })(AdminUsers);