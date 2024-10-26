import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
];