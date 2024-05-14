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

module.exports = {persona3, persona4};
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
