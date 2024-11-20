import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeForm!: FormGroup;
  employee = new Employee();
  addEmployee: boolean = false;
  updateEmploye: boolean = false;

  //pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalEmployees: number = 0;

  constructor(
    private service: ApiService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getEmployeList();
  }

  clickToAddEmployee() {
    this.employeeForm.reset();
    this.addEmployee = true;
    this.updateEmploye = false;
  }

  getEmployeList() {
    this.service.getData().subscribe({
      next: (res: Employee[]) => {
        this.employeeList = res;
      }
    })
  }

  postEmployee() {
    this.service.postData(this.employeeForm.value).subscribe({
      next: (res) => {
        this.getEmployeList();
      }
    })
  }

  deleteEmployee(id: string) {
    this.service.deleteData(id).subscribe({
      next: () => {
        this.employeeList = this.employeeList.filter(empployee => empployee.id !== id);
        this.getEmployeList();
      }
    })
  }

  updateEmployee(data: Employee) {
    this.addEmployee = false;
    this.updateEmploye = true

    this.employee.id = data.id;
    this.employeeForm.controls['name'].setValue(data.name);
    this.employeeForm.controls['email'].setValue(data.email);
    this.employeeForm.controls['phone'].setValue(data.phone);
    this.employeeForm.controls['address'].setValue(data.address);
    this.employeeForm.controls['country'].setValue(data.country);
    this.employeeForm.controls['pincode'].setValue(data.pincode);
  }

  updateEmployeeData(){
    this.service.updateData(this.employee.id,this.employeeForm.value).subscribe({
      next:()=>{
        this.employeeForm.reset();
        this.getEmployeList();
      }
    })
  }

}
