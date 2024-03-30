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


/**
 * @swagger
 * components:
 *   schemas:
 *     child:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The child id
 *         fullName:
 *           type: string
 *           description: The child full name
 *         age:
 *           type: number
 *           description: The child age
 *         level:
 *           type: string
 *           enum: ['PreKG', 'KG1', 'KG2']
 *           description: The child level 
 *         address:
 *           type: object
 *           description: The child address
 *           properties:
 *             city:
 *               type: string
 *               description: The address city
 *             street:
 *               type: string
 *               description: The address street
 *             building:
 *               type: string
 *               description: The address building
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

//Get all Childs
/**
 * @swagger
 * /child:
 *   get:
 *     summary: Returns the list of all the children
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/child'
 *       401:
 *         description: Unauthorized
*/

//Add new Child
/**
 * @swagger
 * /child:
 *   post:
 *     summary: Add a new child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The child's full name
 *               age:
 *                 type: number
 *                 description: The child's age
 *               level:
 *                 type: string
 *                 enum: ['PreKG', 'KG1', 'KG2']
 *                 description: The child's level
 *               address[city]:
 *                 type: string
 *                 description: The address city
 *               address[street]:
 *                 type: string
 *                 description: The address street
 *               address[building]:
 *                 type: string
 *                 description: The address building
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The child's image file (optional). If not provided, a default image will be used.
 *     responses:
 *       201:
 *         description: The child was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */


//get by ID
/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get the child by id
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The child id
 *     responses:
 *       200:
 *         description: The child data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/child'
 *       401:
 *         description: Unauthorized
 */


//delete by ID
/**
 * @swagger
 * /child/{id}:
 *   delete:
 *     summary: Delete a child from the database
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the child to delete
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       200:
 *         description: Child deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The specified child ID was not found
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


//update by id
/**
 * @swagger
 * /child/{id}:
 *   patch:
 *     summary: Update child data
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The child id (Number)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The updated full name of the child
 *               age:
 *                 type: number
 *                 description: The updated age of the child
 *               level:
 *                 type: string
 *                 enum: ['PreKG', 'KG1', 'KG2']
*                 description: The updated level of the child
 *               address[city]:
 *                 type: string
 *                 description: The updated city in the address
 *               address[street]:
 *                 type: string
 *                 description: The updated street in the address
 *               address[building]:
 *                 type: string
 *                 description: The updated building in the address
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The updated image of the child (optional). If not provided, the existing image will be retained.
 *     responses:
 *       '201':
 *         description: The child was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '404':
 *         description: The child id was not found
 *       '500':
 *         description: Internal server error
 */


router
  .route("/child")
  .all(isAdmin)
  .get(controller.getAllChilds)
  .post(upload, insertValidator, validationResult, controller.insertChild);

router
  .route("/child/:id")
  .get(controller.getChildById)
  .delete(deleteValidator, validationResult, controller.deleteChild)
  .patch(upload, updateValidator, validationResult, controller.updateChild);

module.exports = router;