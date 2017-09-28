

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
       
        
            req.app.get("db").getTables()
                .then(response=>{
                    let tables = response.map(table=>{
                        return table.table_name;
                    })
                    console.log(tables);
                })
           
            console.log(req.app.get("db"));
            console.log("debug1");
            
            req.app.get("db").getAllEvents()
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
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
          console.log("add Subscriber email " + email)
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
 }





}