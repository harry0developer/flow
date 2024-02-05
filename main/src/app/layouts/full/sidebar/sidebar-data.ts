import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Sales',
  },

  {
    displayName: 'Customers',
    iconName: 'user-heart',
    route: '/main/customers',
  },
  {
    displayName: 'Inventory',
    iconName: 'file-dollar',
    route: '/main/inventory',
  },
  {
    displayName: 'Qoutes',
    iconName: 'file-dollar',
    route: '/main/qoutes',
  },
  {
    displayName: 'Invoices',
    iconName: 'file-check',
    route: '/main/invoices',
  },
  {
    displayName: 'Sales Order',
    iconName: 'report-money',
    route: '/main/sales-order',
  },
  {
    displayName: 'Payment Recieved',
    iconName: 'cash',
    route: '/main/payment-recieved',
  },

  {
    navCap: "Admin"
  },
  {
    displayName: 'Users',
    iconName: 'users',
    route: '/main/users',
  },
  {
    displayName: 'Manage',
    iconName: 'settings',
    route: '/main/manage',
  },
  {
    displayName: 'My Profile',
    iconName: 'user',
    route: '/main/profile',
  },

];
