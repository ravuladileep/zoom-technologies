import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { ICourse } from 'src/app/entities/course.model';
import { CourseService } from 'src/app/services/course/course.service';
declare var $: any;

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public addCourseSpecificForm: FormGroup;
  public branch: FormArray;
  public taxValue: number;
  public totalCourseFee: number;
  // branches = ['Ameerpet', 'Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test linux', 'Surat', 'Vijayawada'];
  Data = [
    { name: 'Ameerpet', value: 'Ameerpet' },
    { name: 'Banjara Hills', value: 'Banjara Hills' },
    { name: 'Dilsukh nagar', value: 'Dilsukh nagar' },
    { name: 'Secunderabad', value: 'Secunderabad' },
    { name: 'Test linux', value: 'Test linux' },
    { name: 'Surat', value: 'Surat' },
    { name: 'Vijayawada', value: 'Vijayawada' }
  ];

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.addCourseForm();
  }

  ngOnInit(): void {}

  public addCourseForm(): void {
    this.addCourseSpecificForm = this.fb.group({
      coursename: ['', [Validators.required]],
      branch: this.fb.array([]),
      fees: ['', [Validators.required]],
      servicetax: [''],
      totalfee: [''],
      seats: ['', [Validators.required]]
    });
  }

  public onCheckboxChange(e) {
    const branch: FormArray = this.addCourseSpecificForm.get(
      'branch'
    ) as FormArray;

    if (e.target.checked) {
      branch.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      branch.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          branch.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get courseData() {
    return this.addCourseSpecificForm.controls;
  }

  public calculteTax(): void {
    this.taxValue = (this.courseData.fees.value * 18) / 100;
    this.totalCourseFee = this.courseData.fees.value + this.taxValue;
    console.log(this.totalCourseFee, this.taxValue);
  }

  /**
   * @ function : Submit
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    this.courseService
      .addCourse(this.addCourseSpecificForm.value)
      .subscribe(res => {
        console.log('saved');
      });
    console.log(this.addCourseSpecificForm.value);
    alert('Course added successfully');
    this.addCourseSpecificForm.reset();
  }
}
