const route = require('express').Router();

route.get('/',(req,res)=>{
    if(req.session.user){
        
        res.send(req.session.user);
        
    }else{
        res.send(false);
    }
})

route.get('/logout',(req,res)=>{
    if(req.session.user){
        
        req.session.destroy(function (err){
            if (err){
                console.log(err);
            }else{
                console.log('Destroyed')
                res.status(200).send({
                    msg: "logged out"
                })
            }
        });
        console.log('Destroyed')
    }else{
        res.send(false);
    }
})

exports = module.exports =  route
