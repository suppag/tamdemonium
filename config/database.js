var db_config;

if(process.env.NODE_ENV === "production"){
    db_config = {
        database: 'mongodb+srv://tam:tamlyfe$415@cluster0-jwy2q.mongodb.net/test?retryWrites=true',
        secret: 'thisIsMySecret',
        useNewUrlParser: true 
    }
} else {
 
    db_config = {
        database: 'mongodb://localhost:27017/ovrbltDB',
        secret: 'thisIsMySecret',
        useNewUrlParser: true 
    }
}

module.exports = db_config;

