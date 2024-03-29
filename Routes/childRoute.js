const express = require("express");
const upload = require("../Midelwares/multerImageValidator");
const controller = require("../Controller/childController");
const validationResult = require("../Midelwares/validations/validatorResult");
const isAdmin = require("../Midelwares/authMW");
const {
  insertValidator,
  updateValidator,
  deleteValidator,
} = require("../Midelwares/validations/childValidator");

const router = express.Router();

router
  .route("/child")
  .get(controller.getAllChilds)
  .post(upload, insertValidator, validationResult, controller.insertChild);

router
  .route("/child/:id")
  .all(isAdmin)
  .get(controller.getChildById)
  .delete(deleteValidator, validationResult, controller.deleteChild)
  .patch(upload, updateValidator, validationResult, controller.updateChild);

module.exports = router;
