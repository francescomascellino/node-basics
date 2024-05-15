const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1></h1> <p><a href="/about">About</a></p><p><a href="/404">Visit Error page</a></p>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1></h1> <p>Back to <a href="/">home</a></p>')
})


app.all('*', (req, res) => {
    res.send(`<h1>404: Resource non found.</h1> <p>Back to <a href="/">home</a></p>`)
})

app.listen(3000)