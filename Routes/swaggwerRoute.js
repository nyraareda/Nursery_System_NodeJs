const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

/**
  * @swagger
  * tags:
  * 
  * - name: Auth
  *   description: Auth Api
  *  
  * - name: Teachers
  *   description: The Teachers API
  *  
  * - name: Children
  *   description: The Children API
  * 
  * - name: Classes
  *   description: The Classes API
  * 
  * 
  */

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Nursery Api',
        version: '1.0.0',
        description:"Simple Nursery System Api"
      },
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
    },
    apis: ['./Route/*.js']
  };

  const swaggerSpecs = swaggerJSDoc(options);

  router.use('/swagger',swaggerUi.serve)
        .get('/swagger',swaggerUi.setup(swaggerSpecs));

  module.exports = router;