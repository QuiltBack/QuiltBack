import React, {Component} from 'react';
import {bindAll} from 'lodash';
import axios from "axios";
import Dropzone from 'react-dropzone';

import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import './ApiCreateEvent.css';
import 'font-awesome/css/font-awesome.min.css';
class ApiCreateEvent extends Component{

constructor(props) {
      super(props);
      let initialDate=moment();
     initialDate._d.setMinutes(20);
   this.state={
       eventid:null,
       uploaded_uri:'',
       date:initialDate,
       showDate:false,
       dateSelected:false,
       title:'',
       editTitle:false,
       editHost:false,
       host:'',
       editDescription:false,
       description:'',
       editCatalogue:false,
       catalogue:[],
       catalogueItemId:null,
       catalogueImage_uri:'',
       catalogueItemName:'',
       catalogueitemAuctionId:'',
       editCatalogueItemName:false,
       editCatalogueItemAuctionId:false,
       editVolunteer:false,
       editDonor:false,
       volunteer:'',
       donor:'',
   };
   
     bindAll(this, 'addCatalogueItemAuctionId','addCatalogueItemName','editCatalogueItemAuctionId'
     ,'editCatalogueItemName','editDescription','addDescription'
     ,'editHost','addHost','editTitle','addTitle'
     ,'editDonor','editVolunteer','addDonor','addVolunteer',
     'onDateChange','showDate', 'handleFile');
}
editDonor(){
    this.setState({editDonor:true})
}
editVolunteer(){
    console.log("set editVolunteer")
    this.setState({editVolunteer:true})
}
addDonor(){
   
   console.log("addDonor");
   console.log(this.refs.donor.value);
    this.setState({editDonor:false,donor:this.refs.donor.value})
}
addVolunteer(){
    this.setState({editVolunteer:false,volunteer:this.refs.volunteer.value});
}

addCatalogueItemAuctionId(){
    console.log("add ItemAuctionId")
    this.setState({editCatalogueItemAuctionId:false,catalogueItemAuctionId:this.refs.catalogueItemAuctionId.value})
}
addCatalogueItemName(){
    console.log("add ItemName")
    this.setState({editCatalogueItemName:false,catalogueItemName:this.refs.catalogueItemName.value})
}


editCatalogueItemName(){
    console.log("edit ItemName");
    this.setState({editCatalogueItemName:true});
}
editCatalogueItemAuctionId(){
    console.log("edit ItemAuctionId")
    this.setState({editCatalogueItemAuctionId:true});
}

editDescription(){
    console.log("editing description??")
    this.setState({editDescription:true})
}
addDescription(){
    this.setState({editDescription:false,description:this.refs.description.value})
}
editHost(){
    console.log("start edit");
    this.setState({editHost:true});
}
addHost(){
    this.setState({editHost:false,host:this.refs.host.value});
}
editTitle(){
    this.setState({editTitle:true});
}
addTitle(){
    
    console.log('ADDING TITLE')
    this.setState({editTitle:false,title:this.refs.title.value});
}
showDate(){
    let initialDate=this.state.date;
    initialDate._d.setMinutes(20);
    this.setState({showDate:true,date:initialDate});
    
}


handleFile(fileArray) {
    let that=this;
    const reader = new FileReader();
    const file = fileArray[0];
 
   this.setState({
      processing: true
    });
    reader.onload = (upload) => {



let fileType=upload.currentTarget.result.replace(/data:([^;]*);.*$/,"$1");
        let pic={
            imageBody:upload.currentTarget.result,
            imageName: file.name,
            imageExtension: fileType
   }
  

 axios.post('http://localhost:3001/api/upload',{pic:pic})
    .then(function(data){
        that.setState({uploaded_uri:data.data.Location})
    })
    .catch(err=>{
        console.log("UPLOAD ERROR");
        console.log(err);
    })

    };

    reader.readAsDataURL(file);
  }

onDateChange(date){
    let shouldShowDate=false;
   
   
    if (date._d.getMinutes() !== 30 && date._d.getMinutes()!==0){
        
         shouldShowDate=true;
       
    }
    
 
    if (!shouldShowDate) this.setState({date:date,showDate:shouldShowDate,dateSelected:true});
    else this.setState({date:date,showDate:shouldShowDate,dateSelected:false});

}

render(){
let processing="";
let imageStyle={};

/*
catalogueItemName:'',
       catalogueitemAuctionId:''
       */

let catalogueItemNameElement=(
    <div className="catalogueItemName staticColor" onClick={this.editCatalogueItemName}>Item Name</div>
        
);
if (this.state.catalogueItemName){
    console.log("debug1A")
    console.log(this.state.catalogueItemName)

    catalogueItemNameElement=( <div className="catalogueItemName staticColor" onClick={this.editCatalogueItemName}>
        {this.state.catalogueItemName}</div>); 

     console.log(catalogueItemNameElement);     
}

if (this.state.editCatalogueItemName){
    console.log("editing Item Name")
    catalogueItemNameElement=(
        <div className="catalogueItemName"><input autoFocus="autofocus" defaultValue={this.state.catalogueItemName} type="text" ref="catalogueItemName" />
        <button className="redButton" onClick={this.addCatalogueItemName}>Done</button>
        </div>
    )
}

console.log("debug1AA")

let catalogueItemAuctionIdElement=(
    <div className="catalogueItemAuctionId staticColor" onClick={this.editCatalogueItemAuctionId}>Auction ID</div>
 );

if (this.state.catalogueItemAuctionId){
    console.log("debug1B")
      catalogueItemAuctionIdElement=(
    <div className="catalogueItemAuctionId staticColor" onClick={this.editCatalogueItemAuctionId}>{this.state.catalogueItemAuctionId}</div>
    );
}

if (this.state.editCatalogueItemAuctionId){
    console.log("editing Item AuctionId")
    catalogueItemAuctionIdElement=(
        <div className="catalogueItemAuctionId"><input autoFocus="autofocus" defaultValue={this.state.catalogueItemAuctionId} type="text" ref="catalogueItemAuctionId" />
        <button className="redButton" onClick={this.addCatalogueItemAuctionId}>Done</button>
        </div>
    )
}


console.log("debug1AB")

if (this.state.uploaded_uri) {
  
     imageStyle={
         backgroundImage:"url('" + this.state.uploaded_uri + "')",
         backgroundRepeat:"no-repeat",
         backgroundSize:"100% 100%"
       }
    
    }
  let descriptionElement=(
      <div className="eventDescription staticColor" onClick={this.editDescription}>Describe your event...</div> 

  )

  if (this.state.description){
      descriptionElement=(
          <div className="eventDescription staticColor" onClick={this.editDescription}>{this.state.description}</div>);
  }

  if (this.state.editDescription){
     
      descriptionElement=(<div className="eventDescription">
         
         <textarea autoFocus="autofocus" rows = "5" cols="50" ref="description" name="description">
            {this.state.description}
         </textarea>
         <br/>

      <button onClick={this.addDescription} className="redButton">Done</button>
      </div>)
  }
    let hostingGroupElement=(
        <div onClick={this.editHost} className="eventHost staticColor">Hosted by ....?</div>
    )

if (this.state.host){

        hostingGroupElement=(
            <div onClick={this.editHost} className="eventHost staticColor">{this.state.host}</div>
        )
    }


    if (this.state.editHost){

        hostingGroupElement=(
            <div className="eventHost">
                <div className="eventLabel">Host</div>
                <input className="hostEdit" autoFocus="autofocus" defaultValue={this.state.host} ref="host" type="text" />
                <button className="redButton" onClick={this.addHost}>Done</button>
            </div>

        )

    }
    
    
      let titleElement=(
          <div className="eventTitle staticColor staticSizeLarge" onClick={this.editTitle}>Event title</div>);
      if (this.state.title){
        titleElement=(
          <div className="eventTitle staticColor staticSizeLarge" onClick={this.editTitle}>{this.state.title}</div>);
      }
      console.log("this.state.editTitle is " + this.state.editTitle)
      if (this.state.editTitle){
           titleElement=(
              <div className="eventTitle">
                  <span className="inputLabel">Title</span>
              <input type="text"  autoFocus="autofocus" defaultValue={this.state.title} className="titleEdit" ref="title"/>
              <button className="redButton" onClick={this.addTitle}>Done</button>
              </div>
          )
 
          console.log("Edit Title with element")
          console.log(titleElement);
      }

    


let date='';

let startDateElement=(<div className="startDateContainer staticColor" onClick={this.showDate}><div className="startDateFull">Month Day</div></div>);


if (this.state.dateSelected){
   
   startDateElement=(<div className="startDateContainer staticColor" onClick={this.showDate}>
       <div className="startDateFull">
       {this.state.date.format("MMM D h:mm A")}
       </div></div>
       )
}
if (this.state.date) date=this.state.date;
if (this.state.showDate){
    startDateElement=(
        <div className="startDateContainer staticColor">
       <div className="startDateLabel">Date</div>
       <div className="startDateSelector">
   <DatePicker 
        inline
        selected={this.state.date}
        onChange={this.onDateChange}
        showTimeSelect
        dateFormat="LLL"
        className="inputcalendar"

    />
      </div>
      </div>  
    
    )
}
let catalogue='';
let donorInfoElement=(<div onClick={this.editDonor} className="eventDonor staticColor">Donor Contact</div>);
if (this.state.donor){
    donorInfoElement=(<div onClick={this.editDonor} className="eventDonor staticColor">{this.state.donor}</div>)
}
if (this.state.editDonor){
    donorInfoElement=(
        <div className="eventDonor"><input autoFocus="autofocus" type="text" defaultValue={this.state.donor} ref="donor" />
        <button className="redButton" onClick={this.addDonor}>Done</button>
        </div>
    )
}

let volunteerInfoElement=(<div className="eventVolunteer staticColor" onClick={this.editVolunteer}>Volunteer Contact</div>)
;   

if (this.state.volunteer){
   volunteerInfoElement=(<div onClick={this.editVolunteer} className="eventVolunteer staticColor">{this.state.volunteer}</div>)
}
if (this.state.editVolunteer){
    volunteerInfoElement=(
        <div className="eventVolunteer"><input autoFocus="autofocus" type="text" defaultValue={this.state.volunteer} ref="volunteer" />
        <button className="redButton" onClick={this.addVolunteer}>Done</button>
        </div>
    )
}




 return (

    <div className="createEventsPage">
    <div className="createEventSaveCancelButtons">
        <div className="createEventCancelDiv"><button className="createEventCancelButton">Cancel</button></div>
     <div className="createEventSaveDiv"><button className="createEventSaveButton">Save and Publish</button></div>
     </div>
    <div className="ImageAndInputContainer">
    <div className="ImageContainer" onClick={this.handleFile}>
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"50vw",height:"300px"}}
          onDrop={this.handleFile}>
       <div  style={imageStyle}>
           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <div>
               <br/><br/>
               <span className="imageUploadText">Upload Image</span>
               <br/><br/>
           </div>
           
           <div><span className="imageUploadText"><i className="fa fa-camera" style={{fontSize:"8rem"}}   aria-hidden="true"></i></span></div>
         <br/><br/>
       </div>
       </div>
    </Dropzone>
     </div> 
     <div className="inputContainer">
         
        {startDateElement}   
        {titleElement}
        {hostingGroupElement}
        {donorInfoElement}
        {volunteerInfoElement}
        
  </div>
     </div>
     <div className="descriptionHeader">Description</div>
     {descriptionElement}
    
    <div className="catalogueHeader">Catalogue</div>

     <div className="catalogueImageContainer" onClick={e=>this.handleFile("catalogue")}>
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"10vw",height:"100px"}}
          onDrop={e=>this.handleFile(catalogue)}>
       <div  style={imageStyle}>
           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <div>
               
               <span className="catalogueAddNewImageText">Add New Item</span>
            
           </div>
           <div><span className="catalogueAddNewImageText"><i className="fa fa-camera" style={{fontSize:"1rem"}}   aria-hidden="true"></i></span></div>
         <br/>
       </div>
       </div>
    </Dropzone>
     </div> 
     {catalogueItemNameElement}
     {catalogueItemAuctionIdElement}


     </div>
    

    );
}



}
export default ApiCreateEvent;