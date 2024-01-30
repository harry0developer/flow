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
  // {
  //   displayName: 'Badge',
  //   iconName: 'rosette',
  //   route: '/main/badge',
  // },
  

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
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  }
];
