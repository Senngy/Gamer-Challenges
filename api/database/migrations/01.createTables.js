// Import du tunnel de connexion (pour fermeture en fin de script)
import { sequelize } from "../models/index.js"
// Le sequelize a "conscience" des différents modèles

console.log("🗑️ Suppression des tables existantes..."); // Notamment pour relancer le script plusieurs fois si on veut faire un reset:db
// await sequelize.drop();

try {
  console.log("🚧 Synchronisation des tables...");
  
  await sequelize.sync({ force: true });

  console.log("✅ Tables créées avec succès !");
  process.exit(0);
} catch (error) {
  console.error("❌ Erreur lors de la création :", error);
  process.exit(1);
}

// Vérifie la migration en affichant la structure de la db
console.log("🗃️ Structure de la base de données : ", 
await sequelize.getQueryInterface().showAllTables());


console.log("✅ Migration OK ! Fermeture de la base..."); // On ferme le tunnel de connexion pour que le script s'arrête bien
await sequelize.close();