const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT || 4000;
// let url = "mongodb://localhost:27017/test";
let url = "mongodb+srv://abdemustafa:admin@cluster0.cgiryyt.mongodb.net/test";

//Conneted to db
mongoose.connect(url, (err) => {
    if (err) throw err;
    else console.log("db Connected");
})

//Schema
let Schema = new mongoose.Schema({
    FName: {
        type: String
    },
    LName: {
        type: String
    },
    Tel: {
        type: Number
    },
    Email: {
        type: String
    },
    Time: {
        type: String
    },
    Date: {
        type: Date
    }
})

//modal 
const Appointment = new mongoose.model('appointment', Schema);

const app = express(); //express app creating
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))

const staticPath = path.join(__dirname, 'public')
app.set('view engine', 'hbs')
app.use(express.static(staticPath));

app.post('/appointment', async (req, res) => {
    const appointment = await new Appointment({
        FName: req.body.fname,
        LName: req.body.lname,
        Tel: req.body.tel,
        Email: req.body.email,
        Time: req.body.time,
        Date: req.body.date
    }).save();
 console.log(appointment);
    res.render('../public/index')
})


app.listen(port, () => {
    console.log(`Example app listening on port: http://localhost:${port}`)
});