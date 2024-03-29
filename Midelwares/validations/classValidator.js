const {body,param,query}=require("express-validator");
exports.insertValidator = [
    body("_id")
        .isInt()
        .withMessage("ID should be an integer"),
    body("name")
    .isString()
        .withMessage("Name should be a string"),
    body("supervisor")
    .optional()
    .isMongoId()
    .withMessage("enter valid supervisorId"),
    body("children")
        .isArray()
        .withMessage(" should be an array of student IDs")
];

exports.updateValidator = [
    body("_id")
        .optional()
        .isInt()
        .withMessage("ID should be an integer"),
    body("name")
        .optional()
        .isString()
        .withMessage("Name should be a string"),
    body("supervisor")
        .optional()
        .isMongoId()
        .withMessage("enter valid supervisorId"),
    body("children")
        .optional()
        .isArray()
        .withMessage("should be an array of child IDs")
];
exports.deleteValidator = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer')
];
