import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RegisteruserserviceService } from '../service/registeruserservice.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, EditProfileComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData: any;
  imageError: string = '';

  constructor(private route: ActivatedRoute, private userservice: RegisteruserserviceService, private router: Router) {
  }

  ngOnInit(): void {
    const userId: number = +this.route.snapshot.paramMap.get('id')!;

    this.userservice.getUserById(userId).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      const img = new Image();
      reader.onload = () => {
        img.onload = () => {
          if (img.width <= 310 && img.height <= 325) {
            this.imageError = '';
            this.userData.image = reader.result as string;
            this.editPhoto();
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

  goToHomePage() {
    this.router.navigate(['/']);
  }

  editProfile(userId: number): void {
    this.router.navigate(['/edit-profile', userId]);
  }

  editPhoto() {
    const userId: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.updateUser(userId, this.userData).subscribe({
      next: (updatedData) => {
        this.userData = updatedData;
        console.log('Photo updated successfully:', updatedData);
      },
      error: (error) => {
        console.error('Error updating photo:', error);
      }
    });
  }
}
