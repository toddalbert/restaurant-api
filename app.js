// import express server:
const express = require('express')
// install body-parser library to handle data in post requests:
const bodyParser = require('body-parser')
// import our "menu" function:
const { getMenu, addToMenu, searchMenu } = require('./src/menu')
// sets up our express server: calls it "app"
const app = express()
const port = process.env.PORT || 3005

// use body-parser for our server:
app.use(bodyParser.json())

// GET ROUTES
app.get('/foo', (req, res) => res.send('BAR!'))
app.get('/menu', getMenu) // returns the whole menu
app.get('/menu/:category', getMenu) // returns a menu section
app.get('/menu/search/:query', searchMenu)

// POST ROUTES
app.post('/menu/add', addToMenu) // adds a new menu item

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
