import { Routes } from '@angular/router';
import { AppUsersComponent } from './users/users.component';
import { AppCustomersComponent } from './customers/customers.component';
import { AppQoutesComponent } from './qoutes/qoutes.component';
import { AppInvoicesComponent } from './invoices/invoices.component';
import { AppSalesOrderComponent } from './sales-order/sales-order.component';
import { AppPaymentRecievedComponent } from './payment-recieved/payment-recieved.component';
import { AppInventoryComponent } from './inventory/inventory.component';

export const MainRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'customers',
        component: AppCustomersComponent,
      },
      {
        path: 'inventory',
        component: AppInventoryComponent,
      },
      {
        path: 'qoutes',
        component: AppQoutesComponent,
      },
      {
        path: 'invoices',
        component: AppInvoicesComponent,
      },
      {
        path: 'sales-order',
        component: AppSalesOrderComponent,
      },
      {
        path: 'payment-recieved',
        component: AppPaymentRecievedComponent,
      },
      {
        path: 'users',
        component: AppUsersComponent,
      }
    ],
  },
];
