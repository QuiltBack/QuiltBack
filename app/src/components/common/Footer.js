import React from 'react';
import {Component} from 'react';
import '../../styles/Footer.css';

import {apiAddSubscriber} from '../../services/apiServices.js';

export default class Footer extends Component{
constructor(props){
  super(props);
  this.newSubscriber=this.newSubscriber.bind(this);
  
}
newSubscriber(e){
  e.preventDefault();

  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.refs.subscriberEmail.value))
  {
    
    apiAddSubscriber(this.refs.subscriberEmail.value).then(response=>{
     alert("Thanks for subscribing");  
    });
    
  }
  else{
    
    alert('bad email');
  }
  this.refs.subscriberEmail.value='';
}
  render(){
    return (
    <footer className='main-footer-container'>
      <div className='footer-grid-one'>
        <div className='footer-question'>Have a question? Comment?</div>
        <button className='footer-contact'>CONTACT US</button>
        <div className='footer-copyright'>QuiltBack is a 501(c)(3) not-for-profit organization. Copyright QuiltBack, 2017.</div>
      </div>
      <div className='footer-grid-two'>
        <div className='footer-stay-connected'>Stay Connected</div>
        <div className='footer-receive-emails'>Receive e-mails when a new event is hosted or a new blog posted.</div>
        <form className='footer-form'>
          <input className='footer-email-address' ref="subscriberEmail" placeholder='Email Address'/>
          <button className='footer-button-subscribe' onClick={this.newSubscriber}>SUBSCRIBE</button>
        </form>
      </div>
      <div className='footer-grid-three'>
        <div className='footer-follow-us'>Follow Us</div>
        <div className='footer-facebook'/>
        <div className='footer-pinterest'/>
        <div className='footer-instagram'/>
      </div>
    </footer>  
   )
  }
}



