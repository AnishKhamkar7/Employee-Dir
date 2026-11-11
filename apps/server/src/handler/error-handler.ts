import type { ErrorRequestHandler, RequestHandler } from "express";

const getPrismaErrorCode = (error: unknown) => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return undefined;
  }

  return error.code;
};

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const prismaErrorCode = getPrismaErrorCode(error);

  if (prismaErrorCode === "P2025") {
    response.status(404).json({ error: "Employee not found" });
    return;
  }

  if (prismaErrorCode === "P2002") {
    response
      .status(409)
      .json({ error: "An employee with this email already exists" });
    return;
  }

  if (
    error instanceof SyntaxError &&
    "status" in error &&
    error.status === 400
  ) {
    response.status(400).json({ error: "Request body contains invalid JSON" });
    return;
  }

  console.error("Request failed:", error);
  response.status(500).json({ error: "Internal server error" });
};

export const ErrorFactory = (
  response: Parameters<RequestHandler>[1],
  issues: { path: PropertyKey[]; message: string }[],
) => {
  response.status(400).json({
    error: "Validation failed",
    issues: issues.map(({ path, message }) => ({ path, message })),
  });
};
