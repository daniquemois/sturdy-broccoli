const express = require("express")
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

const bcrypt = require('bcrypt');
const saltRounds = 10;

let session;

// Dit is om in te loggen. Hij vergelijkt dan wat je hebt ingevuld met wat er in de database staat.
router.post('/inloggen', async (req, res) => {
    try {
        const getUser = await User.findOne({ accountnaam: req.body.accountnaam });
        if (getUser) {
            console.log(req.body.wachtwoord);
            console.log(getUser.wachtwoord)
          const comparePassword = await bcrypt.compare(req.body.wachtwoord, getUser.wachtwoord);
          console.log(comparePassword)
          if (comparePassword) {
            console.log("Succesvol ingelogd!");
            session = req.session;
            session.accountnaam = req.body.accountnaam;
            return res.status(200).redirect('/');
          } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/login');
          }
        } else {
            console.error("Geen user gevonden");
            return res.status(404).redirect('/login');
        }
    } catch (error) {
        // Als dit niet zo is kom je er dus niet in
        console.error(error);
        return res.status(500).redirect('/login');
    }
});

// Hiermee maak je een account aan en slaat hij dit op in de database
router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.wachtwoord, saltRounds);
    const createUser = new User({
        voornaam: req.body.voornaam,
        achternaam: req.body.achternaam,
        accountnaam: req.body.accountnaam,
        email: req.body.email,
        wachtwoord: hashedPassword
    });

    createUser.save((error) => {
        if (error) {
            console.error(error);
            return res.status(500).redirect('/accountaanmaken');
        } else {
            console.log("Account aangemaakt!")
            session = req.session;
            session.accountnaam = req.body.accountnaam;
            return res.status(200).redirect('/');
        }
    });
});

// Hiermee verwijder je de gebruiker
router.post('/verwijdergebruiker', (req, res) => {
    console.log(req.session.accountnaam)
    User.find({ accountnaam: req.session.accountnaam }).remove().exec();
    req.session.destroy();
    res.redirect('/');
});

// Hiermee destroy je de sessie en log je dus uit
router.post('/uitloggen', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Hiermee kan je je acccountnaam en je email wijzigen
router.post('/update', (req, res) => {
    session = req.session;
    User.updateOne({ accountnaam: session.accountnaam }, { accountnaam: req.body.accountnaam, email: req.body.email }).exec();
    session.accountnaam = req.body.accountnaam;
    res.redirect('/');
})

module.exports = router;