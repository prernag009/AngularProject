import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisteruserserviceService } from '../service/registeruserservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProfileComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editForm: FormGroup;
  ageValue: number = 20;
  userData: any = {
    fname: '',
    lname: '',
    email: '',
    age: this.ageValue,
    phone: '',
    state: '',
    country: '',
    address: '',
    tags: []
  };
  userId!: number;
  newTag: string = '';
  constructor(private route: ActivatedRoute, private userservice: RegisteruserserviceService, private router: Router, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[A-Za-z]+$")]],
      lname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: [this.ageValue, Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      tags: this.fb.array([]),
    })
  }

  onAgeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ageValue = Number(input.value);
    this.editForm.patchValue({ age: this.ageValue });
  }

  ngOnInit(): void {
    const userId: number = +this.route.snapshot.paramMap.get('id')!;
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.updateUser(this.userId);
    });
  }

  updateUser(id: number): void {
    this.userservice.getUserById(id).subscribe(data => {
      this.userData = data;
      this.editForm.patchValue({
        fname: this.userData.fname,
        lname: this.userData.lname,
        email: this.userData.email,
        age: this.userData.age,
        phone: this.userData.phone,
        state: this.userData.state,
        country: this.userData.country,
        address: this.userData.address
      });
      this.setTags(this.userData.tags || []);
    });
  }

  setTags(tags: string[]): void {
    const tagsArray = this.editForm.get('tags') as FormArray;
    tagsArray.clear();
    tags.forEach(tag => {
      tagsArray.push(this.fb.control(tag));
    });
  }

  addTag(): void {
    if (this.newTag.trim()) {
      const tagsArray = this.editForm.get('tags') as FormArray;
      tagsArray.push(this.fb.control(this.newTag.trim()));
      this.newTag = '';
    }
  }

  removeTag(index: number): void {
    const tagsArray = this.editForm.get('tags') as FormArray;
    tagsArray.removeAt(index);
  }

  get tagsArray(): FormArray {
    return this.editForm.get('tags') as FormArray;
  }

  saveProfile(): void {
    const updatedData = {
      ...this.userData,
      ...this.editForm.value,
      tags: this.tagsArray.value
    };

    this.userservice.updateUser(this.userId, updatedData).subscribe(() => {
      console.log("Updated Profile Successfully", updatedData);
      this.router.navigate(['/profile', this.userId]);
    });
  }

}

