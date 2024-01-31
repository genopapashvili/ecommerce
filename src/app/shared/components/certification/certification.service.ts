import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {TokenPayload} from "../../../utils/types";


@Injectable()
export class CertificationService {

  constructor(private http: HttpClient) {

  }


  certify(payload: TokenPayload) {
    return this.http.post(environment.apiUrl + "/certify", payload)
  }

}
