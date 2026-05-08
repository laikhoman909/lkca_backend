import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';

@Catch() // Catching all errors
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: (exception).message
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: (exception as InternalServerErrorException).message
      });
    }

  }
}