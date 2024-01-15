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
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/main/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/main/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/main/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/main/tooltips',
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
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];
