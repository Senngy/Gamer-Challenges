// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gamer Challenges API",
      version: "1.0.0",
      description: "Documentation de l'API Gamer Challenges",
    },
    servers: [
      { url: BASE_URL, description: "Serveur API actuel" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Entrer le token JWT avec 'Bearer <token>'",
        },
      },
    },
  },
  apis: ["./routes/*.routes.js"], // Chemin vers tes fichiers de routes avec JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger UI available at ${BASE_URL}/docs`);
}
