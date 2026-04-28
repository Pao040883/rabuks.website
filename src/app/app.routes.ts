import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      seo: {
        title: 'Rabuks - Raumbuch & Kalkulation für die Gebäudereinigung',
        description: 'Professionelle Raumbuchverwaltung und Kalkulation für die Gebäudereinigung. Erfassen Sie Raumbücher digital, verwalten Sie Räume effizient und erstellen Sie präzise Kalkulationen.'
      }
    },
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'impressum',
    data: {
      seo: {
        title: 'Impressum | Rabuks',
        description: 'Impressum von Rabuks mit den rechtlich erforderlichen Anbieterangaben und Kontaktinformationen.'
      }
    },
    loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent)
  },
  {
    path: 'datenschutz',
    data: {
      seo: {
        title: 'Datenschutzerklärung | Rabuks',
        description: 'Datenschutzerklärung von Rabuks mit Informationen zur Verarbeitung personenbezogener Daten und Ihren Rechten nach DSGVO.'
      }
    },
    loadComponent: () => import('./pages/datenschutz/datenschutz.component').then(m => m.DatenschutzComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
