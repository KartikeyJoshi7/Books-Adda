import { TestBed, inject } from '@angular/core/testing';

import { BookDetailService } from './book-detail.service';

describe('BookDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookDetailService]
    });
  });

  it('should be created', inject([BookDetailService], (service: BookDetailService) => {
    expect(service).toBeTruthy();
  }));
});
