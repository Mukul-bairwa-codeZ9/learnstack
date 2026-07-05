import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'Internal server error';
    let details: unknown;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const errorResponse = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(errorResponse.message)) {
          code = 'VALIDATION_ERROR';
          message = 'Validation failed';
          details = errorResponse.message;
        } else {
          message = errorResponse.message ?? exception.message;
          code = this.getErrorCode(status);
        }
      }
    }

    const errorPayload: {
      code: string;
      message: string;
      details?: unknown; // Keeps details as unknown safely
    } = {
      code,
      message,
    };

    if (details !== undefined && details !== null) {
      errorPayload.details = details;
    }

    response.status(status).json({
      success: false,
      error: errorPayload,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}
