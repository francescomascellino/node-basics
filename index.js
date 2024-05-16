const express = require('express');

const app = express();

const { users } = require('./json');

const middleware = require('./middleware');

app.use('/users', middleware);

app.use(express.static('/public'));

/* app.get('/', (req, res) => {
    res.sendFile('home.html', { root: __dirname + "/public" })
}) */

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: __dirname + "/public" })
})

app.get('/about', (req, res) => {
    res.sendFile('about.html', { root: __dirname + '/public' })
})

app.get('/users', (req, res) => {
    const usersPreview = users.map(
        (user) => {
            const { id, name, surname, age } = user;
            return { id, name, surname, age }
        }
    )
    console.log(usersPreview);
    res.status(200).json(usersPreview)
})

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user)
})

app.get('/search', (req, res) => {
    console.log(req.query);

    const { query, limit } = req.query;

    // creiamo una copia di users
    let filteredUsers = [...users];

    // filtriamo gli utenti in base alla query
    if (query) {
        filteredUsers = filteredUsers.filter(
            (user) => {

                // Ritorniamo l'utente il cui nome inizia con il parametro di ricerca
                // cerchiamo il parametro in minuscolo per evitare errori
                return user.name.toLowerCase().startsWith(query.toLowerCase());
            }
        )
    }

    // se è presente un limit, effettuiamo uno slice dei risultati
    if (limit) {
        filteredUsers = filteredUsers.slice(0, Number(limit))
    }

    if (filteredUsers.length < 1) {
        // Quando inviamo una response condizionale dobbiamo assicurarci di usare un return per evitare di inviarla più volte
        return res.status(200).json({ message: "No user matches the search criteria" });
    }

    res.status(200).json({ filteredUsers })

})

// ESEMPIO API

// GET ALL USERS - INDEX
app.get('/api/users', (req, res) => {
    res.status(200).json({ status: 200, data: users })
})

// GET SINGLE USER - SHOW
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    res.status(200).json({ status: 200, data: user })
})

// Dobbiamo gestire i dati in entrata come JSON tramite il middleware di Express .json()
app.use(express.json());

// ADD USER - CREATE
/* app.post('/api/users', (req, res) => {

    console.log(req.body);

    const newUser = req.body;

    users.push(newUser);

    res.status(200).json({ status: 200, message: "User added succeffully", data: newUser });

}) */

app.use(express.urlencoded({ extended: false }));

app.post('/api/users/', (req, res) => {

    console.log("body:", req.body);

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

app.all('*', (req, res) => {
    res.sendFile('404.html', { root: __dirname + '/public' })
})

app.listen(3000)