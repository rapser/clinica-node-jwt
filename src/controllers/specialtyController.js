const { Router } = require('express');
const router = Router();

const Specialty = require('../models/Specialty');

router.get('/specialties', async (req, res) => {

    const specialties = await Specialty.find();
    // console.log(specialties);
    res.json(specialties);
})

router.post('/specialty', async (req, res) => {

    const { name } = req.body;

    const specialty = new Specialty ({
        name: name
    });

    await specialty.save();
    res.json({auth: true})
})

module.exports = router;