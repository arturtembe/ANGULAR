import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUploadEditComponent } from './img-upload-edit.component';

describe('ImgUploadEditComponent', () => {
  let component: ImgUploadEditComponent;
  let fixture: ComponentFixture<ImgUploadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgUploadEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgUploadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
