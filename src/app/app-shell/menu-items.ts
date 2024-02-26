export interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  url?: string; // for href
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: 'Home',
    link: '/home',
  },
  {
    title: 'Category',
    children: [
      {
        title: 'Anime',
        link: '/category/anime',
      },
      {
        title: 'Horrow',
        link: '/category/horror',
      },
    ],
  },
  {
    title: 'About',
    link: '/home/contact-us',
  },
];
