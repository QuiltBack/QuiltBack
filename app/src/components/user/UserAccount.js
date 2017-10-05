import React, {Component} from 'react';
import '../../styles/UserAccount.css';

class UserAccount extends Component {
  componentDidMount() {
    if (this.props.general && this.props.general.user) {

    }
  }
  render() {
    let userAccount;
    userAccount = (
      <div className='user-account-container'>
        <div className='user-account-left-container'>
          <div className='user-account-left-profile-image'>

          </div>
          <div className='user-account-left-username'>Username</div>
        </div>
        <div className='user-account-right-container'>
          
          <div className='user-account-right-nickname'>Nickname</div>
          <div className='user-account-right-email'>Contact Email</div>
          <div className='user-account-right-number'>Contact Number</div>
          <div className='user-account-right-edit'>EDIT ACCOUNT INFORMATION</div>
          <input className='user-account-right-input-nickname' placeholder='Nickname'/>
          <input className='user-account-right-input-contact-email' placeholder='email@email.com'/>
          <input className='user-account-right-input-contact-number' placeholder='(123)-456-7890'/>
          
        </div>
      </div>
    )
    return (
      <section className='user-account-section'>
        <div className='user-account-title'>ACCOUNT SETTINGS</div>
        {userAccount}
      </section>
    )
  }
}

export default UserAccount;