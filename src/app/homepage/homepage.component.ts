import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, UserRegistrationComponent, ProfileComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
