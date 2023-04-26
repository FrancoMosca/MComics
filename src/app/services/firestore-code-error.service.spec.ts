import { TestBed } from '@angular/core/testing';

import { FirestoreCodeErrorService } from './firestore-code-error.service';

describe('FirestoreCodeErrorService', () => {
  let service: FirestoreCodeErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreCodeErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
