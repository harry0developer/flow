import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MainRoutes } from './main.routing';

// ui components
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AppUsersComponent } from './users/users.component'; 
import { AppCustomersComponent } from './customers/customers.component';
import { AppInvoicesComponent } from './invoices/invoices.component';
import { AppSalesOrderComponent } from './sales-order/sales-order.component';
import { AppPaymentRecievedComponent } from './payment-recieved/payment-recieved.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppInventoryComponent } from './inventory/inventory.component';
import { AppQuotesComponent } from './quotes/quotes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    NgxSpinnerModule,
    AsyncPipe
  ],
  declarations: [
    AppCustomersComponent,
    AppInventoryComponent,
    AppInvoicesComponent,
    AppQuotesComponent,
    AppSalesOrderComponent,
    AppPaymentRecievedComponent,
    AppUsersComponent,
    AppBadgeComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent
  ],
})
export class MainModule {}
