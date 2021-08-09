const express = require ('express');
const auth = require('../controllers/authenticationController');
const products = require('../controllers/productController')
const router = express.Router();
router.route('/').get((req,res)=>{
    console.log(req.params)
    res.json({route : 'from router'})
})

router.route('/signin').post(auth.login);
router.route('/signup').post(auth.signup2);
router.route('/login').post((req, res)=>{
    console.log(req.body)
    res.send('working')
})
router.route('/uploadProduct').post(products.addProduct)
module.exports = router;