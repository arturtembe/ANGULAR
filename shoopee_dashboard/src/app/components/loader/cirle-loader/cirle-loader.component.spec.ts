import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirleLoaderComponent } from './cirle-loader.component';

describe('CirleLoaderComponent', () => {
  let component: CirleLoaderComponent;
  let fixture: ComponentFixture<CirleLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CirleLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CirleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
