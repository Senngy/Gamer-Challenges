import { StatusCodes } from "http-status-codes";

export function errorHandler(err, _req, res, _next) {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    error: true,
    message: err.message || "Erreur serveur",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}