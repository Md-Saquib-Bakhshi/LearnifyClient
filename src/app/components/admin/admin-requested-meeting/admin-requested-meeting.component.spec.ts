import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestedMeetingComponent } from './admin-requested-meeting.component';

describe('AdminRequestedMeetingComponent', () => {
  let component: AdminRequestedMeetingComponent;
  let fixture: ComponentFixture<AdminRequestedMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRequestedMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestedMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
