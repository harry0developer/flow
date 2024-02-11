import { Pipe, PipeTransform } from '@angular/core';
import { Quote } from 'src/app/models/quote';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(quotes: Quote[], searchText: string): Quote[] {
    if(!quotes) return [];
    if(!searchText) return quotes;
    searchText = searchText.toLowerCase();
    return quotes.filter((quote: Quote) => {
      return quote.quoteNo.toLowerCase().includes(searchText) || quote.customer.name.toLowerCase().includes(searchText);
    });
   }
}