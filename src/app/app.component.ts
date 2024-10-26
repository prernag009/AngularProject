import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClient } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HomepageComponent, UserRegistrationComponent,ProfileComponent],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nimapproject';
}
