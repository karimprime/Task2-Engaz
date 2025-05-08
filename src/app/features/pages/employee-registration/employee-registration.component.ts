import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../../layouts/additions/employee-form/employee-form.component';
import { Employee } from '../../../core/interface/employee/employee.interface';

@Component({
  selector: 'app-employee-registration',
  imports: [EmployeeFormComponent],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss',
})
export class EmployeeRegistrationComponent {
  onEmployeeAdded(employee: Employee) {
    console.log('New employee added:', employee);
    alert(
      `Employee added successfully!\nName: ${employee.nameEn}\nID: ${employee.idNumber}`
    );
  }
}
