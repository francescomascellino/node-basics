const express = require('express');

const app = express();

const { users } = require('./json');

app.use(express.static('/public'));

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
    res.json(usersPreview)
})

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const user = users.find(user => user.id == id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user)
})

app.all('*', (req, res) => {
    res.sendFile('404.html', { root: __dirname + '/public' })
})

app.listen(3000)