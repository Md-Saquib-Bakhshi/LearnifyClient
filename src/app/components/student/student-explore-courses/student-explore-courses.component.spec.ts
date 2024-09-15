import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExploreCoursesComponent } from './student-explore-courses.component';

describe('StudentExploreCoursesComponent', () => {
  let component: StudentExploreCoursesComponent;
  let fixture: ComponentFixture<StudentExploreCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentExploreCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExploreCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
