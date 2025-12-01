/**
 * Normalized HTTP error types
 */
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, data?: unknown) {
    super(400, message, data);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', data?: unknown) {
    super(401, message, data);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', data?: unknown) {
    super(403, message, data);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found', data?: unknown) {
    super(404, message, data);
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error', data?: unknown) {
    super(500, message, data);
    this.name = 'InternalServerError';
  }
}

