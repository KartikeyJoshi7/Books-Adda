const User = require('../../db').User
const route = require('express').Router()

route.post('/check', (req, res) => {
    
    
    console.log(req.body.u_email);
    
    
    User.findAll({
        where: {
            email : req.body.u_email,
            password : req.body.u_password
        }
    }).then((users) => {
        
        if(users.length!=0){ 
            req.session.user = users[0];  
            res.status(200).send(users)
        }
        else{
            res.status(200).send(false)
        }
        
    }).catch((err) => {
        res.status(501).send({
            error: err
        })
    })
})        

route.post('/', (req, res) => {
    
    console.log(req.body.u_name);
    
    User.findAll({
        where: {
            email : req.body.u_email
        }
    }).then((users) => {
        if(users.length != 0){
            res.status(200).send(false)
        }  
        else{
            User.create({
                name: req.body.u_name,
                college: req.body.u_college,
                phone: req.body.u_phone,
                email: req.body.u_email,
                password:req.body.u_password
            }).then((user) => {
                console.log(user)
                
                //res.redirect('/signin.html');
                res.status(201).send(user)
            }).catch((err) => {
                res.status(501).send({
                    error: err
                })
            })
        }
        
    }).catch((err) => {
        res.status(501).send({
            error: err
        })
    })
    
})

exports = module.exports = route

