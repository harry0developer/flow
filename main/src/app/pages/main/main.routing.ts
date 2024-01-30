import { Routes } from '@angular/router';
import { AppUsersComponent } from './users/users.component';
import { AppCustomersComponent } from './customers/customers.component';
import { AppInvoicesComponent } from './invoices/invoices.component';
import { AppSalesOrderComponent } from './sales-order/sales-order.component';
import { AppPaymentRecievedComponent } from './payment-recieved/payment-recieved.component';
import { AppInventoryComponent } from './inventory/inventory.component';
import { AppQuotesComponent } from './quotes/quotes.component';
import { AppUserProfileComponent } from './user-profile/user-profile.component';
import { AppManageComponent } from './manage/manage.component';

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
        component: AppQuotesComponent,
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
      },
      {
        path: 'manage',
        component: AppManageComponent,
      },
      {
        path: 'profile',
        component: AppUserProfileComponent,
      }
    ],
  },
];
