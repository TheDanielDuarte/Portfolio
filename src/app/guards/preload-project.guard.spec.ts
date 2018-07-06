import { TestBed, async, inject } from '@angular/core/testing';

import { PreloadProjectGuard } from './preload-project.guard';

describe('PreloadProjectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadProjectGuard]
    });
  });

  it('should ...', inject([PreloadProjectGuard], (guard: PreloadProjectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
