import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch/branch.service';
import { Branch } from 'src/app/entities/branch.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  branchDatalist: Branch[] = [];
  branchSpecificData: any;
  public index: any;
  public deleteindex: any;
  public updateid: any;
  public updateindex: any;
  public sortedData: any;
  public term: any;

  constructor(private branchService: BranchService, private fb: FormBuilder) {
    this.branchForm();
  }

  ngOnInit(): void {
    this.loadBranchdata();
  }

  public branchForm(): void {
    this.branchSpecificData = this.fb.group({
      branchName: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      branchAddress: ['', [Validators.required]],
      branchContactNumber: ['', [Validators.required]]
    });
  }

  get branchData() {
    return this.branchSpecificData.controls;
  }

  /**
   * @ function : loadBranchdata
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadBranchdata() {
    this.branchService.getBranchData().subscribe(res => {
      this.branchDatalist = res;
      this.sortedData = [...this.branchDatalist];
    });
  }


  /**
   * @ function : sortData
   * @ Purpose  : sorting the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public sortData(event) {
    this.sortedData = [...this.branchDatalist];
    if (event.target.value === 'all') {
      this.sortedData = [...this.branchDatalist];
    }
    if (this.sortedData.length >= event.target.value) {
      return this.sortedData.length =  event.target.value;
     }
    return this.sortedData = [...this.branchDatalist];
  }


  /**
   * @ function : editBranchdata
   * @ Purpose  : getBranchDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editBranchdata(data, i): void {
    this.branchService.getBranchById(data.id).subscribe(res => {
      this.updateindex = i;
      this.updateid = data.id;
      this.branchSpecificData = this.fb.group({
        branchName: [res.branchName],
        branchCode: [res.branchCode],
        branchAddress: [res.branchAddress],
        branchContactNumber: [res.branchContactNumber]
      });
    });
  }

  /**
   * @ function : updateBranch
   * @ Purpose  : updating the branch data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateBranch(): void {
    this.branchService
      .updateBranchData(this.updateid, this.branchSpecificData.value)
      .subscribe(res => {
        this.branchDatalist[this.updateindex] = this.branchSpecificData.value;
        alert('Branch updated sucessfully');
      });
  }

  /**
   * @ function : deleteBranchdata
   * @ Purpose  : deleting the branch data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteBranchdata(data): void {
    const index = (this.deleteindex = this.branchDatalist
      .map(x => x.branchName)
      .indexOf(data.branchName));
    if (confirm('This branch deleted permanently')) {
      this.branchService.deleteBranch(data.id).subscribe(res => {
        this.branchDatalist.splice(index, 1);
      });
    }
  }


}
