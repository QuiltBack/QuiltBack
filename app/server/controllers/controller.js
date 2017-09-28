

module.exports ={
    getPosts:(req,res)=>{
        if (!req.user){
            console.log("UNKNOWN user");
            return res.status(404).send('User not found');
        }
        else{
            req.app.get("db").getAllPosts()
                   .then(response=>{
                       res.status(200).json(response);
                   })
                   .catch(err=>{
                       res.status(500).end();
                   })
        }
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
    }




}