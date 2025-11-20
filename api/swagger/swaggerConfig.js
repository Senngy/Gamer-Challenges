// swagger/swaggerConfig.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation de l'API avec Swagger",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
  },

  // Indique où Swagger doit aller chercher les annotations
  apis: ["./routes/*.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
