const router = require('express').Router();
const verify = require('./verifyToken');

const Snus = require('../models/Snus');

router.get('/:status', verify, (req, res) => {
    // Hämta alla snus från DB med det specifika status-värdet (1, 2 eller 3)
    Snus.find({status: req.params.status}, (err, snus) => {
        if (err) return res.status(500).send(err);
        if (snus.length == 0) return res.send({message: "Inga snus tillagda ännu"});
        return res.send({snus});
    });
});

router.get('/:id', verify, (req, res) => {
    // Hämta enskild snus med specifikt ID
    Snus.find({_id: req.params.id}, (err, snus) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(snus);
    })
})

router.post('/', verify, (req, res) => {
    // Lägg till ny snus i DB
    res.send('bara tillåtet med token, post');
});

router.put('/:id', verify, (req, res) => {
    // Ändra en snus i DB
    Snus.findByIdAndUpdate(req.params.id, req.body, (err, snus) => {
        if (err) return res.status(500).send(err);
        return res.json({message: "Snus uppdaterad", status: "ok"});
    })
});

router.delete('/:id', verify, (req, res) => {
    // Ta bort en snus i DB
    Snus.deleteOne({_id: req.params.id}, (err, snus) => {
        if (err) return res.status(500).send(err);
        return res.json({message: "Snus raderad", status: "ok"});
    });
});

module.exports = router;

