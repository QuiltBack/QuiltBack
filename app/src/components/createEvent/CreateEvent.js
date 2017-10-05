import React, {Component} from 'react';
import {bindAll} from 'lodash';
import axios from "axios";
import {connect} from 'react-redux';

import Dropzone from 'react-dropzone';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import {apiCreateEvent,apiGetEventById} from '../../services/apiServices';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import './CreateEvent.css';
import 'font-awesome/css/font-awesome.min.css';
const frontenv = require('../../frontenv.js');


 class CreateEvent extends Component{

constructor(props) {
      super(props);
      let initialDate=moment();
     initialDate._d.setMinutes(20);
     let initialEndDate=moment();
     initialEndDate._d.setMinutes(20);

   this.state={
       listening:false,
       recognition:null,
       catalogueItemView:0,
       processing:false,
       eventid:null,
       uploaded_uri:'',
       date:initialDate,
       endDate:initialEndDate,
       showDate:false,
       showEndDate:false,
       dateSelected:false,
       endDateSelected:false,
       title:'',
       editTitle:false,
       editHost:false,
       host:'',
       editDescription:false,
       description:'',
       editCatalogue:false,
       catalogue:[],
       
       catalogueImage_uri:'',
       catalogueItemName:'',
       catalogueItemAuctionId:'',
       editCatalogueItemName:false,
       editCatalogueItemAuctionId:false,
       editVolunteer:false,
       editDonor:false,
       volunteer:'',
       donor:'',
       city:'',
       state:'',
       zip:'',
       address:'',
       editLocation:false,
   };
   
     bindAll(this, 'loadEvent','editLocation','addLocation','saveAndPublish','addCatalogueItemAuctionId','addCatalogueItemName','editCatalogueItemAuctionId'
     ,'editCatalogueItemName','editDescription','addDescription'
     ,'editHost','addHost','editTitle','addTitle'
     ,'handleCatalogueFile','onEndDateChange'
     ,'editDonor','editVolunteer','addDonor','addVolunteer'
     ,'addItem','nextCatalogueItem','prevCatalogueItem'
     ,'onDateChange','showDate', 'showEndDate','handleFile'
     ,'toggleListening','onSpeechResult');
}

createRecognition = (SpeechRecognition) => {
    console.log("start create recognition")
    const defaults = {
      continuous: true,
      interimResults: false,
      lang: 'en-US'
    }

    const options = Object.assign({}, defaults, this.props)

    let recognition = new SpeechRecognition()

    recognition.continuous = options.continuous
    recognition.interimResults = options.interimResults
    recognition.lang = options.lang

    return recognition
 
 }
toggleListening(){
 if (this.state.listening){
     this.state.recognition.stop();
     this.setState({listening:false})

 }
 else{
     
     this.setState({listening:true});
     this.state.recognition.start();
 }

}

onSpeechResult(event){
 let text = event.results[event.results.length -1][0].transcript;
           console.log("TRANSCRIPT");
           console.log(this.state);
           console.log(text);
           
           this.refs.description.value = this.refs.description.value + " " +text;
}

componentWillReceiveProps(props){
   this.loadEvent(props);
}

componentWillMount(){
  this.loadEvent(this.props);
}

loadEvent(props){
   
     if (props && props.match && props.match.params && props.match.params.eventId){
       let eventid=props.match.params.eventId;
     
       if (eventid !=='new'){
         
           apiGetEventById(eventid)
           .then(response=>{
              

                let oldevent=response[0];
               let oldCatalog;
               oldCatalog=[];
               if (oldevent.catalogue){
                   oldCatalog= JSON.parse(oldevent.catalogue);
               }
               if (!Array.isArray(oldCatalog))
                 oldCatalog=[];
           
                this.setState({
                   address:oldevent.address?oldevent.address:'',
                   city:oldevent.city?oldevent.city:'',
                   state:oldevent.state?oldevent.state:'',
                   zip:oldevent.zipcode?oldevent.zipcode:'', 
                   date:moment(oldevent.date?oldevent.date:''),
                   description:oldevent.description?oldevent.description:'',
                   donor:oldevent.donorinfo?oldevent.donorinfo:'',
                   volunteer:oldevent.volunteerinfo?oldevent.volunteerinfo:'',
                   eventid:eventid,
                   uploaded_uri:oldevent.imageref?oldevent.imageref:'',
                   title:oldevent.title?oldevent.title:'',
                   host:oldevent.host?oldevent.host:'',
                   catalogue:oldCatalog,
                   users_id: oldevent.users_id?oldevent.users_id:null,
                   catalogueImage_uri:(oldCatalog.length >0)?oldCatalog[0].image_uri:'',
                   catalogueItemName:(oldCatalog.length >0)?oldCatalog[0].Name:'',
                   catalogueItemAuctionId:(oldCatalog.length >0)?oldCatalog[0].AuctionId:'',


                })
            

           })
       }

    }
// Set up Speeech Recognition object
if (!('webkitSpeechRecognition' in window) && ! this.state.recognition) {
 
} else {
     
     const SpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition
      || window.mozSpeechRecognition
      || window.msSpeechRecognition
      || window.oSpeechRecognition;

    

if (SpeechRecognition != null) {

    
      var recognition = this.createRecognition(SpeechRecognition);
      recognition.lang='en-US';
      
        this.setState({recognition:recognition});

      recognition.onresult = this.onSpeechResult;

    } else {
      console.warn('The current browser does not support the SpeechRecognition API.');
    }



  }


}

editLocation(){
  
    this.setState({editLocation:true})
}
addLocation(){
    this.setState({editLocation:false,city:this.refs.city.value,state:this.refs.state.value,address:this.refs.address.value})
}


saveAndPublish(){
    
    let userid=null;
    if (this.props && this.props.general && this.props.general.user){
        userid=this.props.general.user.users_id;
    }
    if (userid ===null) return;
   
    let newEvent={
        title:this.state.title?this.state.title:'',
        description:this.state.description?this.state.description:'',
        catalogue:this.state.catalogue?this.state.catalogue:[],
        donor:this.state.donor?this.state.donor:'',
        volunteer:this.state.volunteer?this.state.volunteer:'',
        image_uri:this.state.uploaded_uri?this.state.uploaded_uri:'',
        id:this.state.eventid,
        users_id:userid,
        date:this.state.date?this.state.date : moment(),
        host:this.state.host?this.state.host:'',
        city:this.state.city?this.state.city:'',
        state:this.state.state?this.state.state:'',
        zip:this.state.zip?this.state.zip:'',
        
       
    };
  
    apiCreateEvent(newEvent).then(res=>{
      
        this.setState({
            catalogue:[],
            description:'',
            title:'',
            uploaded_uri:'',
            id:null,
            catalogueImage_uri:'',
            catalogueItemName:'',
            catalogueItemAuctionId:'',
            editCatalogueItemName:false,
            editCatalogueItemAuctionId:false,
            editVolunteer:false,
            editDonor:false,
            volunteer:'',
            donor:'',
            host:''

        

        })
        this.props.history.push("/");

    })
    .catch(err=>console.log(err))

}

nextCatalogueItem(){
    let item = this.state.catalogueItemView +1;

    if (item >this.state.catalogue.length) item = 0;
    let image_uri,Name,AuctionId;
    if (item ===this.state.catalogue.length){
        image_uri='';
        Name='';
        AuctionId='';
    }
    else{
        image_uri= this.state.catalogue[item].image_uri;
        Name= this.state.catalogue[item].Name;
        AuctionId= this.state.catalogue[item].AuctionId;

      
    }
    this.setState({
        catalogueItemView:item,
         catalogueImage_uri:image_uri,
       catalogueItemName:Name,
       catalogueItemAuctionId:AuctionId,
       editCatalogueItemName:false,
       editCatalogueItemAuctionId:false,
    })
}
prevCatalogueItem(){
    let item = this.state.catalogueItemView -1;
    let image_uri,Name,AuctionId;

    if (item <0) item = this.state.catalogue.length;

      if (item ===this.state.catalogue.length){
        image_uri='';
        Name='';
        AuctionId='';
    }
    else{
        image_uri= this.state.catalogue[item].image_uri;
        Name= this.state.catalogue[item].Name;
        AuctionId= this.state.catalogue[item].AuctionId;

      
    }

    this.setState({
        catalogueItemView:item,
        catalogueImage_uri:image_uri,
        catalogueItemName:Name,
        catalogueItemAuctionId:AuctionId,
        editCatalogueItemName:false,
        editCatalogueItemAuctionId:false
    })
}


addItem(){
  
    if (this.state.catalogueItemName && this.state.catalogueItemAuctionId){
 
     let newCatalogue = this.state.catalogue;
     if (this.state.catalogueItemView === this.state.catalogue.length){
            newCatalogue.push({
              Name:this.state.catalogueItemName,
              AuctionId:this.state.catalogueItemAuctionId,
              image_uri: this.state.catalogueImage_uri
     })
    }
    else{
        newCatalogue[this.state.catalogueItemView] = {
            Name:this.state.catalogueItemName,
            AuctionId:this.state.catalogueItemAuctionId,
            image_uri:this.state.catalogueImage_uri
        }
    }
     this.setState({
         catalogueImage_uri:'',
         catalogue:newCatalogue,catalogueItemName:'',catalogueItemAuctionId:''
     ,editCatalogueItemAuctionId:false,editCatalogueItemName:false
    })
    }
}
editDonor(){
    this.setState({editDonor:true})
}
editVolunteer(){
    this.setState({editVolunteer:true})
}
addDonor(){
    this.setState({editDonor:false,donor:this.refs.donor.value})
}
addVolunteer(){
    this.setState({editVolunteer:false,volunteer:this.refs.volunteer.value});
}

addCatalogueItemAuctionId(){
    this.setState({editCatalogueItemAuctionId:false,catalogueItemAuctionId:this.refs.catalogueItemAuctionId.value})
}
addCatalogueItemName(){
    this.setState({editCatalogueItemName:false,catalogueItemName:this.refs.catalogueItemName.value})
}


editCatalogueItemName(){
    this.setState({editCatalogueItemName:true});
}
editCatalogueItemAuctionId(){
    this.setState({editCatalogueItemAuctionId:true});
}

editDescription(){
    this.setState({editDescription:true})
}
addDescription(){
    this.setState({editDescription:false,description:this.refs.description.value})
}
editHost(){
    this.setState({editHost:true});
}
addHost(){
    this.setState({editHost:false,host:this.refs.host.value});
}
editTitle(){
    this.setState({editTitle:true});
}
addTitle(){
    
    this.setState({editTitle:false,title:this.refs.title.value});
}
showDate(){
    let initialDate=this.state.date;
    initialDate._d.setMinutes(20);
    this.setState({showDate:true,date:initialDate});
    
}
showEndDate(){
    let initialEndDate=this.state.endDate;
    initialEndDate._d.setMinutes(20);
    this.setState({showEndDate:true,date:initialEndDate});
    
}

handleCatalogueFile(fileArray){
    this.handleFile(fileArray,"catalogue")
}

handleFile(fileArray,itemType) {
    
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


 axios.post(frontenv.BACKEND_HOST + '/api/upload',{pic:pic})
    .then(function(data){
       
        if (itemType === "catalogue"){
            that.setState({processing:false,catalogueImage_uri:data.data.Location})
        }
       else {
            
           that.setState({processing:false,uploaded_uri:data.data.Location})
        }
       
    })
    .catch(err=>{
        this.setState({processing:false})
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
onEndDateChange(date){
    let shouldShowEndDate=false;
   
   
    if (date._d.getMinutes() !== 30 && date._d.getMinutes()!==0){
        
         shouldShowEndDate=true;
       
    }
    
 
    if (!shouldShowEndDate) this.setState({endDate:date,showEndDate:shouldShowEndDate,endDateSelected:true});
    else this.setState({endDate:date,showEndDate:shouldShowEndDate,endDateSelected:false});

}


render(){
let processingmessage = (this.state.processing)?"Image Processing...":"";
let imageStyle={};
let catalogueImageStyle={};

let locationElement=(<div className="eventLocation staticColor" onClick={this.editLocation}>Location</div>);

if (this.state.city || this.state.state || this.state.address){
  let location='';

  location=this.state.address;
  if (location !== "" &&  this.state.city) location = location + ", " +this.state.city;
  else location = location + this.state.city;

  if (location !== "" && this.state.state) location = location + ", " + this.state.state;
  else location = location + this.state.state;

  if (location !== "" && this.state.zip ) location = location + ", " + this.state.zip;
  else location =location + this.state.zip; 


  locationElement=(
    <div onClick={this.editLocation} className="eventLocation staticColor">
    {location}
    </div>
)

}
if (this.state.editLocation){
    locationElement=(
    <div className="eventLocation">
        <span className="eventLabel locationInput">Address</span>
        <input type="text" size="15" ref="address" defaultValue={this.state.address} />
        <span className="eventLabel locationInput" size="10">City</span>
         <input className="locationInput" type="text" ref="city" defaultValue={this.state.city}/>
         <br/>
         <span className="eventLabel locationInput" >State</span>
         <input className="locationInput" type="text" ref="state" size="6" defaultValue={this.state.state}/>
         <span className="eventLabel locationInput">Zip</span>
         <input className="locationInput" type="text" ref="zip" size="5" defaultValue={this.state.zip} />
         <br/>
         <button className="redButton locationInput" onClick={this.addLocation}>Done</button>
        </div>);
}



let catalogueItemNameElement=(
    <div className="catalogueItemName staticColor" onClick={this.editCatalogueItemName}>Item Name</div>
        
);
if (this.state.catalogueItemName){
  

    catalogueItemNameElement=( <div className="catalogueItemName staticColor" onClick={this.editCatalogueItemName}>
        {this.state.catalogueItemName}</div>); 

    
}

if (this.state.editCatalogueItemName){

    catalogueItemNameElement=(
        <div className="catalogueItemName"><input autoFocus="autofocus" defaultValue={this.state.catalogueItemName} type="text" ref="catalogueItemName" />
        <button className="redButton" onClick={this.addCatalogueItemName}>Done</button>
        </div>
    )
}


let catalogueItemAuctionIdElement=(
    <div className="catalogueItemAuctionId staticColor" onClick={this.editCatalogueItemAuctionId}>Auction ID</div>
 );

if (this.state.catalogueItemAuctionId){
      catalogueItemAuctionIdElement=(
    <div className="catalogueItemAuctionId staticColor" onClick={this.editCatalogueItemAuctionId}>{this.state.catalogueItemAuctionId}</div>
    );
}

if (this.state.editCatalogueItemAuctionId){
    catalogueItemAuctionIdElement=(
        <div className="catalogueItemAuctionId"><input autoFocus="autofocus" defaultValue={this.state.catalogueItemAuctionId} type="text" ref="catalogueItemAuctionId" />
        <button className="redButton" onClick={this.addCatalogueItemAuctionId}>Done</button>
        </div>
    )
}



if (this.state.uploaded_uri) {
  
     imageStyle={
         height:"400px",
         backgroundImage:"url('" + this.state.uploaded_uri + "')",
         backgroundRepeat:"no-repeat",
         backgroundSize:"100% 100%"
       }
    
    }
if (this.state.catalogueImage_uri) {
  
        catalogueImageStyle={
         backgroundImage:"url('" + this.state.catalogueImage_uri + "')",
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
 let microphone=( <button onClick={this.toggleListening} className="redButton"><i className="fa fa-microphone"></i></button>);
  if (! this.state.recognition)
    microphone='';
 if (this.state.editDescription){
     
      descriptionElement=(<div className="eventDescription">
         
         <textarea autoFocus="autofocus" rows = "5" cols="50" ref="description" name="description">
            {this.state.description}
         </textarea>
         <br/>
     
    {microphone}&nbsp;&nbsp; <button onClick={this.addDescription} className="redButton">Done</button>
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
                <span className="eventLabel">Host</span>
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
    
      if (this.state.editTitle){
           titleElement=(
              <div className="eventTitle">
                  <span className="inputLabel">Title</span>
              <input type="text"  autoFocus="autofocus" defaultValue={this.state.title} className="titleEdit" ref="title"/>
              <button className="redButton" onClick={this.addTitle}>Done</button>
              </div>
          )
 
   
      }

    



let startDateElement=(<div className="startDateContainer staticColor" onClick={this.showDate}><div className="startDateFull">Begins Month Day</div></div>);


if (this.state.dateSelected){
   
   startDateElement=(<div className="startDateContainer staticColor" onClick={this.showDate}>
       <div className="startDateFull">
       Begins {this.state.date.format("MMM D h:mm A")}
       </div></div>
       )
}

if (this.state.showDate){
    startDateElement=(
        <div className="startDateContainer staticColor">
       <div className="startDateLabel">Begins</div>
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

// start end date


let endDateElement=(<div className="endDateContainer staticColor" onClick={this.showEndDate}><div className="endDateFull">Ends Month Day</div></div>);


if (this.state.endDateSelected){
   
   endDateElement=(<div className="endDateContainer staticColor" onClick={this.showEndDate}>
       <div className="endDateFull">
       Ends {this.state.endDate.format("MMM D h:mm A")}
       </div></div>
       )
}

if (this.state.showEndDate){
    endDateElement=(
        <div className="startDateContainer staticColor">
       <div className="startDateLabel">Ends</div>
       <div className="startDateSelector">
   <DatePicker 
        inline
        selected={this.state.endDate}
        onChange={this.onEndDateChange}
        showTimeSelect
        dateFormat="LLL"
        className="inputcalendar"

    />
      </div>
      </div>  
    
    )
}

//end END date
let donorInfoElement=(<div onClick={this.editDonor} className="eventDonor staticColor">Donor Contact</div>);
if (this.state.donor){
    donorInfoElement=(<div onClick={this.editDonor} className="eventDonor staticColor">{this.state.donor}</div>)
}
if (this.state.editDonor){
    donorInfoElement=(
        <div className="eventDonor"><span className="eventLabel">Donor Contact</span><input autoFocus="autofocus" type="text" defaultValue={this.state.donor} ref="donor" />
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
        <div className="eventVolunteer">
            <span className="eventLabel">Volunteer Contact</span>
            <input autoFocus="autofocus" type="text" defaultValue={this.state.volunteer} ref="volunteer" />

        <button className="redButton" onClick={this.addVolunteer}>Done</button>
        </div>
    )
}
let catalogueButton=(<button className="redButton" onClick={this.addItem}>Save</button>)

let catalogue=(<div></div>);

 catalogue =(
<div className="catalogue">
     <div className="catalogueNextPreviousContainer">
           <div onClick={this.prevCatalogueItem} className="cataloguePrevious">&lt;</div>
<div className="catalogueImageContainer" onClick={this.handleCatalogueFile}>
   
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"10vw",height:"100px"}}
          onDrop={this.handleCatalogueFile}>
       <div  style={catalogueImageStyle}>
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
   
      <div  onClick={this.nextCatalogueItem} className="catalogueNext">&gt;</div>
    </div>
     {catalogueItemNameElement}
     {catalogueItemAuctionIdElement}
     {catalogueButton}
     </div>




)
let dateElement=(
    <div className="dateElement">
        {startDateElement}
        {endDateElement}
    </div>
)

 return (

    <div className="createEventsPage">
       
  <div className="createEventSaveCancelButtons">
        <div className="createEventCancelDiv"><button className="createEventCancelButton">Cancel</button></div>
     <div className="createEventSaveDiv"><button className="createEventSaveButton" onClick={this.saveAndPublish}>Save and Publish</button></div>
     </div>
    <div className="ImageAndInputContainer">
    <div className="ImageContainer" onClick={this.handleFile}>
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"50vw",height:"400px",border: "1px solid red"}}
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
         
        {dateElement} 
        
        {titleElement}
        {locationElement}
        {hostingGroupElement}
        {donorInfoElement}
        {volunteerInfoElement}
        
  </div>
     </div>
     <div className="descriptionHeader">Description</div>
     {descriptionElement}
    
    <div className="catalogueHeader">Catalogue</div>

     {catalogue}


     </div>
    

    );
}



}


function mapStateToProps(state,ownProps){
    if (ownProps && ownProps.history && !(state && state.history))
      return Object.assign({},state,{history:ownProps.history});
    return state;
}
export default connect(mapStateToProps)(CreateEvent);




