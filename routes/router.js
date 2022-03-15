const express = require('express');
const router = express.Router();
const User = require("../models/users");

let session

router.get('/', (req, res) => {
    session = req.session;
    console.log(req.session);
    if(!session.accountnaam) {
        res.render('home', {'title': 'Homepagina'})
    } else {
        res.render('homeingelogd', {'title': 'Homepagina'})
    }
  });

router.get('/account', (req, res) => {
    session = req.session;
    if (!session.accountnaam) {
        res.redirect('/');
    } else {
        User.find({ accountnaam: session.accountnaam }).then((documents) => {
            let accountnaam = documents.map(user => user.accountnaam);
            let email = documents.map(user => user.email);
            res.render('account', {'title': 'Account', accountnaam: accountnaam, email: email});
        });
    }
  });

router.get('/login', (req, res) => {
res.render('login', {'title': 'Login'});
});


router.get('/accountaanmaken', (req, res) => {
    res.render('accountaanmaken', {'title': 'Account'});
});

router.get('/api', (req, res) => {
res.render('api', {'title': 'Tijd'});
});

module.exports = router;