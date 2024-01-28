import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {map, Observable, of} from "rxjs";

export type Package = { error: string | null }

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {

  }

  create(client: { email: string, password: string }): Observable<Package> {
    return this.http.post<{ token: string }>(environment.apiUrl + "/login", client)
      .pipe(
        tap(this.saveToken),
        map(() => ({error: null})),
        catchError((it) => of({error: it.error.error}))
      );
  }

  public delete() {
    window.sessionStorage.removeItem("token")
  }

  public getToken() {
    return window.sessionStorage.getItem("token");
  }

  private saveToken(it: { token: string }) {
    window.sessionStorage.setItem("token", it.token)
  }
}
