import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TokenResponse} from "../../utils/types";


export type RegistrationData = {
  firstName: string,
  lastName: string,
  birthDate: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) {

  }

  public register(data: RegistrationData) {
    return this.http.post<TokenResponse>(environment.apiUrl + "/register", data)
  }
}
