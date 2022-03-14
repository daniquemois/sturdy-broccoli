const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 1337
require('dotenv').config();
const connectDB = require("./config/db.js")

connectDB();

const router = require("./routes/router")
const user = require("./routes/user")

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.use("/", router)

app.use("/", user)

app.listen(port);

