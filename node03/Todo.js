let mongoose = require('mongoose');

let mongoDB = 'mongodb://localhost/my_database';

mongoose.connect(mongoDB,{useNewUrlParser: true});

let Schema = mongoose.Schema;

let todoSechema = new Schema({
    title : String,
    completed : Boolean,
    created: Date
});


module.exports = mongoose.model('Todos',todoSechema);
