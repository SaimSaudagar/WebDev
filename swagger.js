const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

/* 
   `endpointsFiles` should point to the file(s) where your endpoints are defined.
   If your routes are spread across multiple files and not imported in `app.js`, 
   list them all here instead of just './app.js'.
*/

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js'); // Your app.js file path
});
