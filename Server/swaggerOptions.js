const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'WSA SERVER API DOCUMENTATION',
      version: '1.0.0',
      description: 'API documentation for WSA Server',
    },
    servers: [
      {
        url: 'https://wsa-v1.onrender.com',
      },
    ],
  },
  apis: ['./controllers/wsa.controller.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
