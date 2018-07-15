import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectDoesExistGuard } from './project-does-exist.guard';

describe('ProjectDoesExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDoesExistGuard]
    });
  });

  it('should ...', inject([ProjectDoesExistGuard], (guard: ProjectDoesExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
