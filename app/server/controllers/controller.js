

module.exports ={
    getPosts:(req,res)=>{
       
            req.app.get("db").getAllPosts()
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       res.status(500).end();
                   })
        
    },
       getEvents:(req,res)=>{
            
            req.app.get("db").getAllEvents()
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       res.status(500).end();
                   })
        
    },
      getEventPage:(req,res)=>{    

            req.app.get("db").getEventPage([+req.params.limit,(+req.params.page)*+req.params.limit])
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       res.status(500).end();
                   })
        
    },
      getEvent:(req,res)=>{
        req.app.get("db").getEventById([+req.params.eventId])
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       console.log(err);
                       res.status(500).end();
                   })
        
    },
        getAddress:(req,res)=>{
           
                req.app.get("db").getAddress()
                    .then(response=>{
                        res.status(200).send(response)
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).end();
                    })
        },
        getPost:(req,res)=>{
  
        req.app.get("db").getPostById([+req.params.postId])
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       console.log(err);
                       res.status(500).end();
                   })
        
    },
    
  

/* api/subscriber GET -> return subscriber emails 
app.get('/api/subscriber',CTRL.getSubscribers); */
 getSubscribers: (req,res)=>{
     req.app.get("db").getAllSubscribers()
        .then(response=>{
            res.status(200).send(response);
        })
        .catch(err=>{
            console.log("getSubscriber ERROR");
            console.log(err);
            res.status(500).end();

        })
 },


/* api/subscriber POST -> add new subscriber 
app.post('/api/subscriber',CTRL.addSubscriber); */

addSubscriber: (req,res)=>{
     let email = req.body.email;

     req.app.get("db").addSubscriber([email])
        .then(response=>{
            res.status(200).send(response);
        })
        .catch(err=>{
            console.log("getSubscriber ERROR");
            console.log(err);
            res.status(500).end();

        })
 },


/* api/subscriber/:subscriberID remove Subscriber 
app.delete ('/api/subscriber/:subscriberEmail',CTRL.removeSubscriber); */
 removeSubscriber: (req,res)=>{
     let email = req.body.email
     req.app.get("db").removeSubscriber([email])
        .then(response=>{
            res.status(200).send(response);
        })
        .catch(err=>{
            console.log("getSubscriber ERROR");
            console.log(err);
            res.status(500).end();

        })
 },
 addEvent: (req,res)=>{

let {zip,title,description,date,host,catalogue,donor
    ,volunteer,image_uri,id,users_id,address,city,state}=req.body.event;
    
catalogue = JSON.stringify(catalogue);

/*
(Date, StartTime, Title, Description, ImageRef
, VolunteerInfo, DonorInfo, City, State, Zipcode
, address, EndTime, catalogue, host)

*/
if (zip ) zip = +zip;
else zip =0;

// check to see if id is null
if (!id){
    req.app.get("db").createEvent([date,'',title,description,image_uri,volunteer
    ,donor,city,state,zip,address,'',catalogue,host,users_id])
    .then(response=>{console.log("event created");res.status(200).send(response)})
    .catch(err=>{console.log("event not created");console.log(err);res.status(500).end()});
}
else{
   
     req.app.get("db").editEvent([id,date,'',title,description,image_uri,volunteer,donor,city,state,zip,address,'',catalogue,host,users_id])
    .then(response=>{console.log("event created");console.log(response);res.status(200).send(response)})
    .catch(err=>{console.log("event not created");console.log(err);res.status(500).end()});
    
}

 }





}
