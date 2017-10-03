import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShareIcon from '../../styles/images/home/Share_Image.svg';
import '../../styles/UserPosts.css';

class UserPosts extends Component {
  render() {
    let userPostsList;
    userPostsList = (
      <div className='user-posts-container'>
        <img className='user-posts-share-icon' src={ShareIcon}/> 
        <div className='user-posts-text'>No Posts Found</div> 
        <button className='user-posts-button'>New Post</button> 
      </div>
    )
    return (
      <section className='user-posts-section'>
        <div className='user-posts-title'>MY BLOG</div>
        {userPostsList}     
      </section>
    )
  }
}

export default connect()(UserPosts)