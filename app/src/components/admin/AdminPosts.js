import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/AdminPosts.css';
import {getAdminPosts} from '../../reducers/generalReducer';

class AdminPosts extends Component {
    constructor() {
        super();
        this.state = {
          loadedPosts:false,
        }
      }
    componentDidMount() {
        this.getPosts();
      }
      componentWillReceiveProps() {
        this.getPosts();
      }
      getPosts() {
        let interval = setInterval(()=>{
          if (this.props.general && this.props.general.user.user_type==='Admin' && !this.state.loadedPosts) {
            this.setState({
              loadedPosts: true,
            })
            console.log('getting posts')
            this.props.getAdminPosts()
            clearInterval(interval);
          } else {
            clearInterval(interval);
          }
        },100)
      }
      render() {
        let posts;
        if (this.props.general && this.props.general.adminPosts) {
          posts = this.props.general.adminPosts.map((e, i)=>{
            console.log(e)
            return (
              <div className='posts-border' key={i}>
                <div className='posts-author'>{e.first_name + ' ' + e.last_name}</div>
                <div className='posts-email'>{e.email}</div>
                <div className='posts-role'>{e.user_type}</div>
                <div className='posts-post'>{e.post_count}</div>
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
        {posts}
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
   getAdminPosts: getAdminPosts,
  })(AdminPosts);