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
import { AppUserProfileComponent } from './user-profile/user-profile.component';
import { AppManageComponent } from './manage/manage.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    AppManageComponent,
    AppSalesOrderComponent,
    AppPaymentRecievedComponent,
    AppUsersComponent,
    AppUserProfileComponent,
    AppMenuComponent,
    AppTooltipsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
