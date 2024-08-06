import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ApiService } from 'src/app/api.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-transaction-maste-root',
  templateUrl: './transaction-maste-root.component.html',
  styleUrls: ['./transaction-maste-root.component.css']
})
export class TransactionMasteRootComponent implements OnInit {
  tabLabel: any;
  all: any;
  styleData: any;
  ColorData: any;
  sizeData: any;
  fsizedata: any;
  yarntypedata: any;
  fabricstypedata: any;
  dyeingdata: any;
  rejtypeData: any;
  spinFtydata: any;
  KnitFtydata: any;
  dyeFtydata: any;
  allmachine: any;
  AlllineData: any;
  alllinemachineData: any;
  allmonthData: any;
  monthlist: any;

  constructor(private api : ApiService, private masters : MasterService){

  }
  ngOnInit(): void {
    
  }
  
  changetab(event: MatTabChangeEvent) {
    this.tabLabel = event.tab.textLabel;

    setTimeout(() => {
      switch (this.tabLabel) {
        case 'Buyer':
          this.api.Buyer_master_AllData().subscribe((res) => {
            this.masters.buyerData = res.buyers
          })
          break;

        case 'Style':
          this.api.style_master_Fillter_Data().subscribe((res) => {
            this.masters.styleData = res.styles
          })
          break;

        case 'Color':
          this.api.Color_master_Fillter_Data().subscribe((res)=>{
            this.masters.colorData = res.colors
          })
          break;

        case 'Size':
          this.api.size_master_Fillter_Data().subscribe((res)=>{
            this.masters.sizeData = res.sizes
          })
          break;

        case 'Fabricsdia':
          this.api.fsize_master_filter().subscribe((res)=>{
            this.masters.fabricDiaData = res.fsize
      
          })
          break;
        
        case 'Yarn Type':
          this.api.yarnType_master_Fillter_Data().subscribe((res)=>{
            this.masters.yarnTypeData= res.yarnType
          })
          break;

        case 'Fabric Type':
          this.api.fabrictype_master_Fillter_Data().subscribe((res)=>{
            this.masters.fabricDiaData= res.fabricType
          })
          break;

        case 'Dye Type':
          this.api.dyetype_master_Fillter_Data().subscribe((res) => {
            this.masters.dyeTypeData = res.DyeType
          })
          break;

        case 'Rej Type':
          this.api.rejtype_master_Fillter_Data().subscribe((res) => {
            this.masters.rejTypeData = res.rejtype
          })
          break;

        case 'Spin Fty':
          this.api.spinFty_master_Fillter_Data().subscribe((res)=>{
            this.masters.spinFtyData = res.spinFty
          })
          break;

        case 'Knit Fty':
          this.api.KnitFty_master_Fillter_Data().subscribe((res)=>{
            this.masters.knitFtyData = res.knitFty
          })
          break;

        case 'Dye Fty':
          this.api.dyeFty_master_Fillter_Data().subscribe((res)=>{
            this.masters.dyeFtyData= res.dyeFty
          })
          break;

        case 'Machine Allocation':
          this.api.getAllocationMaster().subscribe((res) => {
            this.masters.machineAllocationData = res.data
          })
          break;

        case 'Line Master':
          this.api.line().subscribe((res)=>{
            this.masters.lineData = res.line
          })
          break;

        case 'Line - Machine list Master':
          this.api.Machinelinelist().subscribe((res)=>{
            this.masters.lineMachineData = res.line
           })
          break;

        case 'Working Day Master':
          this.api.workingdaylist().subscribe((res) => {
            this.allmonthData = res.workingday
          })
          this.api.monthlist().subscribe((res) => {
            this.masters.workingData = res.month
          })
          break;

        default:
          break;
      }
    },0);
  }

}
