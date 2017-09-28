import React, {Component} from 'react';
import {TimelineMax, Power4} from 'greensock';
import '../../styles/EventsPage.css';

class EventsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortBy: {
        expanded:false,
        value:'',
        clickable:true,
      },
      distance: {
        expanded:false,
        value:'',
        clickable:true,
      },
      date: {
        expanded:false,
        value:'',
        clickable:true,
      },
    }
  }
  updateForm(form, type) {
    let newType;
    eval('newType=this.state.'+type);
    
    type==='sortBy'?
    this.setState({
      sortBy : {
        expanded:newType.expanded,
        value:form,
        clickable:newType.clickable,
      }
    }): type==='distance'? 
    this.setState({
      distance : {
        expanded:newType.expanded,
        value:form,
        clickable:newType.clickable,
      }
    }):
    this.setState({
      date : {
        expanded:newType.expanded,
        value:form,
        clickable:newType.clickable,
      }
    });

    setTimeout(()=>{
      this.expandForm(type)
    },100)
  }
  expandForm(type) {
    let newType;
    eval('newType=this.state.'+type);

    let tl = new TimelineMax();
    let className = type==='sortBy'? 
    '.events-page-filter-two-options' : type==='distance'? 
    '.events-page-filter-three-options':'.events-page-filter-four-options';
    let height = type==='sortBy'? 
    '137px' : type==='distance'? 
    '197px':'227px';

    type==='sortBy'?
    this.setState({
      sortBy : {
        expanded:newType.expanded,
        value:newType.value,
        clickable: false,
      }
    }): type==='distance'? 
    this.setState({
      distance : {
        expanded:newType.expanded,
        value:newType.value,
        clickable: false,
      }
    }):
    this.setState({
      date : {
        expanded:newType.expanded,
        value:newType.value,
        clickable: false,
      }
    });
      newType.expanded?
      tl.to(className, .5, {height: '0px'}).to(className, 0, {borderWidth:'0px'}):
      tl.to(className, 0, {border: '1px solid #C2C2C2'}).to(className, .5 ,{height: height});

    setTimeout(()=>{
      type==='sortBy'?
      this.setState({
        sortBy : {
          expanded:newType.expanded? false:true,
          value:newType.value,
          clickable: true,
        }
      }): type==='distance'? 
      this.setState({
        distance : {
          expanded:newType.expanded? false:true,
          value:newType.value,
          clickable: true,
        }
      }):
      this.setState({
        date : {
          expanded:newType.expanded? false:true,
          value:newType.value,
          clickable: true,
        }
      });
    },500) 
  }
  render(){
    return (
      <section>
      <div className='events-page-background'>
        <div className='events-page-title'>Events</div>
      </div>
      <div className='events-page-filter'>
        <form className='events-page-filter-one'>
          <div className='events-page-filter-one-find'> Find </div>
          <input className='events-page-filter-one-input-find' placeholder='Ruby Jubilee, Salt Lake City, Silent auction'/>
          <div className='events-page-filter-one-line'/>
          <div className='events-page-filter-one-near'> Near </div>
          <input className='events-page-filter-one-input-near' placeholder='Salt Lake City, UT'/>
          <button className='events-page-filter-one-button'> Search </button>
        </form>
        <div className='events-page-filter-two'>
          <div className='events-page-filter-two-select'>
            <div className='events-page-filter-two-select-name'>{this.state.sortBy.value? this.state.sortBy.value:'Sort By'}</div>
          </div>
          <div className='events-page-filter-two-options'>
            <li onClick={()=>{this.updateForm('Relevance', 'sortBy')}} className='events-page-filter-two-option-one'>Relevance</li>
            <li onClick={()=>{this.updateForm('Newest', 'sortBy')}} className='events-page-filter-two-option-two'>Newest</li>
            <li onClick={()=>{this.updateForm('Type', 'sortBy')}} className='events-page-filter-two-option-three'>Type</li>
          </div>
          <div onClick={(e)=>{this.state.sortBy.clickable?this.expandForm('sortBy'):null}} className='events-page-filter-two-arrow'>V</div>
        </div>
        <div className='events-page-filter-three'>
          <div className='events-page-filter-three-select'>
            <div className='events-page-filter-three-select-name'>{this.state.distance.value? this.state.distance.value:'Distance'}</div>
          </div>
          <div className='events-page-filter-three-options'>
            <li onClick={()=>{this.updateForm('within 10 miles', 'distance')}} className='events-page-filter-three-option-one'>within 10 Miles</li>
            <li onClick={()=>{this.updateForm('within 25 miles', 'distance')}} className='events-page-filter-three-option-two'>within 25 Miles</li>
            <li onClick={()=>{this.updateForm('within 50 miles', 'distance')}} className='events-page-filter-three-option-three'>within 50 Miles</li>
            <li onClick={()=>{this.updateForm('within 100 miles', 'distance')}} className='events-page-filter-three-option-four'>within 100 Miles</li>
            <li onClick={()=>{this.updateForm('within 100+ miles', 'distance')}} className='events-page-filter-three-option-five'>within 100+ Miles</li>
          </div>
          <div onClick={(e)=>{this.state.distance.clickable?this.expandForm('distance'):null}} className='events-page-filter-three-arrow'>V</div>
        </div>
        <div className='events-page-filter-four'>
          <div className='events-page-filter-four-select'>
            <div className='events-page-filter-four-select-name'>{this.state.date.value? this.state.date.value:'Date'}</div>
          </div>
          <div className='events-page-filter-four-options'>
            <li onClick={()=>{this.updateForm('Today', 'date')}} className='events-page-filter-four-option-one'>Today</li>
            <li onClick={()=>{this.updateForm('This Week', 'date')}} className='events-page-filter-four-option-two'>This Week</li>
            <li onClick={()=>{this.updateForm('Last Week', 'date')}} className='events-page-filter-four-option-three'>Last Week</li>
            <li onClick={()=>{this.updateForm('This Month', 'date')}} className='events-page-filter-four-option-four'>This Month</li>
            <li onClick={()=>{this.updateForm('Last Month', 'date')}} className='events-page-filter-four-option-five'>Last Month</li>
            <li onClick={()=>{this.updateForm('This Year', 'date')}} className='events-page-filter-four-option-six'>This Year</li>
          </div>
          <div onClick={(e)=>{this.state.date.clickable?this.expandForm('date'):null}} className='events-page-filter-three-arrow'>V</div>
        </div>
      </div>
      </section>
    )
  }
}
export default EventsPage;