import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisteruserserviceService } from '../service/registeruserservice.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProfileComponent],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  regForm: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;
  isOpen = false;
  ageValue: number = 20;
  imageError: string = '';

  constructor(private userservice: RegisteruserserviceService, private router: Router, private fb: FormBuilder) {
    this.regForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[A-Za-z]+$")]],
      lname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: [this.ageValue, Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      tags: this.fb.array([]),
      subscribe: [false],
      image: ['', Validators.required]
    });
  }

  get fname() { return this.regForm.get('fname'); }
  get lname() { return this.regForm.get('lname'); }
  get email() { return this.regForm.get('email'); }
  get phone() { return this.regForm.get('phone'); }
  get age() { return this.regForm.get('age'); }
  get state() { return this.regForm.get('state'); }
  get country() { return this.regForm.get('country'); }
  get address() { return this.regForm.get('address'); }
  get tagsArray() {
    return this.regForm.get('tags') as FormArray;
  }
  get imageControl() { return this.regForm.get('image'); }

  onAgeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ageValue = Number(input.value);
    this.regForm.patchValue({ age: this.ageValue });
  }

  onEnterTag(event: KeyboardEvent, tagInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag(tagInput);
    }
  }

  addTag(tagInput: HTMLInputElement): void {
    const tag = tagInput.value.trim();
    if (tag) {
      this.tagsArray.push(new FormControl(tag));
      tagInput.value = '';
    }
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      const img = new Image();
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.imageControl?.setValue(reader.result);
        img.onload = () => {
          if (img.width <= 310 && img.height <= 325) {
            this.imageError = '';
          }
          else {
            this.imageError = "image must be 310 to 325 pixels only";
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onSubmit() {
    if (this.imageError) {
      console.error('Image dimension error:', this.imageError);
      return;
    }

    if (this.regForm.valid) {
      this.userservice.register(this.regForm.value).subscribe({
        next: (response: any) => {
          console.log('User registered:', response);
          this.router.navigate(['/profile', response.id]);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
