const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
// const {request} = require('../app')
const request = require('request')
const login =  async (req, res, next)=>{
    if(req.body.email && req.body.password){
        console.log(req.body.email, req.body.password);
		const user = await User.findOne({ email: req.body.email });
		if(user){
           
			const passwordCorrect = await user.comparePassword(req.body.password, user.password);
			if(passwordCorrect){
				req.session.errorType = 'Success';
				req.session.error = 'Login Successful';
				req.session.userId = user.id;
				req.session.user = user;
				// console.log(req.session.user.name)
				if(req.session.user.role === 'admin') res.send('welcome admin');
				else res.send('login success');	
			} else {
                console.log("No correct things")
				req.session.errorType = 'Failure';
				req.session.error = "Incorrect Email or Password."
				res.send('Incorrect Email or Password');	
             
			}
		} else {
			req.session.errorType = 'Failure';
			req.session.error = "Email Not Registered"
			res.redirect('/login');
            res.send("Email Not Registered")
		}
	}
}
 

const signUp = async (req, res, next) => {
	console.log(req.body)
  const newUser = await User.create({
    name: req.body.name,
    phoneNumber: req.body.phone,
    email: req.body.email,
    password: req.body.password,

  });
  req.session.userId = newUser.id;
  req.session.user = newUser;

  req.session.errorType = "Success";
  req.session.error = "Login Successful";
  res.send("signup success");
};

// Check if user is logged in if he is not then redirect to login page. 
const redirectLogin = (req, res, next) => {
	if(!req.session.userId){
		req.session.errorType = 'Failure';
		req.session.error = "Please Login First";
		res.send('Please Login First');
	} else {
		next();
	}
}

const redirectLogin2 = (req, res, next) => {
	if(!req.session.userId){
		res.redirect('/login');
	} else {
		next();
	}
}
const clearError = (req, res, next) => {
	req.session.error = "";
	next();
}


module.exports = {
    signUp : signUp,
    login: login,
	redirectLogin,
	redirectLogin2,
    clearError
}