import { TestBed } from '@angular/core/testing';

import { RegisteruserserviceService } from './registeruserservice.service';

describe('RegisteruserserviceService', () => {
  let service: RegisteruserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteruserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
