import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxmessageComponent } from './boxmessage.component';

describe('BoxmessageComponent', () => {
  let component: BoxmessageComponent;
  let fixture: ComponentFixture<BoxmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxmessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
