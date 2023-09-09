import { TestBed } from '@angular/core/testing';

import { BoardCommunicatorService } from './board-communicator.service';

describe('BoardCommunicatorService', () => {
  let service: BoardCommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
