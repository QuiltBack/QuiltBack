let moment = require('moment');
module.exports ={
    getComments:(req,res)=>{
      /*
          text:commentText,
            user_id: this.props.general.user.users_id,
            post_id:this.props.postid
            */
       
       let blogId = +req.params.blogId;
       console.log("blogid is" + req.params.blogId);
       console.log(req.params);
     
        req.app.get("db").getComments([blogId])
            .then(response=>{
                console.log("getComments result");
                console.log(response);
                res.status(200).json(response);

            })
            .catch(err=>{
                console.log("getComments ERROR");
                console.log(err);
                res.status(500).end();
            })
    },
    addComment: (req,res) =>{
        /*
        
        NSERT INTO comments (post_id,users_id,text,date) VALUES ($1,$2,$3,$4)
RETURNING *;
         */

        let {post_id,users_id,text} = req.body.comment;
        let date = moment();
        console.log(req.body);
        req.app.get("db").addComment([post_id,users_id,text,date])
           .then(response=>{
               console.log("addComment ");
               console.log(response);
               res.status(200).json(response);
           })
           .catch(err=>{
               console.log("addComment ERROR");
               console.log(err);
               res.status(500).end();
           })
    },
    addPost:(req,res)=>{
     let {post_text,users_id,post_title,post_id,imageref} = req.body.post;
     console.log("req.body.post");
     console.log(req.body.post);
     post_date=moment();
       if (isNaN(post_id))
       {
           console.log("not a number")
           // not a number - new.
           /*INSERT INTO posts (post_title, deleted, owner_id, post_text, flagged,imageref)
		VALUES ($1,null,$2,$3,false,$4)
        */
           req.app.get("db").createPost([post_title,users_id,post_text,imageref,post_date])
           .then(response=>{
               console.log(response);
               res.status(200).json(response);
           })
           .catch(err=>{
               console.log("ERROR creating new post");
               console.log(err);
           })
       }
       else{
           //number - old post
           /*UPDATE posts post_title=$2, post_text=$3, post_date=$4,imageref=$5  WHERE  post_id=$1 SET 
        */
        console.log("IS A NUMBER");
        console.log("type is " +typeof users_id)
        req.app.get("db").findSessionUser([users_id]).then(response=>{
            console.log("find user response");
            console.log(response);
        })
        .catch(err=>{
            console.log("GET USER exception in addPost")
            console.log(err);
        })
        req.app.get("db").editPost([post_id,post_title,users_id,post_text,post_date,imageref])
           .then(response=>{
               console.log("post added ");
	       console.log(response);
               res.status(200).json(response);
           })
           .catch(err=>{
               console.log("ERROR updating post");
               console.log(err);
               res.status(500).end();
           })
         

       }
     

    },
    removePost:(req,res)=>{
    let post_id=req.params.postId;
    let users_id= req.user.users_id;
    console.log("Removing post " +post_id);
    console.log("ussers_id " + req.user.users_id);
       req.app.get("db").removePost([users_id,+post_id])
       .then(response=>{res.status(200).send(response)})
       .catch(err=>{
           console.log("removePostError");
           console.log(err);
           res.status(500).end();
       })
    },
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
                       console.log("postresponse")
                       console.log(response);
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       console.log(err);
                       res.status(500).end();
                   })
       
        
    },
    getAdminNotifications:(req,res)=>{
        console.log('getting notifications for admin')
        req.app.get('db').getAdminNotifications()
            .then(response=>{
                res.status(200).json(response);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).end();
            })
    },
    getAdminPosts:(req,res)=>{
        console.log('getting Posts for admin')
        req.app.get('db').getAdminPosts()
            .then(response=>{
                res.status(200).json(response);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).end();
            })
    },
    getAdminUsers:(req,res)=>{
        console.log('getting Users for admin')
        req.app.get('db').getAdminUsers()
            .then(response=>{
                res.status(200).json(response);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).end();
            })
    },
    getUsersEvents:(req,res)=>{
        console.log('gettins all events for users');
        req.app.get("db").getUsersEvents([+req.params.users_id])
            .then(response=>{
                res.status(200).json(response);
            })    
            .catch(err=>{
                console.log(err);
                res.status(500).end();
            })
    },
    getUsersPosts:(req,res)=>{
        console.log('getting all them posts for the dashboard');
        req.app.get("db").getUsersPosts([+req.params.users_id])
            .then(response=>{
                res.status(200).json(response);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).end();
            })
    },
    editAccount:(req,res)=>{
        let nickname = req.body.nickname;
        let contactemail = req.body.contactemail;
        let number = req.body.number;
        let imageref = req.body.imageref;
        let users_id = req.params.users_id;

        req.app.get('db').editAccount([users_id,nickname,contactemail,number,imageref])
                .then(response=>{
                    res.status(200).send(response);
                })
                .catch(err=>{
                    console.log('edit account err, in ctrl')
                    console.log(err)
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
