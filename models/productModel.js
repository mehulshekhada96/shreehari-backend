const mongoose = require('mongoose');
const descriptionSchema = mongoose.Schema({
    reviews :  [String],
    ratings : [Number],
    height: Number,
    width: Number,
    depth: Number,
    weight: Number,
    sizeType: {
        type: String,
        enum: ['fixed', 'flexible']
    },
    color: String,
    lockType: String,
    material: String,
    surfaceFinish: String,
    occassion: [String],
    styleOfJwellery : String,
    symbol : String,
    idealFor : [String],
    brand : [String],
    salesPackage: String 
})
const productSchema = mongoose.Schema({
    category : {
        type: String,
        required : [true, "must specify category of product"]
    },
    itemName: {
        type: String,
        required : [true, 'Must Specify name of product']
    },
    description : descriptionSchema,
    images: [String],
    price: {
        type: [Number, 'Enter valid price'],
        required : [true, 'Must specify price of product']
    },
    oldprice: Number,
    date : Date,
    quantity: {
        type: Number,
        required: [true,'Quantity of Product Needed']
    },
    vendor: {
        type: string
    },
    SKU  : String,
    tags: [String],
})
const Products = mongoose.model('Products', productSchema)