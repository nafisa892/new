export interface Service {
  id: string;
  title: string;
  price: number;
  description: string;
  icon: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  order: number;
}

export interface ClientMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  requirement: string;
  createdAt: any;
  status: 'new' | 'read' | 'replied';
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  email: string;
  phone: string;
  whatsapp: string;
  resumeUrl?: string;
}

export interface Analytics {
  views: number;
  serviceClicks: Record<string, number>;
}
