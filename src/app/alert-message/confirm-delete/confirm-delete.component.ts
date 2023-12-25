import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {


constructor(private api:ApiService){}

deleteprofile(){
  const proftoken = 'Bearer '+ sessionStorage.getItem('token');
  const id = sessionStorage.getItem('deleteid');
  this.api.delete(id,proftoken).subscribe((res)=>{
    console.log(res);
  })
  console.log(proftoken);
  window.location.reload();
}
}
