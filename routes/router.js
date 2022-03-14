const express = require('express');
const router = express.Router();

let session

router.get('/', (req, res) => {
    res.render('home', {'title': 'Homepagina'});
  });

router.get('/account', (req, res) => {
res.render('account', {'title': 'Account'});
});

router.get('/login', (req, res) => {
res.render('login', {'title': 'Login'});
});

module.exports = router;