const Sequelize = require('sequelize');

const db = new Sequelize('bookBuydb', 'buyer', 'buypass', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
})


const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    college :{
        type : Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type :Sequelize.STRING,
        allowNull : false,
        unique : true,

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})


const Message = db.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reciever :{
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bookName :{
        type : Sequelize.STRING,
        allowNull: false,
    },
    message :{
        type: Sequelize.STRING,
        allowNull : false,
    }
    
})

const Wishlist = db.define('wishlists', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user :{
        type: Sequelize.STRING,
        allowNull: false,
    },
    seller: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bookName :{
        type : Sequelize.STRING,
        allowNull: false,
    },
    authorName: {
        type :Sequelize.STRING,
        allowNull : false,

    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    condition: {
        type : Sequelize.ENUM("New" ,"Almost New", "Slight Damage", "Worn"),
        allowNull: false,
    }
})

const Listing = db.define('listings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    seller: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bookName :{
        type : Sequelize.STRING,
        allowNull: false,
    },
    authorName: {
        type :Sequelize.STRING,
        allowNull : false,

    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    condition: {
        type : Sequelize.ENUM("New" ,"Almost New", "Slight Damage", "Worn"),
        allowNull: false,
    }
})




db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
    User, Listing, Wishlist, Message
}
