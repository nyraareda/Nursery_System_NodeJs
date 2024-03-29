const bcrypt = require('bcryptjs');
const schemaTeacher = require("../models/teacherModel");
const jwt = require('jsonwebtoken');
const Key = process.env.SECRET_KEY; // Accessing the SECRET_KEY environment variable

exports.hashedLogin = (req, res, next) => {
    let password = req.body.password;
    let email = req.body.email;
    schemaTeacher.findOne({ email: req.body.email })
        .then((teacher) => {
            if (teacher) {
                bcrypt.compare(password, teacher.password)
                    .then((auth) => {
                        if (auth) {
                            let role = "Teacher";
                            if (email == "admin@test.com" && password == "Admin12345_") {
                                role = "Admin";
                            }
                            const expiresIn = '1h'; // Token expires in 1 hour
                            const tokenPayload = {
                                id: teacher._id,
                                role: role
                            };
                            const token = jwt.sign(tokenPayload, Key, { expiresIn });
                            res.status(200).json(token);
                        } else {
                            let error = new Error("Incorrect Password");
                            error.statusCode = 401;
                            throw error;
                        }
                    }).catch((error) => { next(error) })
            } else {
                let error = new Error("Incorrect Email");
                error.statusCode = 401;
                throw error;
            }
        }).catch((error) => { next(error) });
};