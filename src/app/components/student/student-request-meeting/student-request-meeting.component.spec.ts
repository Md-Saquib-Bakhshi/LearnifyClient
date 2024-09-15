import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestMeetingComponent } from './student-request-meeting.component';

describe('StudentRequestMeetingComponent', () => {
  let component: StudentRequestMeetingComponent;
  let fixture: ComponentFixture<StudentRequestMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentRequestMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRequestMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
