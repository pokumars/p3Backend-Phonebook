
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);


const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(result =>{
    console.log('connected to MongoDB');
})
.catch((err)=> {
    console.log('error connecting to MongoDB:', err.message);
});

//mongoDB doesnt care about what you post so 
//you have to define and restrict by schema on app level
const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: {type: String, required: true, unique: true}
});
personSchema.plugin(uniqueValidator);

//format the received json to remove _id and __v fields
personSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
}
});

//create an object(or 'class') called Person based on the schema (or interface) personSchema
//export that to be used
module.exports = mongoose.model('Person', personSchema);