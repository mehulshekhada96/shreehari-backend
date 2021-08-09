const Product = require('../models/productModel');

const addProduct = async (req, res) =>{
         console.log(req.body);
         let bodyObject = req.body;
         let queryObject = {};
         for(let key in bodyObject){
             Object.assign(queryObject,{[key]: bodyObject[key]})
         }
        //  console.log(queryObject);
    //   const newProduct =   await Product.create(queryObject)
    res.json({message: 'Got it'})
}

module.exports = {
    addProduct
}