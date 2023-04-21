require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = 3000


// MongoDB configuration
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
app.use(methodOverride('_method'))
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

// Show Route
app.get('/logs/:id', (req,res) => {
    Logs.findById(req.params.id, (error, foundLog) => {
        res.render('Show', {Logs: foundLog})
    })
})

// ! DELETE ROUTE

app.delete('/logs/:id', (req,res) => {
    Logs.findByIdAndRemove(req.params.id, (error, deletedLog) => {
        res.redirect('/logs/')
    })
})

app.get('/logs/:id/edit', (req,res) => {
    Logs.findById(req.params.id, (error, foundLog) => {
        res.render('Edit', {Logs: foundLog})
    })
})

app.put('/logs/:id', (req,res) => {
    Logs.findByIdAndUpdate(req.params.id, (error, updatedLog) => {
        res.redirect('/logs/').catch((error) => {
            console.error(error);
        })
    })
})

// Not Found Routee
app.get('*', (req,res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    connectToMongoDB()
})

