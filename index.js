const express = require('express');
require('dotenv').config();
const Person =require('./models/person');
const cors = require('cors');
const app = express();
app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('build'));

const morgan = require('morgan');

//Define my own morgan token called body
morgan.token('body', function (req, res) { return JSON.stringify(req.body)});

app.use(morgan((tokens, req, res)=> {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ')
}));

let persons= [
    {
      "name": "Josif Stalin",
      "number": "125789",
      "id": 1
    },
    {
      "name": "kobby",
      "number": "777888999",
      "id": 2
    },
    {
      "name": "Thiago silva",
      "number": "484546878",
      "id": 3
    },
    {
      "name": "jon legend",
      "number": "2549873",
      "id": 4
    },
    {
      "name": "oheneba",
      "number": "154844548",
      "id": 5
    }
]

app.get('/', (request, response)=> {
    response.send(`<p>The info you want is at /api/persons or at /info</p>`)
    //response.send(`<p>Request received at ${}</p>`);
});

/*app.get('/persons', (request, response)=> {
    response.json(persons);
});*/

app.get('/api/persons', (request, response)=> {
    //response.json(persons);
    Person.find({}).then(persons => {
        persons.map((p) =>{
            console.log(`${p.name} ${p.number}`)
        });
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response)=> {
    const id = Number(request.params.id);
    console.log(`Request id ${id}`);

    const person = persons.find((p)=> p.id === id);

    response.json(person);
});

app.get('/info', (request, response)=> {
    response.send(`<p>Phonebook has ${persons.length} contacts. 
    <br> ${new Date()}</p>`)
});

app.delete('/api/persons/:id', (request, response)=> {
    const id = Number(request.params.id);
    console.log('delete a note');
    persons = persons.filter((p)=>p.id !== id);

    response.status(204).end();
});

app.put('/api/persons/:id',(request, response)=> {
    const id = Number(request.params.id);
    const replacement = request.body
    console.log('replacement body --->', replacement)

    if(replacement.name && replacement.number){
        //find whic obj is to be replaced and its index
        let ToBeReplaced = persons.find((p)=>p.name === replacement.name || p.number === replacement.number)
        let index = persons.indexOf(ToBeReplaced);

        //change the parts accordingly
        persons[index].number =replacement.number
        persons[index].name =replacement.name

        //return the updated obj
        let resObj =persons[index]
        response.json(resObj);
    }
});

const generateId= ()=> {
    return Math.floor(Math.random() *1000) + 1
}

app.post('/api/persons',(request, response) => {
    const body = request.body;
    //console.log('headers--->', request.headers);
    //console.log('body--->', request.body);

    if(!body.name || !body.number){//if body is empty
        return response.status(400).json({
            error: 'missing number or name'
        })
    }
    const nameExists = persons.find((p)=> p.name === body.name);
    const numberExists = persons.find((p)=> p.number === body.number);
    
    if(nameExists){
        console.log(JSON.stringify(nameExists));
        response.status(400).json({
            error:"The name already exists in phonebook"
        });
    }
    else if(numberExists){
        console.log(JSON.stringify(numberExists));
        response.status(400).json({
            error:"The number already exists in phonebook"
        });
    }else{
        const newPerson = {
            "name": body.name,
            "number": body.number,
            "id": generateId()
        }
    
        persons = persons.concat(newPerson);
        console.log(newPerson);
        response.json(newPerson)
    }
});


//const port = 3001;
//app.listen(port);
//console.log(`Server running on port ${port}`);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});