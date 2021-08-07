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
				if(req.session.user.role === 'admin') res.json({user, message: 'welcome admin'});
				else res.json({user, message: 'login success'});	
			} else {
                console.log("No correct things")
				req.session.errorType = 'Failure';
				req.session.error = "Incorrect Email or Password."
				res.json({message: 'Incorrect Email or Password'});	
             
			}
		} else {
			req.session.errorType = 'Failure';
			req.session.error = "Email Not Registered"
		
            res.json({message: "Email Not Registered"})
		}
	}
}
const signup2 =  async (req, res, next)=>{
   
        console.log(req.body.email, req.body.password);
		const user = await User.findOne({ email: req.body.email });
		const user1 = await User.findOne({ phoneNumber: req.body.phone });
		if(user){
           
			res.json({message: "Email is already Registered, try with other"})
			
		}else if(user1){
			res.json({message: "Phone Number is already Registered, try with other"})
		} 
		else {
			const newUser = await User.create({
				name: req.body.name,
				phoneNumber: req.body.phone,
				email: req.body.email,
				password: req.body.password,
			
			  }).then(data=>{
				console.log('signed up',data)  
				res.status(200).json({message :"Signup success",data})})
		}
	
}

const signUp = async (req, res, next) => {
	console.log(req.body)
  const newUser = await User.create({
    name: req.body.name,
    phoneNumber: req.body.phone,
    email: req.body.email,
    password: req.body.password,

  }).then(data=>{
	console.log('signed up',data)  
	res.status(200).json({message :"Signup success",data})})
  .catch(error=>res.status(400).json({message: 'Email is registered', error}));
//   req.session.userId = newUser.id;
//   req.session.user = newUser;

//   req.session.errorType = "Success";
//   req.session.error = "Login Successful";
//   res.send("signup success");
//   next();
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
    clearError,
	signup2
}