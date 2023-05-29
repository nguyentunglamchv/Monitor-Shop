import { TestBed } from '@angular/core/testing';

import { SendmailService } from './sendmail.service';

describe('SendmailService', () => {
  let service: SendmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
