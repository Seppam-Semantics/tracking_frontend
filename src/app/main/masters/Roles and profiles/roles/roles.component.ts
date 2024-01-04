import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { ApiService } from 'src/app/api.service';
import { LocalService } from 'src/app/main/main/local.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  rolesdata:any;
  profileName:any;
  constructor(public dialog: MatDialog, private api:ApiService, private local:LocalService) {}


  ngOnInit(): void {
    this.getroles();
    this.api.rolenames = this.dataSource;
  }


  displayedColumns: string[] = ['roleName', 'assignProfile', 'action'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteItem(id:any) {
    const accept = "do you want to delete";
    if (confirm(accept) == true) {
      const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
      this.local.deleterole(id, storedtoken).subscribe(()=>{
        alert("Deleted")
      })
      this.getroles();
    } else {
      alert("Cancelled");
    }
  }

  addNew():void { 
    this.dialog.open(AddRolesComponent, {
      width: '40%',
    });
                }


edit(id:any){
  sessionStorage.setItem('roleid',id)
  let update= this.dialog.open(EditRolesComponent,{
    width:'40%'
  });
 }

 getroles(){
  const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
  this.api.getroles().subscribe((res)=>{
    this.rolesdata = res.roles
    this.dataSource = this.rolesdata;
  })
 }
}


export interface PeriodicElement {
  roleName: any;
  assignProfile: any;
}
