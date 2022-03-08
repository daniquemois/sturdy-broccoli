const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const port = process.env.PORT || 5000

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.get('/', (req, res) => {
  res.render('home', {'title': 'Homepagina'});
});

app.get('/account', (req, res) => {
  res.render('account', {'title': 'Account'});
});

app.get('/login', (req, res) => {
  res.render('login', {'title': 'Login'});
});

app.listen(3000);

var persoon = "test";

