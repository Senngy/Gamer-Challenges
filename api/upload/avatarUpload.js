import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../server/supabaseClient.js';

// Pour __dirname avec ESModules (si tu es en "type": "module" dans package.json)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du stockage local
const storage =
  process.env.NODE_ENV === 'production'
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../uploads/avatars'));
        },
        filename: function (req, file, cb) {
          const ext = path.extname(file.originalname);
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
          cb(null, uniqueName);
        },
      });

// Filtrer les types de fichiers
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
};

// Limiter la taille du fichier à 2 Mo
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

export default upload;