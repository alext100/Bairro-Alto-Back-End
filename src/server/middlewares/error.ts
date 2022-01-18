import getDebug from "debug";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

const debug = getDebug("bairro:errors");

const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

const generalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  debug("An error has occurred: ", error.message);
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error);
  }
  const message = error.code ? error.message : "General error";
  res.status(error.code || 500).json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
