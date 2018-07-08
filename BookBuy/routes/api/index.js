const route = require('express').Router()

 route.use('/message', require('./message'))
 route.use('/addWishList', require('./addWishList'))
 route.use('/upload', require('./upload'))
 route.use('/home', require('./home'))
 route.use('/signup', require('./signup'))



exports = module.exports =  route
