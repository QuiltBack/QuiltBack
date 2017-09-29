import React , { Component} from 'react';
import {addSubscriber} from '../../reducers/generalReducer'
import {connect} from 'react-redux';

class ApiNewsLetter extends Component{

sendNewSubscriber(){
 console.log("adding " +this.refs.subscriber.value);
 this.props.addSubscriber(this.refs.subscriber.value);
}
    render(){
return (
  <div className='row'>
        <div className='col-sm-12'>
          <label>Add Subscriber</label>
       
            <input type="text" ref="subscriber" />
            <button className="btn btn-primary" onClick={(e)=>this.sendNewSubscriber()}>Subscribe</button>
          
        
        </div>
      </div>
);

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
    addSubscriber:addSubscriber
})(ApiNewsLetter);

