import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments,addComment} from '../../reducers/generalReducer';




class Comments extends Component{
constructor(props){
    super(props);
}

 getcomments(props){
    if (props && props.general && props.general.comments){
       props.getComments(props.postid);
   }
 }
 componentWillMount(){
    this.getcomments(this.props);
 }
 componentWillReceiveProps(props){
    this.getcomments(props);
 }
 addcomment(){
     if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id && this.refs.comment_text.value){
        let commentText = this.refs.comment_text.value;
        this.refs.comment_text.value='';
        let comment={
            text:commentText,
            user_id: this.props.general.user.users_id,
            post_id:this.props.postid
            
        }
        console.log("adding comment ")
        console.log(comment);
        this.props.addComment(comment);
     }
 }

render(){
let comments='';
if (this.props && this.props.general && this.props.general.comments){
    comments= this.props.general.comments.map((comment,index)=>
    {
        let date = comment.date;
    
       return (
        <div className="comment">
            <div className="commentHeader">
                <div className="commentUser">
                    {comment.username}
                </div>
                <div className="commentDate">
                    {date}
                </div>
            </div>
            <div className="commentText">
                {comment.text}
            </div>
        </div>



       )
    })
}

let leavecomment='';
if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id){
    leavecomment=(
           <div className="addComment">
           <div className="addCommentHeader">
                 Leave a Comment
             </div>
         <textarea autoFocus="autofocus" rows = "5" cols="50" placeholder="Leae your comment here" ref="addcomment_text" name="addcomment_text">     
         </textarea>
         <button className="redButton">Post</button>
         </div>
    );
}
return (
    <div className="comments">
           <div className="commentsHeader">
              <h1>Comments</h1>
          </div>
          <div className="commentSection">
              {comments}
         </div>
      
             {leavecomment}
          
   

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
    getComments:getComments,
    addComment:addComment
})(Comments);