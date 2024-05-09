import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-yarn-reconciliation',
  templateUrl: './yarn-reconciliation.component.html',
  styleUrls: ['./yarn-reconciliation.component.css']
})
export class YarnReconciliationComponent {

  downloadAsPDF() {
    const element: HTMLElement | null = document.getElementById('tableToConvert');
    if (!element) {
      console.error("Element with ID 'tableToConvert' not found");
      return;
    }
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgHeight = canvas.height * 208 / canvas.width;
      pdf.addImage(imgData, 0, 0, 208, imgHeight);
      pdf.save('table.pdf');
    });
  }
  }
