require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const connectToMongoDB = require('./config/db')
const Logs = require('./models/logs')


// View config
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine())


// Middleware
app.use((req, res, next) => {
    console.log('I run on all routes!');
    next();

});
// parses the data from the request
app.use(express.urlencoded({extended: false}))
// override using a query value
// app.use(methodOverride('_method'))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.send('<h1>Hello World</h1>')
})


// Index Route
app.get('/logs/', (req,res) => {
    Logs.find({}, (error, allLogs) => {
        res.render('Index', {Logs: allLogs})
    })
})


// New Route
app.get('/logs/new', (req,res) => {
    res.render('New')
})

// Post Method
app.post('/logs/', (req,res) => {
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }


    Logs.create(req.body).then(Logs => {
        res.redirect('/logs')
    }).catch((error) => {
        console.error(error);
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    connectToMongoDB()
})

