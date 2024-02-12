import { Pipe, PipeTransform } from '@angular/core';
import { SalesOrder } from 'src/app/models/sales-order';
@Pipe({
  name: 'salesOrderFilter'
})
export class SalesOrderFilterPipe implements PipeTransform {
  transform(salesOrders: SalesOrder[], searchText: string): SalesOrder[] {
    if(!salesOrders) return [];
    if(!searchText) return salesOrders;
    searchText = searchText.toLowerCase();
    return salesOrders.filter((so: SalesOrder) => {
      return so.salesOrderNo.toLowerCase().includes(searchText) || so?.customer?.name.toLowerCase().includes(searchText);
    });
   }
}