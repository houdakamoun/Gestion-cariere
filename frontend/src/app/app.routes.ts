import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { SkillsManagementComponent } from './components/skills-management/skills-management.component';
import { LoginComponent } from './components/login/login.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
import { FormationsComponent } from './components/formations/formations.component';
import { CareerListComponent } from './components/career-list/career-list.component';
import { CareerDetailComponent } from './components/career-detail/career-detail.component';
import { CareerTimelineComponent } from './components/career-timeline/career-timeline.component';
import { CareerManagementComponent } from './components/careers-management/careers-management.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  // 🔑 Login page
  { path: 'login', component: LoginComponent },

  // 🏠 Main pages
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'skills', component: SkillsManagementComponent },
  { path: 'careers', component: CareerManagementComponent },
  { path: 'career-list', component: CareerListComponent },
  { path: 'career-detail/:id', component: CareerDetailComponent },
  { path: 'career-timeline', component: CareerTimelineComponent },
  { path: 'evaluations', component: EvaluationsComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'add-formations', component: AddFormationComponent },
  { path: 'users', component: UsersComponent },

  // 🔁 Default route
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // ❌ Page not found
  { path: '**', redirectTo: 'login' },
];
