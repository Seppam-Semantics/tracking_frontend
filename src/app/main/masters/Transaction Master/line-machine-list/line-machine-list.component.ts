import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

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
  allData: any;
  lineDta: any;
  selectedlist1: any;
  selectedlist2: any;
  gotLine: any;
  ngOnInit(): void {
    this.api.Drop_Style_master().subscribe((res)=>{
      this.styleDropdata = res.style
    })

    this.api.Machinelist().subscribe((res)=>{
      this.linealldata = res.line
      // console.log(res)
    }) 

    this.api.Machinelinelist().subscribe((res)=>{
     this.masters.lineMachineData = res.line
    })
  }
  constructor(private fb : FormBuilder, private api : ApiService , public masters : MasterService){

    this.LineMachinelistcreate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      styleId : new FormControl('') ,
      prodhr : new FormControl('') ,
      line: new FormControl(''),
      data : new FormControl('')

    })


    this.LineMachinelistupdate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      styleId : new FormControl('') ,
      prodhr : new FormControl('') ,
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

    this.selectedline = this.selectedline.map((line: any) => ({
      "id" : 0,
      "line" : line.line,
      "linemasterId" : line.id
    }));

    this.LineMachinelistcreate.patchValue({
      data: this.selectedline
    });
  }
  

  save(){
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
    this.api.Machinelinelist().subscribe((res)=>{
      this.masters.lineMachineData = res.line
     })
  }

  LineMachinecreateOpen1(){
    this.LineMachinelistcreationpopup = true
  }

  linejson(data: any): any {
    return JSON.parse(data);
  }

  edit(id: any) {
    this.LineMachinelistupdatepopup = true;
    this.api.Machinelistid(id).subscribe((res) => {
      this.gotLine = JSON.parse(res.line[0].line);
      // console.log(this.gotLine)
        this.lineDta = JSON.parse(res.line[0].line).map((line: any) => ({
            lineid: line.lineId,
            headid: line.hederid,
            line: line.line
        }));

        const lineArray = this.lineDta.map((line: any) => line.lineid);
        this.LineMachinelistupdate.patchValue({
            id: res.line[0].id,
            style: res.line[0].style,
            styleId: res.line[0].styleid,
            prodhr: res.line[0].prodhr,
            line: lineArray
        });
        this.getSelectedLines();
    });
}

getSelectedLines() {
  // console.log(this.gotLine);
    const selectedLineIds = this.LineMachinelistupdate.get('line')?.value || [];

    this.selectedline = this.linealldata.filter((line: any) => selectedLineIds.includes(line.id));
    // console.log(this.selectedline)

    this.selectedline = this.selectedline.map((line: any) => ({
        "id" : this.gotLine.find((e: any) => e.lineId === line.id)?.id || 0,
        "line" : line.line,
        "linemasterId" : line.id
    }));

    // console.log(this.selectedline)
    this.LineMachinelistupdate.patchValue({
        data: this.selectedline
    });
}

  update(){
    // console.log(this.LineMachinelistupdate.value);
    this.api.MachinelistPost(this.LineMachinelistupdate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.LineMachinelistupdatepopup = false;      
      // this.LineMachinelistcreate.reset()
      this.api.Machinelinelist().subscribe((res)=>{
        this.masters.lineMachineData = res.line
       })
    })
  }
}
