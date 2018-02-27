import { TestBed, inject } from '@angular/core/testing';

import { ShiftItemsService } from './shift-items.service';

describe('ShiftItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftItemsService]
    });
  });

  it('should be created', inject([ShiftItemsService], (service: ShiftItemsService) => {
    expect(service).toBeTruthy();
  }));
});
