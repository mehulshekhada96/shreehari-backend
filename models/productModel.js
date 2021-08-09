const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, "must specify category of product"],
  },
  itemName: {
    type: String,
    required: [true, "Must Specify name of product"],
  },
  reviews: [String],
  ratings: [Number],
  height: Number,
  width: Number,
  depth: Number,
  weight: Number,
  sizeType: {
    type: String,
    enum: ["fixed", "flexible"],
  },
  color: String,
  lockType: String,
  material: String,
  surfaceFinish: String,
  occassion: [String],
  styleOfJwellery: String,
  symbol: String,
  idealFor: [String],
  brand: [String],
  salesPackage: String,
  images: [String],
  price: {
    type: [Number, "Enter valid price"],
    required: [true, "Must specify price of product"],
  },
  oldprice: Number,
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity of Product Needed"],
  },
  vendor: {
    type: String,
  },
  SKU: String,
  tags: [String],
});
const Products = mongoose.model("Products", productSchema);
module.exports = Products;
