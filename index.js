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

app.get('/json', (req, res) => {
    res.json(users)
})

app.all('*', (req, res) => {
    res.sendFile('404.html', { root: __dirname + '/public' })
})

app.listen(3000)