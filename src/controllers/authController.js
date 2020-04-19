const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const verifyToken = require('./verifyToken');

router.post('/signup', async (req, res, next) => {

    const { username, email, password, documentType, lastname, surname, documentNumber, 
        name, gender, borndate, phone , photo, typeInsurance, haveInsurance } = req.body;

    const user = new User ({
        username: username,
        email: email,
        password: password,
        documentType: documentType,
        lastname: lastname,
        surname: surname,
        documentNumber: documentNumber,
        name: name,
        gender: gender,
        borndate: borndate,
        phone: phone,
        photo: photo,
        typeInsurance: typeInsurance,
        haveInsurance: haveInsurance
    });

    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });
    
    res.json({auth: true, token});

})

router.get('/me', verifyToken, async (req, res, next) => {

    const user = await User.findById(req.userId, {password: 0});
    if(!user){
        return res.status(404).send('no user found');
    }

    res.json(user);
})

router.post('/signIn', async (req, res, next) => {

    const  {email, password} = req.body;
    const user = await User.findOne({email: email});

    if (!user){
        return res.status(400).send("The email doesnt exist");
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword){
        return res.status(400).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token});
})



module.exports = router;