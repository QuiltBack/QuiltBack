import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
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
          <input className='footer-email-address' placeholder='Email Address'/>
          <button className='footer-button-subscribe'>SUBSCRIBE</button>
        </form>
      </div>
      <div className='footer-grid-three'>
        <div className='footer-follow-us'>Follow Us</div>
        <div className='footer-facebook'>F</div>
        <div className='footer-twitter'>T</div>
        <div className='footer-google'>G</div>
      </div>
    </footer>  
  )
}

export default Footer;