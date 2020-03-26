import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BranchService } from 'src/app/services/branch/branch.service';
import { IBranch } from 'src/app/entities/branch.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  branchDatalist: IBranch[] = [];
  updatebranchSpecificData: FormGroup;
  public deleteindex: any;
  public updateid: any;
  public updateindex: any;
  public sortedData: any;
  public term: any;

  constructor(private branchService: BranchService, private fb: FormBuilder, private renderer: Renderer2) {
    this.branchForm();
  }

  ngOnInit(): void {
    this.loadBranchdata();
  }

  public branchForm(): void {
    this.updatebranchSpecificData = this.fb.group({
      branchName: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      branchAddress: ['', [Validators.required]],
      branchContactNumber: ['', [Validators.required]]
    });
  }

  get branchData() {
    return this.updatebranchSpecificData.controls;
  }

  /**
   * @ function : loadBranchdata
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadBranchdata(): void {
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
      this.updatebranchSpecificData.patchValue({
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
      .updateBranchData(this.updateid, this.updatebranchSpecificData.value)
      .subscribe(res => {
        this.branchDatalist[this.updateindex] = this.updatebranchSpecificData.value;
        alert('Branch updated sucessfully');
      });
    this.sortedData[this.updateindex] = this.updatebranchSpecificData.value;
    $(this.modal.nativeElement).click();

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
