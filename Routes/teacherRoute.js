const express = require("express");
const upload = require("../Midelwares/multerImageValidator");
const controller = require("./../Controller/teacherController");
const validationResult = require("./../Midelwares/validations/validatorResult");
const isAdmin = require("../Midelwares/authMW");
const isAuthTeacherOrAdmin = require("../Midelwares/authMW");
const isTeacherOrAdmin = require("../Midelwares/authMW");
const isTeacher = require("../Midelwares/authMW");
const {
  insertValidator,
  updateValidator,
  deleteValidator,
} = require("./../Midelwares/validations/teacherValidator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: The teacher full name
 *         email:
 *           type: string
 *           description: The teacher email
 *         password:
 *           type: string
 *           description: The teacher password
 *         image:
 *           type: string
 *           format: binary
 *           description: The teacher image
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: the message description
 *
 */

const router = express.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /teachers:
 *   Post:
 *     summary: add a new teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: The teacher was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers/{id}:
 *   patch:
 *     summary: Update teacher data
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *         description: The teacher id (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The teacher full name
 *               email:
 *                 type: string
 *                 description: The teacher email
 *               password:
 *                 type: string
 *                 description: The teacher password
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The teacher image
 *     responses:
 *       '201':
 *         description: The teacher was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '404':
 *         description: The teacher id was not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete a teacher from the database
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the teacher to delete
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The specified teacher ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /teachers/changepassword/{id}:
 *   patch:
 *     summary: Change the password
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *           format: objectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: The password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router
  .route("/teachers")
  .get(isAuthTeacherOrAdmin, controller.getAllteachers)
  .post(
    isAuthTeacherOrAdmin,
    upload,
    insertValidator,
    validationResult,
    controller.insertTeacher
  )
  .patch(
    isAuthTeacherOrAdmin,
    upload,
    updateValidator,
    validationResult,
    controller.updateTeacher
  );

router
  .route("/teachers/:id")
  .get(isAuthTeacherOrAdmin, controller.getTeacherById)
  .delete(
    isAuthTeacherOrAdmin,
    deleteValidator,
    validationResult,
    controller.deleteTeacher
  )
  .patch(
    isAuthTeacherOrAdmin,
    upload,
    updateValidator,
    validationResult,
    controller.updateTeacher
  );

router
  .route("/teachers/supervisors")
  .get(isAdmin, controller.getSupervisorById);

router.patch(
  "/teachers/changepassword/:id",
  isAdmin,
  updateValidator,
  validationResult,
  controller.changePassword
);

module.exports = router;
