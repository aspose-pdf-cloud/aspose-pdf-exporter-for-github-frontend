import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ErrorHandleDialogComponent} from '../error-handle-dialog/error-handle-dialog.component' 



export interface PeriodicElement {
  title: string;
  id: number;
  state: string;
  number: number;
  repo_id: number;
  assignee: null;
}

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  labels: any = [];
  collaborators: any = [];
  issues: PeriodicElement[] = [];
  repositories: any = []
  milestones: any = []
  queryauthor = ''
  queryassignee = ''
  querymentioned = ''
  id = 0;
  loading = false;
  
  text = 'Export';
  selectedlabels = new FormControl([])
  selectedauthors = new FormControl([])
  selectedrepositories = new FormControl([])
  selectedassignee = new FormControl([])
  selectedmilestone = new FormControl([])
  selectedmentioned = new FormControl([])
  selectedstate = new FormControl()
  selectedsince = new FormControl()
  pageIndex = 0;
  pageSize = 10;
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  pageEvent: PageEvent;
  constructor(private data: DataService, private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog) { }
 
  search() {
    this.loading = true;
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    this.data.getIssues(this.id,
      this.pageIndex + 1, this.pageSize, 
      this.selectedlabels.value, 
      this.selectedauthors.value, 
      this.selectedassignee.value, 
      this.selectedmilestone.value, 
      this.selectedstate.value, 
      this.selectedmentioned.value,
      this.selectedsince.value).subscribe((issues: any) => {
      this.issues = issues.result 
      this.pageIndex = issues.pageNo - 1;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.issues)
      this.loading = false;
    })    
  }
  getIssues() {
    this.loading = true;
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    this.data.getIssues(this.id, 
      this.pageIndex + 1, this.pageSize,
      this.selectedlabels.value, 
      this.selectedauthors.value, 
      this.selectedassignee.value, 
      this.selectedmilestone.value, 
      this.selectedstate.value, 
      this.selectedmentioned.value,
      this.selectedsince.value).subscribe((issues: any) => { 

      this.issues = issues.result 
      this.pageIndex = issues.pageNo - 1;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.issues)
      this.loading = false;
    })
  }

  ngOnInit() {
    this.data.repoList()
      .subscribe((repos: any) => {
        this.repositories = repos.result
      });
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.data.getLabels(this.id).subscribe((labels: any) => this.labels = labels.result)
      this.data.getCollaborators(this.id).subscribe((collaborators: any) => this.collaborators = collaborators.result)
      this.data.getMilestones(this.id).subscribe((milestones: any) => this.milestones = milestones.result)
      this.getIssues();
      this.selectedrepositories = new FormControl([this.id])
    });

  }

  

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  export() {
    this.text = 'Processing...'
    let issuesToExport = this.selection.selected.sort((a, b) =>  {
      if(a.number < b.number) return -1;
      if(a.number > b.number) return 1;
      return 0;
    })
    this.data.export(issuesToExport, this.id).subscribe((data) => {
      this.data.downloadFile(data).then(response => response.blob())
      .then(blob => {
        let fileUrl = window.URL.createObjectURL(blob)
        let a = document.createElement(`a`)
        a.href = fileUrl
        a.download = 'issues.pdf'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          a.remove()
          this.text = 'Export'
        }, 200)
  
      })
      .catch(err => console.error(err))
    }, err => {
      this.text = 'Export'
      this.openDialog(err.error)
    })
  }



  handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getIssues();
    return this.pageEvent
  }

  openDialog(error): void {
    this.dialog.open(ErrorHandleDialogComponent, {
      width: '350px',
      data: error
    });
  }
  

}


