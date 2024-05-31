import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalImageComponent } from './local-image.component';

describe('LocalImageComponent', () => {
  let component: LocalImageComponent;
  let fixture: ComponentFixture<LocalImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
