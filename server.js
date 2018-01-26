
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n", (error) =>{
        if(error){
            console.log("Could not write to log!");
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: "Welcome to my website!",
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});
