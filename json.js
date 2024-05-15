const users = [

    {
        id: '0',
        name: 'Luca',
        surname: 'Rossi',
        age: 30,
        adrress: {
            city: 'Milano',
            street: 'Via Roma',
            civicNr: '3',
            cap: 90000
        },
        interests: ['books', 'music']
    },

    {
        id: '1',
        name: 'Marco',
        surname: 'Verdi',
        age: 25,
        adrress: {
            city: 'Roma',
            street: 'Via Milano',
            civicNr: '4',
            cap: 90001
        },
        interests: ['sports', 'travel']
    }

]

module.exports = { users };