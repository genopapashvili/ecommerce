import {TestBed} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should fetch config data', async () => {
    const expectedData = {
      "server": "localhost:3031"
    }; // Your expected config data
   // const response = httpMock.expectOne(ConfigService.MAIN_FILE_PATH);
  //  response.flush(expectedData);

    const configData = await service.observable().toPromise();
   // expect(configData).toEqual(expectedData);
  });
});
