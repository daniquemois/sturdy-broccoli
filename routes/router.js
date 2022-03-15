const express = require('express');
const router = express.Router();

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
res.render('account', {'title': 'Account'});
});

router.get('/login', (req, res) => {
res.render('login', {'title': 'Login'});
});


router.get('/accountaanmaken', (req, res) => {
    res.render('accountaanmaken', {'title': 'Account'});
});

router.get('/settings', (req, res) => {
res.render('settings', {'title': 'Instellingen'});
});

module.exports = router;