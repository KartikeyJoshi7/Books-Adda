const Wishlist = require('../../db').Wishlist
const route = require('express').Router();



route.post('/wish', (req,res) => {
    if(req.session.user){
        
        console.log(req.body.u_email);
        Wishlist.findAll({
            where: {
                user : req.body.u_email
            }
        }).then((wishlists) => {
            res.status(201).send(wishlists)
        }).catch((error) => {
            res.status(501).send({
                error: err
            })
        })
        
    }else{
        res.send(false);
    }
    
})

route.post('/delete', (req,res) => {
    if(req.session.user){
        
        console.log(req.body.u_email);
        Wishlist.destroy({
            where: {
                user : req.body.u_email,
                bookName: req.body.book_name,
                authorName: req.body.author_name
            }
        }).then(() => {
            res.status(201).send({msg : 'Destroyed record.'})
        }).catch((error) => {
            res.status(501).send({
                error: err
            })
        })
        
    }else{
        res.send(false);
    }
    
})


route.post('/', (req, res) => {
    
    if(req.session.user){
        
        console.log(req.body.seller);
        Wishlist.findAll({
            where: {
                user : req.body.u_email,
                bookName: req.body.book_name,
                authorName: req.body.author_name
            }
        }).then((wishlists) => {
            if(wishlists.length != 0){
                res.send({msg: 'Already in Wishlist'});
            } 
            else{
                Wishlist.create({
                    user:req.body.u_email,
                    seller: req.body.seller,
                    bookName: req.body.book_name,
                    authorName: req.body.author_name,
                    image: req.body.image,
                    price: parseInt(req.body.price),
                    condition: req.body.condition
                }).then((wishlist) => {
                    console.log(wishlist)
                    res.status(201).send({wishlist : wishlist, msg: 'Added Book'})
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
        
    }else{
        res.send(false);
    }
    
    
    
})

exports = module.exports =  route
