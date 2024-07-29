import { Component } from '@angular/core';

@Component({
  selector: 'app-line-allocation-entry',
  templateUrl: './line-allocation-entry.component.html',
  styleUrls: ['./line-allocation-entry.component.css']
})
export class LineAllocationEntryComponent {
  valueExceeded : boolean = false;
}
