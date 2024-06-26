# ESPORTARE MODULI PERSONALIZZATI
```js
// nomi.js

// METODO 1
module.exports.persona1 = "Luca";

// METODO 2
const persona2 = "Giovanni";

module.exports.persona2 = persona2;

// METODO 3
const persona3 = "Marco";

const persona4 = "Mario";

module.exports = { persona3, persona4 }; 
// mmodule.exports = persona3;
```
```js
// functions.js

function logName(name) {
    console.log(`Name: ${nome}`)
};

module.exports = logName;
```

# IMPORTARE MODULI
```js
// index.js

const nomi = require('./nomi');

const saluta = require('./functions');

// ADESSO POSSIAMO ACCEDERE AI DATI DEI MODULI
saluta(nomi.persona1);
```

# AVVIARE SCRIPT NODE (index.js)
```bash
node index 
```

# SERVER HTTP
```js
const http = require('http');

const server = http.createServer( 
    (req, res)=> {
        if (req.url === "/") {
        res.end("benvenuto");
        }

        if (req.url === "/about") {
        res.end("about");
        }

        res.end(`<h1>Errore</h1>
        <p>Torna alla <a href="/">Home</a>, la pagina cercata non esiste.</p>`)
    }
)

// LASCIA IL SERVER IN ASCOLTO NELLA PORTA UTILIZZATA
server.listen(3000);
```
## CON SWITCH STATEMENT
```js
const http = require('http');

const server = http.createServer((req, res) => {
    switch(req.url) {
        case "/":
            res.end("benvenuto");
            break;
        case "/about":
            res.end("about");
            break;
        default:
            res.end(`<h1>Errore</h1>
            <p>Torna alla <a href="/">Home</a>, la pagina cercata non esiste.</p>`);
    }
});
server.listen(3000);
```

# MODULO PATH
```js
const path = require('path');

// OTTENERE IL SEPARATORE DELLE DIRECTORY DI SISTEMA
console.log(path.sep);

// OTTENERE IL PATH COMPLETO 
const filePath = path.join('/content', 'subfolder', 'test.txt');
console.log(filePath);

// OTTENERE IL PERCORSO ASSOLUTO DI UN ELEMENTO
const base = path.basename(filePath);
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute); // /home/user/progetto/content/subfolder/test.txt

```

# MODULO OS
```js
const os = require('os');

// OTTENERE LE INFORMAZIONI SULL'UTENTE LOGGATO NEL SISTEMA
const user = os.userInfo();
console.log(user);

// OTTENERE IL TEMPO DI ATTIVITA' DELLA MACCHINA
console.log(`Il sistema è attivo da ${os.uptime()} secondi`);

// OTTENERE INFORMAZIONI SUL SISTEMA OPERATIVO
const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS);
```

# MODULO FILE SYSTEM
```js
const fs = require('fs');

// LEGGERE UN FILE USANDO UNA FUNZIONE DI CALLBACK PER ELABORARE EVENTUALI ERRORI
fs.readFile('./docs/blog1.txt', (err, data) => {
// fs.readFile('./docs/blog1.txt', 'utf8', (err, data) => { ecc
    if (err) {
        console.log(err);
    }
    console.log(data.toString()); // console.log(data.toString('utf8'));
});

// SCRIVERE SU UN FILE (SCRIVE 'Hello World' in blog1.txt)
fs.writeFile('./docs/blog1.txt', 'Hello, World!', () => {
    console.log('Il file è stato scritto');
});

// AGGIUNGERE A UN FILE ESISTENTE (AGGIUNGE 'prova' al termine di blog1.txt')
fs.appendFile('./docs/blog1.txt', 'prova', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Testo aggiunto al file');
});

// CREARE/ELIMINARE DIRECTORY

// SE ASSETS NON ESISTE, CREA LA DIRECTORY, ALTRIMENTI LA ELIMINA
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Cartella creata');
    });
} else {    
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Cartella eliminata');
    });
}
```

# RICORDARE setTimeout!
```js
function delayedSum(a, b, callback) {

  setTimeout(() => {

    const result = a + b;
    callback(result);

  }, 1000);

}

delayedSum(50, 60, 
    // parametro callback passato in questo caso direttamente come arrow function:
    (result) => {
        console.log('Delayed Sum:', result);
    }
);
```

# INSTALLARE NODEMON (NODE MONITOR) PER FAR RESTARE IL SERVER IN ASCOLTO PER MODIFICHE AL FILE DI LAVORO
```bash
npm install nodemon --save-dev
// SALVIAMO COME DEV DEPENDECY POICHE' SERVE SOLO IN FASE DI SVILUPPO E NON IN PRODUZONE 
```

DENTRO package.json SOTTO scrpts AGGIUNGERE LO SCRIPT PER LANCIARE NodeMon USANDO IL FILE DESIDERATO:
```json
"scripts": {
    "start": "nodemon index.js"
  },
```

LANCIARE LO SCRIPT DA TERMINALE
```bash
npm start

// oppure
npm run start

// oppure
nodemon index.js
```

# EVENT EMITTER
IMPORTIAMO IL MODULO BUILT-IN EVENTS
```javascript
const EventEmitter = require('events');
```

CREIAMO UN EMITTER
```javascript
const customEmitter = new EventEmitter();
```

EVENT LISTENER
```javascript
// L'EMITTER E' IN ATTESA DI UN EVENTO RESPONSE, DOPO LA QUALE ESEGUE UNA FUNZIONE DI CALLBACK
customEmitter.on('response',
    // CALLBACK
    () => {
    console.log(`data received`);
    }
);
```

EVENT EMITTER
```javascript
// INVOCO L'EVENTO RESPONSE
customEmitter.emit('response');
```

POSSIAMO AGGIUNGERE DATI ALL'EMISSIONE DA POTER ELABORARE NELLA FUNZIONE DI CALLBACK
```javascript
customEmitter.on('response',
    // CALLBACK
    (data) => {
        console.log(`data received. User: ${data.name}, ID: ${data.id}`);
    }
);

// INVOCO L'EVENTO RESPONSE
customEmitter.emit('response',
    // DATI (data)
    {
        name: 'John',
        id: 30 
    }
);
```

# STREAM
A SCOPO DI TEST, CREIAMO UN FILE DI GRANDI DIMENSIONI
```javascript
const { writeFileSync } = require('fs');

for (let i = 0; i < 10000; i++) {
    writeFileSync('./big.txt', `hello world ${i}\n`, { flag: 'a' }); // { flag: 'a' } = appendi in coda al file: posiziona il puntatore di scrittura al termine del file
}
```

SE VOLESSIMO LEGGERLO SENZA STREAM, OTTEREMO UN UNICO BUFFER:
```javascript
// IMPORTIAMO ANCHE readFileSync
const { readFileSync, writeFileSync } = require('fs');

const bigFile = readFileSync('./big.txt', 'utf8');
```

USANDO LO STREAM, OTTERREMMO I CHUNK DEL FILE GRADUALMENTE DIVISO IN PIU' BUFFER
```javascript
// IMPORTIAMO ANCHE readFileSync
const { createReadStream, readFileSync, writeFileSync } = require('fs');

const stream = createReadStream('./big.txt');

// data e result sono parametri usati come nomi di variabili per rappresentare i dati passati al callback quando l'evento 'data' viene emesso. 
// data e result non sono parametri "nativi" nel senso che non sono parole chiave del linguaggio o parametri riservati, ma sono convenzioni di denominazione comuni per i dati passati agli eventi 'data' o ad altri eventi simili nel contesto di Node.js 

stream.on('data', (result) => {
    console.log(result);
});
```

# HTTP REQUESTS
client -> http requerst -> server (node/express) -> http response -> client

METODI HTTP:
- GET:  Lettura dei dati
- POST: Invio dei dati
- PUT: modifica dei dati (totale)
- PATCH: Modifica dei dati (parziale)
- DELETE: eliminazione dei dati 

# EXPRESS
INIZIALIZZARE UN NUOVO PROGETTO 
-y sta per "yes". Il comando accetterà automaticamente tutte le impostazioni predefnite alle eventuali domande.
```bash
npm init -y
```

INSTALLARE EXPRESS (viene autoaticamente installato nelle dependecies)
```bash
npm i express
```

INSTALLARE NODEMON (come dev dependency)
```bash
npm install nodemon --save-dev
```

DENTRO package.json SOTTO scrpts AGGIUNGERE LO SCRIPT PER LANCIARE NodeMon USANDO IL FILE DESIDERATO:
```json
"scripts": {
    "start": "nodemon index.js" // npm start
  },
```

IMPORTIAMO EXPRESS
```js
const express = require('express');
```

ASSEGNIAMO AD app UNA NUOVA ISTANZA DI EXPRESS (generata dal metodo express())
```js
const app = express();
```

ALLA RICHIESTA CON METODO GET DI '/' INVIAMO LA RESPONSE "Hello World"
```js
app.get('/', function (req, res) {
    res.send('Hello World')
}) 
```
METTIAMO app (EXPRESS) IN ASCOLTO DELLA PORTA DESIDERATA
```js
app.listen(3000)
```

GESTIAMO LA RICHIESTA DI UNA IPOTETICA PAGINA "ABOUT"
```js
app.get('/about', (req, res) => {
    res.send('<h1>About</h1></h1> <p>Back to <a href="/">home</a></p>')
})
```

GESTIAMO LA RICHIESTA DI UNA PAGINA NON ESISTENTE
```js
// Qualsiasi metodo di richiesta (all) verso qualsiasi url (*)
app.all('*', (req, res) => {
    res.send(`<h1>404: Resource non found.</h1> <p>Back to <a href="/">home</a></p>`)
})
```

GESTIRE I FILES STATICI
Creiamo una cartella "public" e indichiamo a Express di utilizzarla come source per i nostri files statici
```js
app.use(express.static('/public'));
```

Creiamo il nostro file html, ad esempio "home.html".
Modifichiamo la nostra richiesta alla home indicando il nome del file e il suo persorso.
https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
```js
const express = require('express');

const app = express();

app.use(express.static('/public'));

app.get('/', (req, res) => {
    res.sendFile('home.html', {root: __dirname + "/public"})
})

app.get('/about', (req, res) => {
    res.sendFile('about.html', { root: __dirname + '/public' })
})

app.all('*', (req, res) => {
    res.sendFile('404.html', { root: __dirname + '/public' })
})

app.listen(3000)
```

## RESPONSE CON FILE JSON
```js
app.get('/json', (req, res) => {
    res.json([{ nome: 'Luca', cognome: 'Rossi' }, { nome: 'Marco', cognome: 'Verdi' }])
})
```

Esportiamo l'oggetto da un file esterno
```js
// json.js
const users = [
    {
        name: 'Luca',
        cognome: 'Rossi',
        age: 30,
        adrress: {
            city: 'Milano',
            street: 'Via Roma',
            civicNr: '3',
            cap: 90000
        },
        interests: ['books', 'music']
    },
// ...
]

module.exports = { users };
```

Importiamo l'oggetto nel nostro codice:
```js
// index.js
const {users} = require('./json');
```

Modifichiamo la nostra response:
```js
app.get('/json', (req, res) => {
    res.json(users)
})
```

# ROUTE PARAMS
Possiamo manipolare i dati in modo da ottenere soltanto quelli necessari.
Ad esempio, potremmo non aver bisogno di tutti i dettagli, ma soltanto di quelli essenziali.
```js
app.get('/users', (req, res) => {
    const usersPreview = users.map(
        (user) => {
            // dato che le variabili avranno lo stesso nome, possiamo destrutturare l'oggetto
            const { id, name, surname, age } = user;
            return { id, name, surname, age }
        }
    )
    res.json(usersPreview)
})
```

Ottenere i dati di un singolo elemento:
```js
app.get('/users/1', (req, res) => {
    const user = users.find(user => user.id == 1);
    res.json(user)
})
```

Questo ci porta ad aver bisogno di un parametro della rotta da poter sostituire dinamicamente all'id dell'utente (in questo caso).
```js
app.get('/users/:id', (req, res) => {

    // http://localhost:3000/users/11 loggerà in console del terminale { id: '11' }
    console.log(req.params);

    const { id } = req.params;
    const user = users.find(user => user.id == id);

    // Se l'utente non viene trovato ritorna un errore 404 come .json
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user)

})
```

E' possibile concatenare le routes
```js
app.get('/products/:slug/reviews/:id', (req, res) => {

    //...

})
```

# QUERY STRING PARAMS
Questo metodo è utile per passare parametri che non sono necessariamente univoci, ad esempio per filtrare i dati.

```js
app.get('/search', (req, res) => {

    console.log(req.query); // { query: 'an' }

    // Esportiamo le variabili query e limit
    const { query, limit } = req.query;

    // creiamo una copia di users
    let filteredUsers = [...users];

if (query) {
        filteredUsers = filteredUsers.filter((user) => {

            return user.name.toLowerCase().startsWith(query.toLowerCase());

        })
    }

    res.status(200).json(filteredUsers)

})
```

Ad esempio, una query come
```
http://localhost:3000/search?query=an
```
ci ritornerà un json con gli utenti il cui nome inizia con "an"
```json
[
    {
        "id": "1",
        "name": "Anna",
        "surname": "Bianchi",
        "age": 28,
        "address": {
            "city": "Roma",
            "street": "Via Roma",
            "civicNr": "20",
            "cap": 184
        },
        "interests": ["books","travel"]
    },
    {
        "id": "10",
        "name": "Andrea",
        "surname": "Martini",
        "age": 37,
        "address": {
            "city": "Messina",
            "street": "Via Messina",
            "civicNr": "40",
            "cap": 98100
        },
        "interests": ["sports","travel"]
    }
]
```

Gestire il limite di risultati da mostrare (limit):
```js
// se è presente un limit, effettuiamo uno slice dei risultati
if (limit) {
    filteredUsers = filteredUsers.slice(0, Number(limit))
}
```

Di conseguenza una query di 
```
http://localhost:3000/search?limit=3
```
ritornerà solo i primi tre utenti, mentre una query di
```
http://localhost:3000/search?query=an&limit=1
```
ritornerà solo il primo utente il cui nome inizia con "an".

Quando inviamo una response condizionale dobbiamo assicurarci di usare un return per evitare di inviarla più volte.
```js
if (filteredUsers.length < 1) {
    // è necessario uscire dallo script!
    return res.status(200).json({ message: "No user matches the search criteria" });
}

// Senza return nell'if, potrebbe inviare la res sia se non trova utenti che qui, generando un errore!
res.status(200).json({ filteredUsers })
```

# MIDDLEWARE
I middleware sono funzioni che vengono eseguiti durante la richiesta. Ci servono ad agire da quando riceviamo la req a quando inviamo la res.
***req -> middleware -> res***
```js
const middleware = (req, res, next) => {
    const { method, url } = req
    console.log(`Request Method: ${method} - Request Url: ${url}`)
}

app.get('/', middleware, (req, res) => {
    res.sendFile('home.html', { root: __dirname + "/public" })
})
```

In un middleware, dobbiamo usare il parametro next per indicare al codice di procedere con la req, oppure inviare una sua res (per questo vengono indicati come parametro del middleware).
Senza next il codice sarebbe rimasto fermo in attesa e avremmo avuto un messaggio di "Sito non raggiungibile"
```js
const middleware = (req, res, next) => {
    const { method, url } = req
    console.log(`Request Method: ${method} - Request Url: ${url}`)
    next()
}

app.get('/', middleware, (req, res) => {
    res.sendFile('home.html', { root: __dirname + "/public" })
})
```

Potrebbero esserci infatti middleware che inviano le proprie response.
```js
const middleware = (req, res, next) => {
    const { method, url } = req
    console.log(`Request Method: ${method} - Request Url: ${url}`)

    // ad esempio il nostro utente non è nel database
    if(condizione) {
        // ci invia a una pagina di registrazione
        req.send('Response dal Middleware')
    }

    next()
}
```

E' possibile usare app.use per indicare a Express di avviare automaticamente il nostro middleware in ogni richiesta
```js
app.use(middleware);
```

Possiamo anche indicare a quali percorsi associare un middleware.
Ad esempio potremmo associarlo a tutti i percorsi che derivano da /users
```js
app.use('/users', middleware);
```

Possiamo importare più middleware in app.use, come array. Verranno eseguiti nell'ordine specificato.
```js
app.use([middleare, auth]);
```

Il middleware express.json ci servirà per convertire i dati in entrata in formato json (quando ad esempio usiamo chiamate di tipo POST)
```js
app.use(express.json());
```

# POST
Aggiungere un utente tramite chiamata POST
(ovviamente non stiamo gestendo eventuali dati da inviare a un DB per adesso, ma un semplice oggetto json inviato tramite POSTMAN)
```js
// DI NORMA VA RICHIAMATO A INIZIO DEL CODICE
app.use(express.json());

app.post('/api/users', (req, res) => {

    console.log(req.body);

    const newUser = req.body;

    users.push(newUser);

    res.status(200).json({ status: 200, message: "User added succeffully", data: newUser });

})
```
Body della POST Request:
```json
{
        "id": "20",
        "name": "Aldo",
        "surname": "Ferro",
        "age": 52,
        "address": {
            "city": "Lucca",
            "street": "Via Settembre",
            "civicNr": "8",
            "cap": 59300
        },
        "interests": ["trekking", "gaming"]
}
```

Response:
```json
{
    "status": 200,
    "message": "User added succeffully",
    "data": {
        "id": "20",
        "name": "Aldo",
        "surname": "Ferro",
        "age": 52,
        "address": {
            "city": "Lucca",
            "street": "Via Settembre",
            "civicNr": "8",
            "cap": 59300
        },
        "interests": [
            "trekking",
            "gaming"
        ]
    }
}
```

Per ricevere i dati da un form dobbiamo usare il middleware urlencoded()
```js
app.use(express.urlencoded({ extended: false }));
```

Quando extended è impostato a true, Express utilizza la libreria qs (querystring parser) per la parsing dei dati del form. Questa libreria permette la parsing di oggetti annidati e array complessi.
Utile per interpretare dati da un form come:
```html
<input type="text" name="address[city]" value="Lucca">
<input type="text" name="address[street]" value="Via Settembre">
```

# ESEMPIO CREAZIONE USER TRAMITE FORM
Creiamo il form:
```html
<!-- Ricordiamo di inserire il metodo e l'action -->
<form action="/api/users" method="POST">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <br><br>

    <label for="surname">Surname:</label>
    <input type="text" id="surname" name="surname" required>


    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required>

<!-- ecc -->

    <button type="submit">Add User</button>
</form>
```

Creiamo il controller:
```js
// ...
app.use(express.urlencoded({ extended: false }));
// ...

app.post('/api/users/', (req, res) => {

    console.log("body:", req.body);

    // Crrea un nuovo user
    const newUser = {

        // Controlla la lungghezza di users.
        // Se è > 0 allora assegna come id l'id dell'ultimo user +1
        // altrimenti assegna 0
        id: (users.length > 0) ? (Number(users[users.length - 1].id) + 1).toString() : '0',

        // ASSEGNA I VALORI DELLA REQUEST ALLE CHIAVI NECESSARIE
        name: req.body.name,
        surname: req.body.surname,
        age: Number(req.body.age),
        address: {
            city: req.body.city,
            street: req.body.street,
            civicNr: req.body.civicNr,
            cap: Number(req.body.cap)
        },

        // SEPARA GLI INTERESSI E LI INSERISCE IN UN ARRAY, RIMUOVENDO GLI SPAZI BIANCHI
        interests: req.body.interests.split(',').map(interest => interest.trim())

    };

    users.push(newUser);

    res.status(200).json({ status: 200, message: "User added successfully", data: newUser });
});
```

# PUT
In modo simile al controller show possiamo modificare il nostro utente allindice desiderato.
```js
// ...
app.use(express.json());
// ...

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    user = req.body;

    res.status(200).json({ status: 200, data: user })
})
```

Questo metodo però assegna il valore dell'oggetto req.body a user, sostituendolo in toto.
Usando Object.assign() potremmo copiare le proprietà, sostituendo quelle esistenti e aggiungendo quelle mancanti. 
Si tratta ovviamente di soluzioni provvisorie.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
```js
// ...
app.use(express.json());
// ...

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    Object.assign(user, req.body);

    res.status(200).json({ status: 200, message: 'User edited succeffully!', data: user });
});
```

Assegnando i valori di un form a un payload possiamo iniziare a dar forma al controller:
```js
// ...
app.use(express.urlencoded({ extended: false }));
// ...

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    const payload = {

        // ASSEGNA I VALORI DELLA REQUEST ALLE CHIAVI NECESSARIE
        name: req.body.name,
        surname: req.body.surname,
        age: Number(req.body.age),
        address: {
            city: req.body.city,
            street: req.body.street,
            civicNr: req.body.civicNr,
            cap: Number(req.body.cap)
        },

        // SEPARA GLI INTERESSI E LI INSERISCE IN UN ARRAY, RIMUOVENDO GLI SPAZI BIANCHI
        interests: req.body.interests.split(',').map(interest => interest.trim())

    }

    Object.assign(user, payload);

    res.status(200).json({ status: 200, message: 'User edited succeffully!', data: user });
});
```

Per ricevere dati da un form:
```js
// ...
app.use(express.urlencoded({ extended: false }));
// ...
```
Per ricevere dati in formato .json:
```js
// ...
app.use(express.json());
// ...
```

# DELETE
```js
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    const index = users.indexOf(user);

    // Se non necessitassimo di un controllo sulla presenza di user:
    // index = users.findIndex(user => user.id == id)

    users.splice(index, 1);

    res.status(200).json({ status: 200, message: 'User deleted successfully!', user: user }); 
});
```

# ROUTING
Creiamo un file per le rotte. 
In questo caso creeremo un file per le rotte API di user.
Adesso non sarà più app a gestire le rotte, ma router, quindi dobbiamo effettuare le dovute modifiche
```js
// routes/users.js
const express = require('express');

const router = express.Router();

// Diciamo a express di usare il middlexare di gestione dei body delle richieste via form
router.use(express.urlencoded({ extended: false }));

// Importiamo il file contentente i nostri utenti
const { users } = require('../json');

// Sostituiamo app con router in ogni rotta
router.get('/api/users', (req, res) => {
    res.status(200).json({ status: 200, data: users })
})

// GET SINGLE USER - SHOW
router.get('/api/users/:id', (req, res) => {
    //...
})

router.post('/api/users/', (req, res) => {
    //...
});


router.put('/api/users/:id', (req, res) => {
    //...
});

router.delete('/api/users/:id', (req, res) => {
    //...
});

// Esportiamo il router
module.exports = router;
```

Importiamo il router nel nostro script principale e diciamo di utilizzarlo al path desiderato
```js
// Import router
const usersRouter = require('./routes/users');

// Definizione radice delle rotte e uso del router
app.use('/api/users', usersRouter)
```

Adesso abbiamo definito come home del router '/api/users'.
Questo vuol dire che cercando il controller index, lui andrà all'url /api/users + url del controller.
attualmente, essendo in questo caso index definito come 
```js
router.get('/api/users', (req, res) => {
    res.status(200).json({ status: 200, data: users })
})
```
noi potremmo accedere alla rotta soltanto all'indirizzo 
```
http://localhost:3000/api/users/api/users
```
per ovviare a questo inconveniente dobbiamo eliminare i refusi, partendo dal presupposto che la radice della rotta è gia definita in 
```js
app.use('/api/users', usersRouter)
```
il nostro codice modificato sarò quindi:
```js
// routes/users.js
const express = require('express');

const router = express.Router();

// Diciamo a express di usare il middlexare di gestione dei body delle richieste via form
router.use(express.urlencoded({ extended: false }));

// Importiamo il file contentente i nostri utenti
const { users } = require('../json');

// INDEX
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, data: users })
})

// SHOW
router.get('/:id', (req, res) => {
    //...
})

// CREATE
router.post('/', (req, res) => {
    //...
});

// EDIT
router.put('/:id', (req, res) => {
    //...
});

// DELETE
router.delete('/:id', (req, res) => {
    //...
});

// Esportiamo il router
module.exports = router;
```

## USARE UN DATABASE (MySql) IN NODE.JS
Installare il modulo MySql
```bash
npm install mysql
```

Creiamo un file per gestire la connessione al database
```js
// db.js
const mysql = require('mysql');

// Impostiamo la nostra connessione al database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'dbname'
});

// Connettiamoci al db e usiamo una callback per gestire eventuali errori
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connessione al database MySQL riuscita!');
});

module.exports = connection;
```
Definizione delle rotte del database
```js
// routes/usersDB.js

const express = require('express');

// Importiamo il modulo del router
const router = express.Router();

// Importiamo il modulo di gestione del database
// L'importazione di questo modulo esegue il codice in db.js ed esegue la connessione ad database.
const db = require('../db');

// INDEX
router.get('/', (req, res) => {

    // Inviamo la query al DB e usiamo una callback per gestire gli errori
    db.query('SELECT * FROM users', (err, results) => {

        if (err) {
            console.error('Errore durante la query:', err);

            res.status(500).json({ status: 500, error: 'Errore durante il recupero degli utenti dal database' });

            return;
        }

        // Inviamo un json con i risultati e lo status della API request
        res.status(200).json({ status: 200, data: results });
    });
});

module.exports = router;
```

Utilizziamo le rotte dell'api database
```js
// index.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/usersDB');

app.use('/api/usersDB', usersRouter);

app.listen(3000)
```

## UTILIZZO DI UN POOL DI CONNESSIONI
Per migliorare la performance del database, possiamo utilizzare un pool di connessioni. Un pool di connessioni è un insieme di connessioni al database che possono essere condivise tra più richieste.
```js
// db.js
const mysql = require('mysql');

// Pool di connessioni
const pool = mysql.createPool({
    // Limite massimo di connessioni da gestire
    connectionLimit: 10,

    // Dati di connessione al database
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'dbname'
});

module.exports = pool;
```
Utilizzando un pool di connessioni (***mysql.createPool()***), non è necessario chiamare esplicitamente ***connection.connect()*** perché il pool gestisce automaticamente la creazione, il riutilizzo e la chiusura delle connessionie. Il pool si occupa di aprire le connessioni quando necessario e di mantenerle pronte per l'uso.
Il pool crea e gestisce automaticamente un certo numero di connessioni (definito da ***connectionLimit***). Le connessioni vengono aperte quando necessario e chiuse quando non sono più necessarie.

