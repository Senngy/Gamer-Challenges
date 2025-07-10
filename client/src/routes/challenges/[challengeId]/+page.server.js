// src/routes/challenges/[challengesId]/+page.server.js

export function load({ params }) {
  const { challengeId } = params;

  // if (!challengeId) {
  //   console.warn("Paramètre challengeId manquant !");
  //   return {};
  // }
  
  console.log(`SERVER Bonjour je suis le ${challengeId}`);
  return { challengeId };
}