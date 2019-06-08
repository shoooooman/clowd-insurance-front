import { TestBed } from '@angular/core/testing';

import { AngularStorageService } from './angular-storage.service';

describe('AngularStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularStorageService = TestBed.get(AngularStorageService);
    expect(service).toBeTruthy();
  });
});
