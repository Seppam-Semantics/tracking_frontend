import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-po-master-creation',
  templateUrl: './po-master-creation.component.html',
  styleUrls: ['./po-master-creation.component.css']
})
export class POMasterCreationComponent {

  pocreation: boolean = false;
  poediting: boolean = false;
  pofile: boolean = false;
  pocreate!: FormGroup
  poedit!: FormGroup
  poDetailscreate !: FormGroup
  allData: any;
  datalist: any;
  formattedDate1: any;
  Date1: any;
  Buyernamevalue: any;
  buyerDrop: any;
  buyerid: any;
  Stylenamevalue: any;
  Sizenamevalue: any;
  styleid: any;
  sizeid: any;
  styleDropdata: any;
  sizeDropdata: any;
  colorDropdata: any;
  Colornamevalue: any;
  colorid: any;
  poAlldata: any;
  editdata: any;
  line_OrderNo: any;
  line_id: any;

  ngOnInit(): void {
    this.api.Buyer_master_AllData().subscribe((res) => {
      this.allData = res.buyers
    })

    this.api.Drop_Buyer_master().subscribe((res) => {
      this.buyerDrop = res.buyer;
    })

    this.api.Drop_Style_master().subscribe((res) => {
      this.styleDropdata = res.style
    })


    this.api.Drop_Size_master().subscribe((res) => {
      this.sizeDropdata = res.sizes
    })

    this.api.Drop_Color_master().subscribe((res) => {
      this.colorDropdata = res.color
    })

    this.api.PO_Master_AllData().subscribe((res) => {
      this.poAlldata = res.po
      console.log(res)
    })

  }
  constructor(private fb: FormBuilder, private api: ApiService, private datePipe: DatePipe) {

    this.pocreate = this.fb.group({
      id: new FormControl(''),
      buyer: new FormControl(''),
      buyerId: new FormControl(''),
      orderNo: new FormControl(''),
      poDate: new FormControl(''),
      shipDate: new FormControl('')
    })

    this.poedit = this.fb.group({
      id: new FormControl(''),
      buyer: new FormControl(''),
      buyerId: new FormControl(''),
      orderNo: new FormControl(''),
      poDate: new FormControl(''),
      shipDate: new FormControl('')
    })


    this.poDetailscreate = this.fb.group({
      data: this.fb.array([]),
    })
  }

  get items() {
    return this.poDetailscreate.get("data") as FormArray;
  }

  add1button() {
    const row = this.fb.group({
      "id": new FormControl(''),
      "orderNo": new FormControl(this.line_OrderNo),
      "orderNoId": new FormControl(''),
      "style": new FormControl(''),
      "styleId": new FormControl(''),
      "color": new FormControl(''),
      "colorId": new FormControl(''),
      "size": new FormControl(''),
      "sizeId": new FormControl(''),
      "quantity": new FormControl(''),
      "poValue": new FormControl(''),
      "poRate": new FormControl(''),
      "popl": new FormControl(''),
    });

    this.items.push(row);
  }

  Delete(index: number) {
    this.items.removeAt(index);
  }


  getbuyerId() {
    this.api.BuyerId(this.Buyernamevalue).subscribe((res) => {
      this.buyerid = res.buyer[0].id
      console.log(this.buyerid)
      this.pocreate.patchValue({
        buyerId: this.buyerid
      })
    })
  }

  getstylevalue(event: any) {
    this.Stylenamevalue = event.target.value;
  }

  getstyleId(index: any) {
    this.api.StyleId(this.Stylenamevalue).subscribe((res) => {
      this.styleid = res.style[0].id
      console.log(this.styleid)
      const formArray = this.poDetailscreate.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('styleId')?.setValue(this.styleid);
    })
  }

  getsizevalue(event: any) {
    this.Sizenamevalue = event.target.value;
  }

  getsizeId(index: any) {
    this.api.SizeId(this.Sizenamevalue).subscribe((res) => {
      this.sizeid = res.sizes[0].id
      console.log(this.sizeid)
      const formArray = this.poDetailscreate.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('sizeId')?.setValue(this.sizeid);
    })
  }

  getcolorvalue(event: any) {
    this.Colornamevalue = event.target.value;
  }

  getcolorId(index: any) {
    this.api.ColorId(this.Colornamevalue).subscribe((res) => {
      this.colorid = res.color[0].id
      console.log(this.colorid)
      const formArray = this.poDetailscreate.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('colorId')?.setValue(this.colorid);
    })
  }

  delectheder(id: any) {
    this.api.delete_PO_master(id).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  delectheder_line(id: any) {
    this.api.delete_line_PO_master(id).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  update() {
    this.api.PO_Master(this.poedit.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  edit(id: any) {
    this.api.PO_Master_SingleData(id).subscribe((res) => {
      this.editdata = res.po
      console.log(res)
      this.poedit.patchValue({
        id: this.editdata[0].id,
        buyer: this.editdata[0].buyer,
        buyerId: this.editdata[0].buyerId,
        orderNo: this.editdata[0].orderNo,
        poDate: this.editdata[0].poDate,
        shipDate: this.editdata[0].shipDate
      })
    })
  }


  linedata(id: any) {
    console.log(id)
    this.pofile = true
    this.api.get_PO_Master_line(id).subscribe((res) => {
      this.editdata = res.po
      this.line_OrderNo = res.pomaster
      console.log(res)
    })

  }

  saveButton() {
    console.log(this.pocreate.value)
    this.api.PO_Master(this.pocreate.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  PoDetailssave() {
    this.api.PO_Master_line(this.poDetailscreate.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

}
