import { TestBed } from '@angular/core/testing';
import { Informes } from './informes';

describe('Informes', () => {
  let service: Informes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Informes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
