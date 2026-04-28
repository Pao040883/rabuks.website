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
      description: 'Alle Räume eines Objekts strukturiert erfassen: Flächen, Bodenbeläge, Reinigungsarten und individuelle Wochenpläne. Auch unregelmäßige Rhythmen wie 14-tägig oder monatlich sind abbildbar.'
    },
    {
      icon: 'calculator',
      title: 'Kalkulation nach DIN-Schema',
      description: 'Stundenverrechnungssätze werden auf Basis Ihrer Lohngruppen, Sozialabgaben und betrieblichen Kostenpositionen berechnet. Wahlweise automatisch berechnet oder manuell überschrieben – immer mit klarer Rechenkette.'
    },
    {
      icon: 'location',
      title: 'Bundesland-genaue Frequenzen',
      description: 'Reinigungsfrequenzen werden je Bundesland mit den dortigen Feiertagen hinterlegt. So stimmt die jährliche Einsatzzahl pro Raum, egal ob Sie in Bayern, Berlin oder Bremen kalkulieren.'
    },
    {
      icon: 'users',
      title: 'Kundenportal',
      description: 'Ihre Auftraggeber sehen freigegebene Raumbücher selbst und können Änderungen mit Wirksamkeitsdatum vorschlagen – etwa neue Räume zum 1. des Monats. Sie prüfen, bestätigen oder verhandeln direkt im Portal.'
    },
    {
      icon: 'map',
      title: 'Gebäudeplan & Reviere',
      description: 'Räume per Drag&Drop zu einem Etagenplan zusammensetzen – mit Logikprüfung, damit nichts übersehen wird. Reviere planen, als PDF für Ihre Reinigungskräfte exportieren und je Revier Stunden und Umsatz auswerten.'
    },
    {
      icon: 'sync',
      title: 'Eine Stelle, alle Bücher',
      description: 'Stundenlöhne, Leistungswerte und Raumgruppen pflegen Sie zentral. Bei Tarifänderungen werden alle betroffenen Raumbücher automatisch neu durchgerechnet.'
    },
    {
      icon: 'export',
      title: 'Import & Export',
      description: 'Bestehende Excel-Tabellen lassen sich mit einer geführten Spalten-Zuordnung übernehmen. Raumbücher und Auswertungen exportieren Sie jederzeit zurück nach Excel – Sie behalten Ihre Daten in der Hand.'
    },
    {
      icon: 'shield',
      title: 'Sicherheit & Historie',
      description: 'Zwei-Faktor-Authentifizierung, getrennte Daten je Mandant, lückenlose Änderungshistorie und Soft-Delete mit Wiederherstellung. Bei Rückfragen lässt sich nachvollziehen, wer wann was geändert hat.'
    },
    {
      icon: 'book',
      title: 'Eigene Domain & Mandantenverwaltung',
      description: 'Ihr eigener geschützter Arbeitsbereich unter eigener Adresse. Mehrere rechtliche Einheiten oder Niederlassungen lassen sich sauber trennen – mit getrennten Daten und gemeinsamem Login.'
    }
  ];
}
