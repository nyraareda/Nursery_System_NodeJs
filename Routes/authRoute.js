const express = require("express");
const authController = require("../Controller/authController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The login email
 *         password:
 *           type: string
 *           description: The login password
 *             
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login on to the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: login is successful
 *       404:
 *         description: Incorrect Email or Password
 */

router.route('/login')
.post(authController.hashedLogin);

module.exports =router;

