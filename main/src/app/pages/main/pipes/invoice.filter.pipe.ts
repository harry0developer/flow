import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {
  transform(invoices: Invoice[], searchText: string): Invoice[] {
    if(!invoices) return [];
    if(!searchText) return invoices;
    searchText = searchText.toLowerCase();
    return invoices.filter((invoice: Invoice) => {
      return invoice.invoiceNo.toLowerCase().includes(searchText) || invoice?.customer?.name.toLowerCase().includes(searchText);
    });
   }
}