import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // Add a dedicated NestJS system logger instance
  private readonly logger = new Logger('GlobalExceptionFilter');

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
    } else {
      // PRO TIP: This block catches runtime exceptions (TypeErrors, ReferenceErrors, etc.)
      if (exception instanceof Error) {
        message = exception.message;
        details = exception.stack; // Captures precise track lines during development
      }
    }

    // CRITICAL: Always log standard engine crashes so they appear clearly in the console terminal
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `[${request.method}] ${request.url} - Crash: ${
          exception instanceof Error ? exception.stack : JSON.stringify(exception)
        }`,
      );
    }

    const errorPayload: {
      code: string;
      message: string;
      details?: unknown;
    } = {
      code,
      message,
    };

    if (details !== undefined && details !== null) {
      // Optional: Clean up details leakage in production environments
      errorPayload.details = process.env.NODE_ENV === 'production' && status === 500 
        ? 'An unexpected error occurred.' 
        : details;
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