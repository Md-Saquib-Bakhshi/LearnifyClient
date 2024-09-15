import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResponseMeetingComponent } from './admin-response-meeting.component';

describe('AdminResponseMeetingComponent', () => {
  let component: AdminResponseMeetingComponent;
  let fixture: ComponentFixture<AdminResponseMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminResponseMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminResponseMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
