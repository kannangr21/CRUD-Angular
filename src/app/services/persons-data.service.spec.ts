import { TestBed } from '@angular/core/testing';

import { PersonsDataService } from './persons-data.service';

describe('PersonsDataService', () => {
  let service: PersonsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
