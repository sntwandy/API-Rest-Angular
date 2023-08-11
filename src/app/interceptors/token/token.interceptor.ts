import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.get();

    if (token) {
      return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });;
    }

    return request;
  }
}
