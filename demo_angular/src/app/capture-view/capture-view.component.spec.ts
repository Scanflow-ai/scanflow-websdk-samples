import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureViewComponent } from './capture-view.component';

describe('CaptureViewComponent', () => {
  let component: CaptureViewComponent;
  let fixture: ComponentFixture<CaptureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
