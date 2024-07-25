import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-machine-list',
  templateUrl: './line-machine-list.component.html',
  styleUrls: ['./line-machine-list.component.css']
})
export class LineMachineListComponent implements OnInit{
  LineMachinelistcreationpopup : boolean = false
  LineMachinelistupdatepopup : boolean = false
  LineMachinelistcreate : FormGroup
  LineMachinelistupdate : FormGroup
  Stylenamevalue:any
  styleDropdata: any;
  styleid: any;
  linealldata: any;
  selectedline: any;
  ngOnInit(): void {
    this.api.Drop_Style_master().subscribe((res)=>{
      this.styleDropdata = res.style
    })

    this.api.Machinelinelist().subscribe((res)=>{
      this.linealldata = res.line
    }) 
  }
  constructor(private fb : FormBuilder, private api : ApiService){

    this.LineMachinelistcreate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      styleId : new FormControl('') ,
      prodHr : new FormControl('') ,
      line: new FormControl(''),
      data : new FormControl('')

    })


    this.LineMachinelistupdate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      styleId : new FormControl('') ,
      prodHr : new FormControl('') ,
      line: new FormControl(''),
      data : new FormControl('')
    })
  }

  getstyleId() {
    this.api.StyleId(this.Stylenamevalue).subscribe((res)=>{
      this.styleid = res.style[0].id

      this.LineMachinelistcreate.patchValue({
        styleId : this.styleid 
      })
    })
  }

  getSelectedColors() {
    const selectedColorIds = this.LineMachinelistcreate.get('line')?.value || [];

    this.selectedline = this.linealldata
      .filter((line: { id: number; line: string }) => selectedColorIds.includes(line.id));

    this.selectedline = this.selectedline.map((line: any) => {
      return { ...line, headid: 0 };

    });
    console.log(this.selectedline)
    this.LineMachinelistcreate.patchValue({
      data: this.selectedline
    });
  }
  

  save(){
    console.log(this.LineMachinelistcreate.value)
    this.api.MachinelistPost(this.LineMachinelistcreate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.LineMachinelistcreationpopup = false;      
      this.LineMachinelistcreate.reset()
    })
  }

  LineMachinecreateOpen1(){
    this.LineMachinelistcreationpopup = true
  }

  LineMachinecreateOpen2(){
    this.LineMachinelistupdatepopup = true
  }

}
