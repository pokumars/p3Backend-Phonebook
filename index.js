const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const Person =require('./models/person');
const cors = require('cors');


const app = express();
app.use(cors());



app.use(bodyParser.json());
app.use(express.static('build'));

const morgan = require('morgan');

//Define my own morgan token called body
morgan.token('body', function (req, res) { return JSON.stringify(req.body);});

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ');
}));

app.get('/', (request, response) => {
  response.send('<p>The info you want is at /api/persons or at /info</p>');
  //response.send(`<p>Request received at ${}</p>`);
});


app.get('/api/persons', (request, response, next) => {
  //response.json(persons);
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  console.log(`Request id ${id}`);

  Person.findById(id)
    .then(person => response.json(person.toJSON()))
    .catch(error => next(error));
});

app.get('/info', (request, response) => {
  Person.find().count((err, count) => {
    console.log('Number of docs: ', count );

    response.send(`<p>Phonebook has ${count} contacts. 
    <br> ${new Date()}</p>`);
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  console.log('delete a note');

  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    }).catch(error => next(error));
});

app.put('/api/persons/:id',(request, response, next) => {
  const id = request.params.id;
  const replacement = request.body;
  console.log('replacement body --->', replacement);

  if(replacement.name && replacement.number){
    Person.findByIdAndUpdate(id, replacement, { new: true })
      .then(updatedPerson => updatedPerson.toJSON())
      .then(updatedAndFormattedPerson => {
        response.json(updatedAndFormattedPerson);
      })
      .catch(error => next(error));
  }
});

app.post('/api/persons',(request, response, next) => {
  const body = request.body;
  //const id= request.params.id;
  //var query = { name: `${body.name}` };

  if(!body.name || !body.number){//if body is empty
    return response.status(400).json({
      error: 'missing number or name'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });
    
  /* //MISTAKE. I MISUNDERSTOOD THE INSTRUCTIONS FOR 3.17 BUT FIXED IT NOW


     const personToUpdateOrAdd = { $set: {
        name: body.name,
        number: body.number}
    }
    //For 3.17 we want to update if it already exists and add if it doesnt 
    //findOneAndUpdate() with option 'upsert' set to true does exactly that
    Person.findOneAndUpdate(
        query,
        personToUpdateOrAdd,
        {new: true, upsert: true}
    )
    .then(returnedPerson =>returnedPerson.toJSON())
    .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error));*/


  //save name to mongoDB
  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson);
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if(error.name==='CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({ error: 'malformatted id' });
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});