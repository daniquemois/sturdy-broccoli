const express = require('express');
const router = express.Router();
const User = require("../models/users");

let session

// Als er een session is gestart ga je naar de ingelogd homepage en anders bij de homepage met een inlogbutton
router.get('/', (req, res) => {
    session = req.session;
    console.log(req.session);
    if(!session.accountnaam) {
        res.render('home', {'title': 'Homepagina'})
    } else {
        res.render('homeingelogd', {'title': 'Homepagina'})
    }
  });

// Op de accountpagina zie je jouw eigen ingevulde accountnaam en email
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

// De onderstaande router. zorgen alleen om je te redirecten naar de desbetreffende pagina
router.get('/login', (req, res) => {
res.render('login', {'title': 'Login'});
});

// Deze router redirect naar het account aanmaken
router.get('/accountaanmaken', (req, res) => {
    res.render('accountaanmaken', {'title': 'Account'});
});

// Deze router redirect naar de api
router.get('/api', (req, res) => {
res.render('api', {'title': 'Tijd'});
});

// Door het sterretje krijg je bij wat je ook typt de error 404
router.get('*', (req, res) => {
    res.render('pagenotfound', {'title': 'Error 404: Page not found'});
    });

module.exports = router;