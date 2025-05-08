import { Component } from '@angular/core';
import { EmployeeRegistrationComponent } from '../../pages/employee-registration/employee-registration.component';

@Component({
  selector: 'app-dashboard',
  imports: [EmployeeRegistrationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
