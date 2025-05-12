import { Component } from '@angular/core';
import { EmployeeRegistrationComponent } from '../../pages/employee-registration/employee-registration.component';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-dashboard',
  imports: [EmployeeRegistrationComponent , ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
