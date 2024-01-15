import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppUsersComponent } from './users/users.component';
import { AppCustomersComponent } from './customers/customers.component';
import { AppQoutesComponent } from './qoutes/qoutes.component';
import { AppInvoicesComponent } from './invoices/invoices.component';
import { AppSalesOrderComponent } from './sales-order/sales-order.component';
import { AppPaymentRecievedComponent } from './payment-recieved/payment-recieved.component';

export const MainRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'customers',
        component: AppCustomersComponent,
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
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
    ],
  },
];
