import { Routes } from '@angular/router';
import { AppUsersComponent } from './users/users.component';
import { AppCustomersComponent } from './customers/customers.component';
import { AppInvoicesComponent } from './invoices/invoices.component';
import { AppSalesOrderComponent } from './sales-order/sales-order.component';
import { AppInventoryComponent } from './inventory/inventory.component';
import { AppQuotesComponent } from './quotes/quotes.component';
import { AppManageComponent } from './manage/manage.component';
import { AppProfileComponent } from './profile/profile.component';
import { AppPurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AppPaymentComponent } from './payment/payment.component';

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
        path: 'purchase-order',
        component: AppPurchaseOrderComponent,
      },
      {
        path: 'payment',
        component: AppPaymentComponent,
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
        component: AppProfileComponent,
      }
    ],
  },
];
