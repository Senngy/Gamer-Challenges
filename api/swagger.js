// swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Gamer Challenges API",
    description: "Documentation auto-générée de l'API",
  },
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT token. Exemple : 'Bearer <votre_token>'",
    },
  },
};

const outputFile = "./swagger-output.json"; // fichier généré
const endpointsFiles = ["./app.js"]; // point d'entrée à scanner

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger file generated ✅");
});
