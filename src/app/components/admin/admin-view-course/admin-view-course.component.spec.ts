import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCourseComponent } from './admin-view-course.component';

describe('AdminViewCourseComponent', () => {
  let component: AdminViewCourseComponent;
  let fixture: ComponentFixture<AdminViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
