import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, map, Observable, of} from "rxjs";

export type Package = { error: string | null }

export enum SessionStatus {
  created = 1, removed = 0
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionSubject: BehaviorSubject<SessionStatus>

  constructor(private http: HttpClient) {
    const sessionStatus = window.sessionStorage.getItem("token") ? SessionStatus.created : SessionStatus.removed
    this.sessionSubject = new BehaviorSubject(sessionStatus)
  }

  public sessionChanges() {
    return this.sessionSubject.asObservable();
  }

  create(client: { email: string, password: string }): Observable<Package> {
    return this.http.post<{ token: string }>(environment.apiUrl + "/login", client)
      .pipe(
        tap(token => this.saveToken(token)),
        map(() => ({error: null})),
        catchError((it) => of({error: it.error?.error}))
      );
  }

  public remove() {
    window.sessionStorage.removeItem("token")
    this.sessionSubject.next(SessionStatus.removed)
  }

  public isToken() {
    return typeof this.getToken() === "string"
  }

  public getToken() {
    return window.sessionStorage.getItem("token");
  }

  private saveToken(it: { token: string }) {
    window.sessionStorage.setItem("token", it.token)
    this.sessionSubject.next(SessionStatus.created)
  }
}
