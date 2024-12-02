import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../core/model/student';

@Component({
  selector: 'app-json-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './json-crud.component.html',
  styleUrl: './json-crud.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JsonCrudComponent implements OnInit {

  student = new Student();
  studentList: Student[] = [];
  studentForm!: FormGroup;

  showAdd: boolean = false;
  showUpdate: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      branch: ['', Validators.required],
      college: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('StudentList');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  postStudent() {
    const storage = localStorage.getItem('StudentList');
    if (storage != null) {
      const arrayList = JSON.parse(storage);
      const newId = arrayList.length > 0 ? Math.max(...arrayList.map((student: Student) => student.id || 0)) + 1
        : 1;
      const newStudent = { ...this.studentForm.value, id: newId }
      arrayList.push(newStudent);
      localStorage.setItem('StudentList', JSON.stringify(arrayList));
      this.studentList = arrayList;
    } else {
      const newArray = [];
      const newStudent = { ...this.studentForm.value, id: 1 };
      newArray.push(newStudent);
      localStorage.setItem('StudentList', JSON.stringify(newArray));
      this.studentList = newArray;
    }
  }

  editStudent(data: Student) {
    this.showAdd = false;
    this.showUpdate = true;
    this.student.id = data.id;
    this.studentForm.controls['name'].setValue(data.name);
    this.studentForm.controls['email'].setValue(data.email);
    this.studentForm.controls['phone'].setValue(data.phone);
    this.studentForm.controls['address'].setValue(data.address);
    this.studentForm.controls['branch'].setValue(data.branch);
    this.studentForm.controls['college'].setValue(data.college);
  }

  updateStudent() {
    const currentForm = this.studentList.find(m => m.id === this.student.id);
    if (currentForm != undefined) {
      currentForm.name = this.studentForm.value.name;
      currentForm.email = this.studentForm.value.email;
      currentForm.phone = this.studentForm.value.phone;
      currentForm.address = this.studentForm.value.address;
      currentForm.college = this.studentForm.value.college;
      currentForm.branch = this.studentForm.value.branch;
    }
    localStorage.setItem('StudentList', JSON.stringify(this.studentList));
  }

  deleteStudent(item: Student) {
    const record = confirm('Are you sure delete the record?');
    if (record) {
      const currentRecord = this.studentList.findIndex(m => m.id === this.student.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('StudentList', JSON.stringify(this.studentList));
    }
  }


}
