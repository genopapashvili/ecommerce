import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SuccessResponse, TokenPayload} from "../../../utils/types";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";


@Injectable()
export class CertificationService {

  constructor(private http: HttpClient) {

  }


  certify(payload: TokenPayload) {
    return this.http.post<SuccessResponse>(environment.apiUrl + "/certify", payload)
      .pipe(catchError(() => of({success: false} as SuccessResponse)))
  }

}
