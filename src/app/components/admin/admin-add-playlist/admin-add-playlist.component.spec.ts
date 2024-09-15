import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPlaylistComponent } from './admin-add-playlist.component';

describe('AdminAddPlaylistComponent', () => {
  let component: AdminAddPlaylistComponent;
  let fixture: ComponentFixture<AdminAddPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
