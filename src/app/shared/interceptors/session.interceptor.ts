import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SessionService} from "../services/session.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let httpRequest = request.clone({});
    if (this.sessionService.isToken()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.sessionService.getToken()}`
      });
      httpRequest = request.clone({headers});
    }

    return next.handle(httpRequest)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            if (this.sessionService.isToken()) {
              this.sessionService.remove();
            }
            return throwError(() => new Error('Unauthorized'));
          } else {
            return throwError(() => error);
          }
        })
      )
  }
}
