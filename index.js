const express = require('express');
const app = express();

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

app.get('/info', (request, response)=> {
    response.send(`<p>Phonebook has ${persons.length} contacts. 
    <br> ${new Date()}</p>`)
});


const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);