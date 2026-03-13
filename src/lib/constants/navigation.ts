import { Home, Settings, History, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';

export const appName = "Weatherly";

export const getNavItems = (t: (key: string) => string, locale: string) => [
  { 
    id: 'home',
    label: t('home'), 
    icon: Home, 
    href: `/${locale}` 
  },
  { 
    id: 'history',
    label: t('history'), 
    icon: History, 
    href: `/${locale}/history` 
  },
  { 
    id: 'settings',
    label: t('settings'), 
    icon: Settings, 
    href: `/${locale}/settings` 
  },
];

export const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/mahmood-mohamed", 
      label: "GitHub",
      color: "hover:text-[#24292e]"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mahmoud-mo/", 
      label: "LinkedIn",
      color: "hover:text-[#0077b5]"
    },
    {
      icon: MessageSquare,
      href: "https://wa.me/01210428009", 
      label: "WhatsApp",
      color: "hover:text-[#25D366]"
    },
    {
      icon: Mail,
      href: "mailto:mhmooud35@gmail.com", 
      label: "Gmail",
      color: "hover:text-[#DB4437]"
    },
  ];
