import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel} from './fee.model'
import { ApiService} from '../shared/api.service'

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {
  showAdd !: boolean;
  showUpdate !: boolean;
  form !: FormGroup;
  StudentModel: StudentModel = new StudentModel();
  studentAll: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  clickAddStudent(){
    this.form.reset();
    this.StudentModel.id = null; 
    this.showAdd = true;
    this.showUpdate = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        studentcode:[''],
        firstname:[''],
        lastname:[''],
        email:[''],
        mobile:[''],
        fees:[''],
    })
    this.getAllStudents()
  }

  postStudentDetails(){
    this.StudentModel.studentcode = this.form.value.studentcode;
    this.StudentModel.firstname = this.form.value.firstname;
    this.StudentModel.lastname = this.form.value.lastname;
    this.StudentModel.email = this.form.value.email;
    this.StudentModel.mobile = this.form.value.mobile;
    this.StudentModel.fees = this.form.value.fees;
    this.api.postStudent(this.StudentModel).subscribe(res=>{
      this.form.reset();
      this.getAllStudents();
      alert('Added Successfully!');
      
    },
      err=>{
        alert('Something went wrong, need Star Json Server (https://www.npmjs.com/package/json-server) !!!')
      })
  }

  

  getAllStudents(){
      this.api.getStudent().subscribe(res => {
        this.studentAll = res;
    })
  }

  deleteStudents(data: any){
    if(confirm('Are you sure want to delete?')==true)
    {
      this.api.deleteStudent(data.id).subscribe(res => {
        alert("Deleted Successfully!")
      this.getAllStudents()
      })
    }
    else return
    
  }



  onEdit(data: any)
  {
    this.showAdd = false;
    this.showUpdate = true;
    this.StudentModel.id=data.id;
    this.form.controls['studentcode'].setValue(data.studentcode);
    this.form.controls['firstname'].setValue(data.firstname);
    this.form.controls['lastname'].setValue(data.lastname);
    this.form.controls['email'].setValue(data.email);
    this.form.controls['mobile'].setValue(data.mobile);
    this.form.controls['fees'].setValue(data.fees);
  }

  updateStudentDetails(){
    this.StudentModel.studentcode = this.form.value.studentcode;
    this.StudentModel.firstname = this.form.value.firstname;
    this.StudentModel.lastname = this.form.value.lastname;
    this.StudentModel.email = this.form.value.email;
    this.StudentModel.mobile = this.form.value.mobile;
    this.StudentModel.fees = this.form.value.fees;
    this.api.updateStudent(this.StudentModel,this.StudentModel.id).subscribe(res=>{
      alert('Updated Successfully!');
      this.getAllStudents();
    },
      err=>{
        alert('Something went wrong, need Star Json Server (https://www.npmjs.com/package/json-server) !!!')
      })
  }
}
