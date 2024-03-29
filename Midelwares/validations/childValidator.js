const { body, param } = require("express-validator");

exports.insertValidator = [
    body("fullName")
        .isString()
        .withMessage("Full name should be a string")
        .isLength({ min: 5 })
        .withMessage("Full name should be at least 5 characters long"),
    body("age")
        .isInt({ min: 1 })
        .withMessage("Age should be a positive integer"),
    body("level")
        .isIn(['PreKG', 'KG1', 'KG2'])
        .withMessage("Invalid level. Valid levels are PreKG, KG1, KG2"),
    body("address.city")
        .isString()
        .withMessage("City should be a string"),
    body("address.street")
        .isString()
        .withMessage("Street should be a string"),
    body("address.building")
        .isString()
        .withMessage("Building should be a string")
];

exports.updateValidator = [
    param("id")
        .isInt()
        .withMessage("ID should be a number"),
    body("fullName")
        .optional()
        .isString()
        .withMessage("Full name should be a string")
        .isLength({ min: 5 })
        .withMessage("Full name should be at least 5 characters long"),
    body("age")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Age should be a positive integer"),
    body("level")
        .optional()
        .isIn(['PreKG', 'KG1', 'KG2'])
        .withMessage("Invalid level. Valid levels are PreKG, KG1, KG2"),
    body("address.city")
        .optional()
        .isString()
        .withMessage("City should be a string"),
    body("address.street")
        .optional()
        .isString()
        .withMessage("Street should be a string"),
    body("address.building")
        .optional()
        .isString()
        .withMessage("Building should be a string")
];

exports.deleteValidator = [
    param("id")
        .isInt()
        .withMessage("ID should be a number")
];
