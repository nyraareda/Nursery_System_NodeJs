const express = require("express");
const upload = require("../Midelwares/multerImageValidator");
const controller = require("./../Controller/teacherController");
const validationResult = require("./../Midelwares/validations/validatorResult");
const isAdmin = require("../Midelwares/authMW");
const isAuthTeacherOrAdmin = require("../Midelwares/authMW");
const isTeacherOrAdmin = require("../Midelwares/authMW");

// const {isTeacher,isAdmin,isAuthTeacher,isTeacherOrAdmin,isAuthTeacherOrAdmin} = require("../Midelwares/authMW");
const {
  insertValidator,
  updateValidator,
  deleteValidator,
} = require("./../Midelwares/validations/teacherValidator");

const router = express.Router();

router.route("/teachers")
  .get(isAdmin, controller.getAllteachers)
  .post(isAdmin, upload, insertValidator, validationResult, controller.insertTeacher)
  .patch(isAuthTeacherOrAdmin, upload, updateValidator, validationResult, controller.updateTeacher);


router
  .route("/teachers/:id")
  .get(isAuthTeacherOrAdmin,controller.getTeacherById)
  .delete(isAdmin,deleteValidator, validationResult, controller.deleteTeacher)
  .patch(isAuthTeacherOrAdmin,upload, updateValidator, validationResult, controller.updateTeacher);

router.route("/teachers/supervisors").get(isAdmin,controller.getSupervisorById);

router.patch('/teachers/changepassword/:id',isAdmin,updateValidator,validationResult,controller.changePassword)

module.exports = router;
