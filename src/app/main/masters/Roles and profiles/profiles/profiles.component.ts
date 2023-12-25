import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/alert-message/confirm-delete/confirm-delete.component';
import { ApiService } from 'src/app/api.service';
import { LocalService } from '../../../main/local.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {
 profiledata:any;
  constructor(private router:Router,public dialog: MatDialog, private api:ApiService, private local: LocalService){}
  ngOnInit(): void {
    this.profiles();
  }
  displayedColumns: string[] = ['profile', 'action'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);

  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   
profiles(){
  const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
  this.local.profile(storedtoken).subscribe((res)=>{
    this.profiledata = res.profiles
    this.dataSource = this.profiledata;
    this.api.profilenames = res.profiles
  })
}

  addprofile(){
    this.router.navigate(['/main/addprofile']);
   }
updateprofile(id:any){
  this.router.navigate(['/main/updateprofile']);
  sessionStorage.setItem('profileid',id)
}

   deleteItem(enterAnimationDuration: string, exitAnimationDuration: string, id:any): void {
    this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    sessionStorage.setItem('deleteid',id);
  }
}

export interface PeriodicElement {
  profile: any;
}

