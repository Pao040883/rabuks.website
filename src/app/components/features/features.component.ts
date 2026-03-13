import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'room',
      title: 'Raumbücher',
      description: 'Alle relevanten Raumdaten an einem Ort erfassen – strukturiert und vollständig. Von Flächenangaben über Reinigungsarten bis zu Intervallen: Raumbücher, die als solide Basis für Ihre Kalkulationen dienen.'
    },
    {
      icon: 'sync',
      title: 'Synchronisation',
      description: 'Pflegen Sie Stundenverrechnungssätze, Raumgruppen und Leistungswerte an einer Stelle. Änderungen werden automatisch in allen Raumbüchern übernommen – konsistent und effizient.'
    },
    {
      icon: 'calculator',
      title: 'Kalkulation',
      description: 'Kalkulationsformeln sind zentral hinterlegt und vor unbeabsichtigten Änderungen geschützt. Professionelle Datenintegrität ohne manuelle Eingriffe in Formeln.'
    },
    {
      icon: 'mobile',
      title: 'Mobilität',
      description: 'Funktioniert in allen modernen Browsern auf Desktop, Tablet und Smartphone. Progressive Web App (PWA) – installierbar, cloud-basiert für Zugriff von überall.'
    },
    {
      icon: 'export',
      title: 'Import/Export',
      description: 'Laden Sie Vorlagen herunter, exportieren Sie bestehende Raumbücher oder importieren Sie vorhandene Daten. Flexibler Datenaustausch für nahtlose Integration in Ihre Arbeitsabläufe.'
    },
    {
      icon: 'book',
      title: 'Mandantenfähigkeit',
      description: 'Ihre eigene Domain als geschützter Arbeitsbereich. Mandantenfähig für saubere Trennung, mit Berechtigungssystem zur vollständigen Zugriffskontrolle.'
    }
  ];
}
