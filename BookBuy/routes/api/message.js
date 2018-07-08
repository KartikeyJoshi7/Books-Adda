const Message = require('../../db').Message
const route = require('express').Router()

route.post('/', (req, res) => {
    if(req.session.user){
        
        console.log(req.body.m_message)
        Message.create({
            reciever: req.body.m_reciever,
            sender : req.body.m_sender ,
            bookName: req.body.m_bookName ,
            message : req.body.m_message
        }).then((message) => {
            console.log(message)
            res.status(201).send(message)
        }).catch((err) => {
            res.status(501).send({
                error: err
            })
        })
        
    }else{
        res.send(false);
    }
})

route.post('/book', (req, res) => {
    if(req.session.user){

        console.log(req.body.b_name)
        Message.findAll({
            where :{
                bookName: req.body.b_name ,
            }
        }).then((message) => {
            console.log(message)
            res.status(201).send(message)
        }).catch((err) => {
            res.status(501).send({
                error: err
            })
        })
        
    }else{
        res.send(false);
    }
})

exports = module.exports = route;
