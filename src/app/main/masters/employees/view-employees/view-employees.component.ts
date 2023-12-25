import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewMoreComponent } from '../view-more/view-more.component';
import { ConfirmDeleteComponent } from 'src/app/alert-message/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
import { EditEmployeesComponent } from '../edit-employees/edit-employees.component';
import { LocalService } from 'src/app/main/main/local.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  constructor(public dialog: MatDialog, private local:LocalService){}
  ngOnInit(): void {
   this.getemployee();
  }

  displayedColumns: string[] = ['code', 'name', 'email', 'department' , 'designation' , 'action'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(id:any): void {
    const accept = "Do you want to delete";
    if (confirm(accept) == true) {
      const proftoken = 'Bearer '+ sessionStorage.getItem('token');
      this.local.deleteemp(id, proftoken).subscribe(()=>{
        alert('deleted');
      })
    } else {
      alert('cancelled');
    }
    
  }

  viewmore(id:any): void {
    this.dialog.open(ViewMoreComponent, {
      width: '100%',
    });
    sessionStorage.setItem('moreid',id)
  }

  addemployees(): void {
    this.dialog.open(AddEmployeesComponent, {
      width: '40%',
    });
  }

  editemployees(id:any): void {
    this.dialog.open(EditEmployeesComponent, {
      width: '40%',
    });
    sessionStorage.setItem('empid',id)
  }

getemployee(){
  const proftoken = 'Bearer '+ sessionStorage.getItem('token');
  this.local.getemployee(proftoken).subscribe((res)=>{
    console.log(res);
    this.dataSource = res.employees
  })
}
}

export interface PeriodicElement {
  code: any;
  name: any;
  email:any;
  department:any;
  designation:any;
  
}