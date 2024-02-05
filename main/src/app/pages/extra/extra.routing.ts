import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './icons/icons.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      
    ],
  },
];
