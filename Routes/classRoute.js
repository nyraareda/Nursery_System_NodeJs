const express = require("express");
const controller = require("../Controller/classController");
const validationResult = require("../Midelwares/validations/validatorResult");
const { insertValidator, updateValidator, deleteValidator } = require("../Midelwares/validations/classValidator");

const router = express.Router();

router.route("/class")
  .get(controller.getAllclasses)
  .post(insertValidator, validationResult, controller.addNewclass);

router.route("/class/:id")
  .get(controller.getclassById)
  .delete(deleteValidator, validationResult, controller.deleteClass)
  .patch(updateValidator, validationResult, controller.updateClass);

router.route("/class/child/:id")
  .get(controller.getChildInfo);

router.route("/class/teacher/:id")
  .get(controller.getSupervisorInfo);

module.exports = router;
