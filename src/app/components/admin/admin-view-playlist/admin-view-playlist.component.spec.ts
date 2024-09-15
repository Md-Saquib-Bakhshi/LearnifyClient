import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPlaylistComponent } from './admin-view-playlist.component';

describe('AdminViewPlaylistComponent', () => {
  let component: AdminViewPlaylistComponent;
  let fixture: ComponentFixture<AdminViewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
