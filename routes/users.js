const express = require('express');

const router = express.Router();

// Diciamo a express di usare il middlexare di gestione dei body delle richieste via form
router.use(express.urlencoded({ extended: false }));

// Importiamo il file contentente i nostri utenti
const { users } = require('../json');

// ESEMPIO API

// GET ALL USERS - INDEX
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, data: users })
})

// GET SINGLE USER - SHOW
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    res.status(200).json({ status: 200, data: user })
})

// ADD USER - CREATE
router.post('/', (req, res) => {

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

// EDIT SINGLE USER - EDIT
router.put('/:id', (req, res) => {
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

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ status: 404, error: 'User not found' });
    }

    const index = users.indexOf(user);

    users.splice(index, 1);

    res.status(200).json({ status: 200, message: 'User deleted successfully!' });
});

// Esportiamo il router
module.exports = router;