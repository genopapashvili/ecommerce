import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from "../services/session.service";

@Injectable()
export class SessionInterceptorInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let httpRequest = request;
    if (this.sessionService.isToken()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.sessionService.getToken()}`
      });

      httpRequest = request.clone({headers});
      return next.handle(httpRequest);
    }

    return next.handle(request);
  }
}
