var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

// GET route
app.get('/key', function (req, res) {
    res.json(process.env.API_KEY)
})

