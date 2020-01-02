const router = require('express').Router();
const Snus = require('../models/Snus');

const {addSnusValidation} = require('../validation');

// Add new snus to database
router.post('/', async (req, res) => {
    // VALIDATE DATA BEFORE WE MAKE A REQUEST
    const {error} = addSnusValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CREATE NEW SNUS OBJECT
    const snus = new Snus({
        brand: req.body.brand,
        product: req.body.product,
        snusType: req.body.snusType,
        nicotineAmount: req.body.nicotineAmount,
        amountPerBox: req.body.amountPerBox,
        producer: req.body.producer,
        misc: req.body.misc
    });

    // SAVE THE NEW SNUS OBJECT TO DATABASE
    try {
        // save
        const savedSnus = await snus.save();
        // respond
        res.send({savedSnus});
    } catch (err) {
        // if error respond with 400 status 
        res.status(400).send(err);
    }
});


module.exports = router;


