const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    voornaam: {
        type: String,
        required: true
    },
    achternaam: {
        type: String,
        required: true
    },
    accountnaam: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    wachtwoord: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", Users)