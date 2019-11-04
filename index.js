const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
      "id": 9
    },
    {
      "name": "oheneba",
      "number": "154844548",
      "id": 4
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
    response.json(persons);
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

const generateId= ()=> {
    return Math.floor(Math.random() *1000) + 1
}

app.post('/api/persons',(request, response) => {
    const body = request.body;
    //console.log('headers--->', request.headers);
    //console.log('body--->', request.body);

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'missing number or name'
        })
    }

    const newPerson = {
        "name": body.name,
        "number": body.number,
        "id": generateId()
    }

    persons = persons.concat(newPerson);
    console.log(newPerson);
    response.json(newPerson)
});


const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);