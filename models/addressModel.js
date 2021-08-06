const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Every user must have a First name'],
		validate: {
			validator: function(fname){
				return `${fname}`.length >= 3;
			},
			message: err => `${err.value} is not a valid Firstname`
		}
    },
    lastname: {
        type: String,
        required: [true, 'Every user must have a First name'],
		validate: {
			validator: function(fname){
				return `${fname}`.length >= 3;
			},
			message: err => `${err.value} is not a valid Lastname`
		}
    },
    company : String,
    address1 : {
        type: String,
        required: [true, 'Every user must have a Address'],
		validate: {
			validator: function(fname){
				return `${fname}`.length >= 8;
			},
			message: err => `${err.value} is not a valid address`
		}
    },
    address2 : {
        type: String,
       
		validate: {
			validator: function(fname){
				return `${fname}`.length >= 8;
			},
			message: err => `${err.value} is not a valid address`
		}
    },
    city:{
        type: String
    },
    State: {
        type: String,
        required: [true, 'State/Province is required']
    },
    country : {
        type: String,
        required : [true, 'Every user must have country']
    },
    postalCode : {
        type: Number,
    },
    phoneNumber: {
		type: Number,
		required: [true, 'Every user must have a phone number'],
		unique: true,
		validate: {
			validator: function(number){
				return `${number}`.length === 10;
			},
			message: err => `${err.value} is not a valid number`
		}
	}
})

const Address = mongoose.model('Address', addressSchema)
module.export = Address