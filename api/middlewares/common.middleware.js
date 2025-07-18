import { StatusCodes } from "http-status-codes";
import multer from 'multer';

export function errorHandler(err, _req, res, _next) {
  
  console.error(err); // Toujours logger l'erreur côté serveur

  if (err instanceof multer.MulterError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'Fichier trop lourd ou invalide',
    });
  }

  if (err.message === 'Type de fichier non autorisé') {
    return res.status(StatusCodes.UNSUPPORTED_MEDIA_TYPE).json({
      error: true,
      message: err.message,
    });
  }
  // Si err.status est défini, on l'utilise sinon INTERNAL_SERVER_ERROR
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

   res.status(status).json({
    error: true,
    message: err.message || "Erreur serveur",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}