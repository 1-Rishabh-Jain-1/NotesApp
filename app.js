require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Static files
app.use(express.static('public'));

//Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.log(`Listening on port ${PORT}`);
})