const mongoose = require('mongoose');
require('dotenv');


//mongoDB doesnt care about what you post so 
//you have to define and restrict by schema on app level
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

//create an object(or 'class') called Person based on the schema (or interface) personSchema
const Person = mongoose.model('Person', personSchema);

if (process.argv.length <3){
  console.log('give password as 3rd argument and name + number if you wanna POST');
  process.exit(1);
}else if(process.argv.length === 3){
  Person.find({})
    .then(result => {
      result.forEach(p => {
        console.log(`${p.name} ${p.number}`);
      });
      mongoose.connection.close();
    });
}

//get password which is the third argument passed to cli
//e.g "node mongo.js yourpassword"
const password = process.argv[2];

const url = `MONGODB_URI =mongodb+srv://acerlaptop_fullstack:${password}@phonebookcluster0-0pq3l.mongodb.net/phonebook?retryWrites=true&w=majority
`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });



if(process.argv.length=== 5){
  //now create the actual person obj that you are going to send
  const person = new Person ({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save()
    .then(response => {
      console.log('person saved');
      console.log(`added ${response.name} number ${response.number} to phonebook`);
      mongoose.connection.close();
    });
}


