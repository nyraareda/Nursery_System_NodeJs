require('dotenv').config();
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const loginRoute = require("./Routes/authRoute");
const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRoute");

const server = express();

// Serve static files
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB using environment variable
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");

    // Swagger definition
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Your API Title',
          version: '1.0.0',
          description: 'Description of your API'
        },
        basePath: '/',
      },
      apis: ['./Routes/*.js'], // Specify the path to your route files
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    // Serve Swagger UI
    server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Middleware for logging requests
    server.use((request, response, next) => {
      console.log(request.url, request.method);
      next();
    });

    server.use(express.json());
    server.use(loginRoute);
    server.use(teacherRoute);
    server.use(childRoute);
    server.use(classRoute);

    server.use((request, response, next) => {
      response.status(404).json({ data: "Not Found" });
    });

    server.use((error, request, response, next) => {
      console.error(error.stack);
      response.status(500).json({ data: "Internal Server Error" });
    });

    // Start the server using the PORT environment variable
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
      console.log("Server is listening on port", port);
    });
  })
  .catch((error) => {
    console.log("DB problem " + error);
  });