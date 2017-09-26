import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';



class ApiTest extends Component{
componentDidMount() {

    if (this.props && this.props.getPosts && this.props.general && this.props.general.posts.length < 1) {

        this.props.getPosts();
    }

}
componentWillReceiveProps(ownProps) {
    if (this.props && this.props.getPosts && this.props.general && this.props.general.posts.length < 1) {


        this.props.getPosts();
    }

}

 render(){
   let posts='';
   if (this.props && this.props.general.posts){
    posts = this.props.general.posts.map((post,index)=>{
      return (<div className="post" key={index}>
          
           <h1>{post.post_title}</h1>
           <p>{post.post_text}</p>

      </div>)
   })
    
   }
   return (
        <div className="apiTest">

           <div className="posts">
             <h1>Posts</h1>
             {posts}
           </div>
        </div>
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
    getPosts: getPosts
})(ApiTest);
