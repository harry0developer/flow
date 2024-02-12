import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseOrder } from 'src/app/models/purchase-order';
@Pipe({
  name: 'purchaseOrderFilter'
})
export class PurchaseOrderFilterPipe implements PipeTransform {
  transform(pos: PurchaseOrder[], searchText: string): PurchaseOrder[] {
    if(!pos) return [];
    if(!searchText) return pos;
    searchText = searchText.toLowerCase();
    return pos.filter((po: PurchaseOrder) => {
      return po.purchaseOrderNo.toLowerCase().includes(searchText) || po?.customer?.name.toLowerCase().includes(searchText);
    });
   }
}