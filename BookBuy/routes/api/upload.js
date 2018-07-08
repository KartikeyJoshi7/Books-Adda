const Listing = require('../../db').Listing
const route = require('express').Router();
const multer = require('multer');
const Sequelize = require('sequelize');

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './uploads/');
    // },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
    
});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'bharati-vidyapeeth-s-college-of-engineering', 
  api_key: '494435138753718', 
  api_secret: 'cT_DYJJLPoT5F67fommyvgePTyU'
});


const Op = Sequelize.Op;

route.get('/', (req, res) =>{
    // Get all books
    if(req.session.user){
        
        Listing.findAll()
        .then((books) => {
            res.status(200).send(books)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
        
    }else{
        res.send(false)
    }
})

route.post('/search', (req, res) => {
    
    if(req.session.user){
        
        console.log(req.body.bookId);
        if(req.body.searchBy == "Book"){
            Listing.findAll({
                where: {
                    bookName: req.body.b_search
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            })
        }else if(req.body.searchBy == "Author"){
            Listing.findAll({
                where: {
                    authorName: req.body.b_search
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            }) 
        }
        
    }else{
        res.send(false);
    }
})


route.post('/item', (req, res) => {
    
    if(req.session.user){
        
        console.log(req.body.bookId);
        Listing.findAll({
            where: {
                id: req.body.bookId
            }
        }).then((listing) => {
            res.status(201).send(listing)
        }).catch((error) => {
            res.status(501).send({
                error: "Error adding product"
            })
        })
        
    }else{
        res.send(false);
    }
})

route.post('/price', (req, res) => {
    
    if(req.session.user){
        
        console.log(req.body.priceval);
        if(req.body.priceval == "Below 200"){
            Listing.findAll({
                where: {
                    price : {
                        [Op.lte]: 200
                    }
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            })
            
            
        }
        else if(req.body.priceval == "200-500"){
            Listing.findAll({
                where: {
                    price : {
                        [Op.between]: [200, 500]
                    }
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            })
            
        }else if(req.body.priceval == "500-800"){
            Listing.findAll({
                where: {
                    price : {
                        [Op.between]: [500, 800]
                    }
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            })
            
        }else if(req.body.priceval == "Above 800"){
            Listing.findAll({
                where: {
                    price : {
                        [Op.gte]: 800
                    }
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            })
        }else{
            Listing.findAll()
            .then((listing) => {
                res.status(200).send(listing)
            })
            .catch((err) => {
                res.status(500).send({
                    error: "Could not retrieve products"
                })
            })
        }
        
        
    }else{
        res.send(false);
    }
})

route.post('/condition', (req, res) => {
    
    if(req.session.user){
        
        console.log(req.body.condnVal);
        if(req.body.condnVal == "All"){
            Listing.findAll()
            .then((listing) => {
                res.status(200).send(listing)
            })
            .catch((err) => {
                res.status(500).send({
                    error: "Could not retrieve products"
                })
            }) 
        }
        else{
            Listing.findAll({
                where: {
                    condition : req.body.condnVal
                }
            }).then((listing) => {
                res.status(201).send(listing)
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding product"
                })
            }) 
        }       
    }
    else{
        res.send(false);
    }
})

route.post('/seller', (req, res) => {
    
    if(req.session.user){
        
        console.log(req.body.u_name);
        Listing.findAll({
            where: {
                seller : req.body.u_name
            }
        }).then((listing) => {
            res.status(201).send(listing)
        }).catch((error) => {
            res.status(501).send({
                error: "Error adding product"
            })
        })
        
    }else{
        res.send(false);
    }
})



route.post('/', upload.single('bookimage'), (req, res) => {
    
    if(req.session.user){
        
        console.log(req.file.path);
        
        cloudinary.uploader.upload(req.file.path, function(result) {
            
            var imageOnline = result.secure_url;
            
         console.log(imageOnline);
        
        Listing.create({
            seller: req.session.user.name ,
            bookName: req.body.book_name,
            authorName: req.body.author_name,
            image: imageOnline,
            price: parseInt(req.body.price),
            condition: req.body.condition
        }).then((listing) => {
            console.log(listing)
            res.status(201).send(listing)
        }).catch((err) => {
            res.status(501).send({
                error: err
            })
        })
    }); 
        
    }else{
        res.send(false);
    }
    
})


exports = module.exports =  route


