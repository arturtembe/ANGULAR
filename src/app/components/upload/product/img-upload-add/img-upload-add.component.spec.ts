import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUploadAddComponent } from './img-upload-add.component';

describe('ImgUploadAddComponent', () => {
  let component: ImgUploadAddComponent;
  let fixture: ComponentFixture<ImgUploadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgUploadAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgUploadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
