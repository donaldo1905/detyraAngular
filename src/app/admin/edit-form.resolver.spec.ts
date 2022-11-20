import { TestBed } from '@angular/core/testing';

import { EditFormResolver } from './edit-form.resolver';

describe('EditFormResolver', () => {
  let resolver: EditFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
