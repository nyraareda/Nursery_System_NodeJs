const { body, param, query } = require("express-validator");
const schemaTeacher = require("../../models/teacherModel");
exports.insertValidator = [
  body("fullName")
    .isAlpha()
    .withMessage("teacher fullname should be string")
    .isLength({ min: 5 }),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const existingTeacher = await schemaTeacher.findOne({ email: value });
      if (existingTeacher) {
        console.log("Email already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];
exports.updateValidator = [
  param("id")
    .isMongoId()
    .withMessage("Teacher ID should be a valid MongoDB ObjectId"),
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage(
      "Teacher full name should be a string and contain only alphabetic characters"
    )
    .isLength({ min: 5 })
    .withMessage("Teacher full name should be at least 5 characters long"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const existingTeacher = await schemaTeacher.findOne({ email: value });
      if (existingTeacher) {
        console.log("Email already exists");
      }
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];

exports.deleteValidator = [
  param("_id")
    .optional()
    .isMongoId()
    .withMessage("Teacher ID should be a valid MongoDB ObjectId"),
];
