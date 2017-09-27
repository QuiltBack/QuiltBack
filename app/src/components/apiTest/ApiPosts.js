import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';



class ApiPosts extends Component{

constructor(props){
  super(props);
  console.log("creating api posts");
}

componentDidMount() {

    if (this.props && this.props.getPosts && this.props.general ) {
      if (this.props.general.posts.length < 1){
        this.props.getPosts();
      }
      
    }
    

}
componentWillReceiveProps(ownProps) {
   
    if (this.props && this.props.getPosts && this.props.general ) {
      if (this.props.general.posts.length < 1){
        this.props.getPosts();
      }
     
    }
    

}

 render(){
   let posts='';
   
   console.log(this.props);
   console.log("general");
   console.log(this.props.general);
   console.log(this.props.general.posts);
   if (this.props && this.props.general.posts ){
  
    posts = this.props.general.posts.map((post,index)=>{
      console.log(post);
      return (<div className="post" key={index}>
          
           <h1>{post.post_title}</h1>
           <p>{post.post_text}</p>

      </div>)
   })
    
}


   


   return (
      

           <div className="posts">
             <h1>posts</h1>
             {posts}
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
})(ApiPosts);
