const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const schemaTeacher = require("../models/teacherModel"); // Import the schemaTeacher model



const Key = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        let token = req.get('authorization').split(" ")[1];
        let decodedToken = jwt.verify(token, Key);
        req.token = decodedToken;
        next();
    } catch (error) {
        res.status(404).json({message:'Not Authorized'});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.token && req.token.role === "Admin") {
        next();
    } else {

        res.status(404).json({message:'Not Authorized'});

    }
}
// module.exports=verifyToken
module.exports.isTeacher=(req,res,next)=>{
    if(req.token.role=="Teacher"){
        next();
    }else{
        res.status(404).json({message:'Not Authorized'});

    }
}

module.exports.registerTeacher = (req, res, next) => {
    const { email, password } = req.body;
    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        // Create a new teacher document in the database
        schemaTeacher.create({ email, password: hashedPassword })
            .then((teacher) => {
                res.status(201).json({ message: "Teacher registered successfully" });
            })
            .catch((err) => {
                next(err);
            });
    });
};
module.exports.isAuthTeacher=(req,res,next)=>{
    if(req.token.role=="Teacher" && req.token._id==req.body._id){
        next();
    }else{
        res.status(404).json({message:'Not Authorized'});
        
    }
}

module.exports.isTeacherOrAdmin=(req,res,next)=>{
    if(req.token.role=="Teacher"||req.token.role=="Admin"){
        next();
    }else{
        res.status(404).json({message:'Not Authorized'});
    }
}

module.exports.isAuthTeacherOrAdmin=(req,res,next)=>{
    if((req.token.role=="Teacher" && req.token._id==req.body._id)||req.token.role=="Admin"){
        next();
    }else{
        res.status(404).json({message:'Not Authorized'});

    }
}