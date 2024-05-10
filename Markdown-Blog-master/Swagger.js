const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Express Blog Documentation API with Swagger',
        version: '1.0.0',
        description: 'Documentation for Express API with Swagger',
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Development server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };
  
  const specs = swaggerJsdoc(options);
  
  module.exports = {
    swaggerUi,
    specs,
  };