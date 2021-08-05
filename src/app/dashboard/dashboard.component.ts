// import { first, map } from 'rxjs/operators';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { Modal } from './dashboard.modal';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  empModalObj : Modal = new Modal();
  empData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  actstatus!: any;

  constructor( private api : ApiService) { }
  // private formbuider: FormBuilder
  ngOnInit(): void {
    this.getAllEmp();
    this.formValue = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.min(3),Validators.max(4)]),
      middleName: new FormControl('',[]),
      lastName: new FormControl('',[]),
      gender: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      mobile: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      dob: new FormControl('',[Validators.required]),
      address: new FormControl('',[]),
      cob: new FormControl('',[Validators.required]),
      active: new FormControl('',[Validators.required])
    })
    
  }

  clickAddEmp(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmpDetails(){
    this.empModalObj.firstName = this.formValue.value.firstName;
    this.empModalObj.lastName = this.formValue.value.lastName;
    this.empModalObj.middleName = this.formValue.value.middleName;
    this.empModalObj.gender = this.formValue.value.gender;
    this.empModalObj.email = this.formValue.value.email;
    this.empModalObj.mobile = this.formValue.value.mobile;
    this.empModalObj.dob = this.formValue.value.dob;
    this.empModalObj.address = this.formValue.value.address;
    this.empModalObj.cob = this.formValue.value.cob;
    this.empModalObj.active = this.formValue.value.active;

    this.api.postEmployee(this.empModalObj).subscribe((res:any) => {
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmp();
    },
    (error:any) =>{
        console.log('error', error);
    })
  }

  getAllEmp(){
    this.api.getEmployee().subscribe(res =>{
      this.empData = res;
    })
  }
  deleteEmp(row: any){
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmp();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.empModalObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['middleName'].setValue(row.middleName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['cob'].setValue(row.cob);
    this.formValue.controls['active'].setValue(row.active);
  }

  updateEmpDetails(){
    this.empModalObj.firstName = this.formValue.value.firstName;
    this.empModalObj.middleName = this.formValue.value.middleName;
    this.empModalObj.lastName = this.formValue.value.lastName;
    this.empModalObj.gender = this.formValue.value.gender;
    this.empModalObj.email = this.formValue.value.email;
    this.empModalObj.mobile = this.formValue.value.mobile;
    this.empModalObj.dob = this.formValue.value.dob;
    this.empModalObj.address = this.formValue.value.address;
    this.empModalObj.cob = this.formValue.value.cob;
    this.empModalObj.active = this.formValue.value.active;
    this.api.updateEmployee(this.empModalObj, this.empModalObj.id).subscribe((res)=>{
      console.log(res);
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmp();
    })
  }

}
