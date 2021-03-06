import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Overlay } from '@angular/cdk/overlay';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationService } from '../../core/services/authentication.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const serviceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [
        Overlay,
        FormBuilder,
        { provide: AuthenticationService, useValue: serviceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const passwordInput = compiled.querySelector(`input[name='password']`);
    expect(passwordInput).toBeTruthy();
  });

  it('should check validity is falsy for empty form', () => {
    const form = component.formGroup;
    expect(form.valid).toBeFalsy();
  });

  it('should test form invalidity for password', () => {
    const form = component.formGroup;
    const passwordInput = fixture.nativeElement.querySelector(`input[name='password']`);

    passwordInput.value = '1234';
    passwordInput.dispatchEvent(new Event('input'));
    component.formGroup.markAllAsTouched();
    fixture.detectChanges();
    expect(passwordInput.value).toContain('1234');
    expect(form.valid).toBeFalsy();
  });

  it('should not show warnings on an empty form on start', () => {
    const reqPasswordText = fixture.nativeElement.querySelector(`div[name='passwordReq']`);
    expect(reqPasswordText).toBeFalsy();
  });

  it('should show required warnings after click', () => {
    const reqPasswordText = fixture.nativeElement.querySelector(`div[name='passwordReq']`);
    const submitButton = fixture.nativeElement.querySelector(`button[name='submit']`);
    submitButton.click();
    fixture.detectChanges();
    expect(reqPasswordText).toBeFalsy();
  });
});
