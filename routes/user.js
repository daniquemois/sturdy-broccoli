const express = require("express")
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

const bcrypt = require('bcrypt');
const saltRounds = 10;

let session;

router.post('/inloggen', async (req, res) => {
    try {
        const getUser = await User.findOne({ username: req.body.accountnaam });
        if (getUser) {
          const comparePassword = await bcrypt.compare(req.body.wachtwoord, getUser.wachtwoord);
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
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/login');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).redirect('/login');
    }
});

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

router.post('/verwijdergebruiker', (req, res) => {
    console.log(req.body.accountnaam)
    User.find({ accountnaam: req.body.accountnaam }).remove().exec();
    res.redirect('/');
});

module.exports = router;