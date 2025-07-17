// src/routes/challenges/[challengesId]/+page.server.js


export async function load({ params }) {
  const { challengeId } = params;
  

  // if (!challengeId) {
  //   console.warn("Paramètre challengeId manquant !");
  //   return {};
  // }
  try {
    const challengeRes = await fetch(`http://localhost:3000/challenges/${challengeId}`)
    const challenge = await challengeRes.json();
    return { challenge, challengeId };
  } catch (err) {
    console.error('Erreur dans +page.server.js :', err);
    throw error(500, 'Erreur lors du chargement des données');
  }
  //console.log(`SERVER Bonjour je suis le ${challengeId}`);
  
}

