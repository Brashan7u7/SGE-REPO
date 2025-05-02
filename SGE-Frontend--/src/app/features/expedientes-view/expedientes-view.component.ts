import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../../services/expedientes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expedientes-view',
  imports: [CommonModule],
  templateUrl: './expedientes-view.component.html',
  styleUrl: './expedientes-view.component.scss',
})
export class ExpedientesViewComponent {
  expediente: any = null;
  idExpediente: string = '';

  constructor(
    private route: ActivatedRoute,
    private expedientesService: ExpedientesService,
  ) {}

  ngOnInit(): void {
    this.idExpediente = this.route.snapshot.paramMap.get('id_expediente') || '';

    if (this.idExpediente) {
      this.expedientesService.getExpedienteById(this.idExpediente).subscribe({
        next: (response) => {
          this.expediente = response;
          
        },
        error: (err) => {
          console.error('Error al obtener el expediente:', err);
        },
      });
    }
  }

  printDiv() {
    const divId = 'expedientes-content';
    const divElement = document.getElementById(divId);

    if (!divElement) {
      console.error(`No se encontró el elemento con ID ${divId}`);
      return;
    }

    const clonedContent = divElement.cloneNode(true) as HTMLElement;

    const img1 = document.getElementById('solologo1') as HTMLImageElement;
    

    if (!img1.complete ) {
      img1.onload = () => this.printDiv();
      
      return;
    }

    const clonedImg1 = clonedContent.querySelector('#solologo1') as HTMLImageElement;
   

    if (clonedImg1) clonedImg1.src = img1.src;
  

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              ${styles}
              /* Estilos específicos para impresión */
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                #expedientes-content {
                  width: 100%;
                  margin: auto;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              }
            </style>
          </head>
          <body>
            <div id="print-content">
              ${clonedContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
}
