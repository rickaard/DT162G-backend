// importera och initiera express
const express = require('express');
const app = express();
const cors = require('cors');
// importerar paketet mongoose som hanterar MongoDB
const mongoose = require('mongoose');

// importerar och inierar paketet dotenv som hanterar miljövariablar
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const postRoute = require('./routes/posts');


// Connect to MongoDB
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Connected to DB');
    }
);
// Get Mongoose schema
const Snus = require('./models/Snus');

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());


// Route middlewares
app.use('/api/snus', postRoute);
app.use('/api/admin', authRoute);
app.use('/api/admin', adminRoute);

// Route
// Get all snus's
app.get('/api/snus', (req, res) => {
    // Get all snus from database, but only specified fields
    Snus.find({}, {brand: 1, product: 1, snusType: 1, nicotineAmount: 1, amountPerBox: 1, producer: 1, misc: 1, _id: 1,}, (err, snus) => {
        if (err) return res.status(500).send(err);
        if (snus.length == 0) return res.send({message: "Inga snus tillagda ännu"});
        return res.send({snus});
    })
});
app.get('/api/snus/:id', (req, res) => {
    // Hämta enskild snus med specifikt ID
    Snus.find({_id: req.params.id}, {brand: 1, product: 1, snusType: 1, nicotineAmount: 1, amountPerBox: 1, producer: 1, misc: 1, _id: 0,}, (err, snus) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(snus);
    })
})


app.listen(3001, () => console.log('Server is up and running on port 3001'));