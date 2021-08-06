const express = require ('express');
const auth = require('../controllers/authenticationController');

const router = express.Router();
router.route('/').get((req,res)=>{
    console.log(req.params)
    res.json({route : 'from router'})
})

router.route('/signin').post(auth.login);
router.route('/signup').post(auth.signUp);
router.route('/login').post((req, res)=>{
    console.log(req.body)
    res.send('working')
})
module.exports = router;