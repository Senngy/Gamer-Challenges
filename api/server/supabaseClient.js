// src/lib/server/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const bucketName = process.env.SUPABASE_BUCKET_AVATARS;

// 🔹 Fonction pour tester la connexion au bucket
export async function testSupabaseBucket() {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list('');
    if (error) throw error;

    console.log(`✅ Supabase bucket "${bucketName}" accessible. ${data.length} objets listés.`);
    return true;
  } catch (err) {
    console.error(`❌ Impossible d'accéder au bucket "${bucketName}":`, err.message);
    return false;
  }
}

export default supabase;