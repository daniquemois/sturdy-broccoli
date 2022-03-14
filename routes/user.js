const express = require("express")
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

// app.post('/inloggen', urlencodedparser, (req, res) => {
//     res.send('Gebruikersnaam: ' + req.body.aname + '<br>Wachtwoord: ' + req.body.password)
//   })


module.exports = router;